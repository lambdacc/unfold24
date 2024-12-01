module unfold_pkg::contract {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{TxContext};
    use sui::coin::{Self, Coin};
    use sui::table::{Self, Table};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;

    const PRECISION_FACTOR: u64 = 100000;


    public struct State has key, store {
        id: UID,
        seller: address,
        risk_coverage: u64,
        collateral: Coin<SUI>,
        total_shares: u64,
        rem_shares: u64,
        buyers_balance: Balance<SUI>,
        buyers: Table<address, u64>,
        buyers_iter: vector<address>
    }

    public fun new_risk(
        seller: address,
        risk_coverage: u64,
        countShares: u64,
        collateral: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        //let seller = tx_context::sender(ctx);
        let state = State {
            id: object::new(ctx),
            seller,
            risk_coverage,
            collateral,
            total_shares: countShares, /// shares
            rem_shares: countShares, /// shares
            buyers_balance: balance::zero<SUI>(),
            buyers: table::new<address, u64>(ctx),
            buyers_iter: vector<address>[]
        };

        transfer::public_share_object(state);
    }

    /// function for buying shares
    public fun buy_share(state: &mut State, payment: Coin<SUI>, buyer: address, amount: u64, ctx: &mut TxContext) {
        // Ensure there are remaining shares to buy
        assert!(state.rem_shares >= amount, 1);

        // Decrease the number of remaining shares
        state.rem_shares = state.rem_shares - amount;

        // Update the buyer's shares in the buyers table
        if (table::contains(&state.buyers, buyer)) {
            let current_shares = table::borrow_mut(&mut state.buyers, buyer);
            *current_shares = *current_shares + amount;
        } else {
            table::add(&mut state.buyers, buyer, amount);
            state.buyers_iter.push_back(buyer);
        };

        // Convert payment coin to balance and add to buyers_balance
        balance::join(&mut state.buyers_balance, coin::into_balance(payment));

        // Mint an NFT as proof of purchase (placeholder function for minting logic)
        //mint_nft(buyer, ctx);

        // Additional logic for handling `payment` can be added here (e.g., transferring coins)
    }


    /// function to settle after the risk expire
    public fun settle(state: &mut State, toggle: bool, ctx: &mut TxContext) {}

    public fun settleContract(state: &mut State, riskEventOccurred: bool, ctx: &mut TxContext) {
        // If toggle is true, return the collateral and balance to the seller
        // Otherwise send share of collateral and buyer balance to buyers, return any balance collater to the seller
        let mut amount = state.collateral.value();
        let mut coin_to_transfer = state.collateral.split(amount, ctx);
        if (riskEventOccurred) { //Risk seller gets compensated
            amount = state.buyers_balance.value();
            // Transfer buyers' balance to the seller
            let balance_to_transfer = state.buyers_balance.split(amount);
            coin_to_transfer.join(coin::from_balance(balance_to_transfer, ctx));
            transfer::public_transfer(coin_to_transfer, state.seller);
        } else { //Risk buyers get payouts
            //transfer::public_transfer(coin_to_transfer, state.seller);
            // If risk event did not occur, distribute collateral and balance among the buyers
            let total_buyers = table::length(&state.buyers);
            let total_amount = coin::value(&coin_to_transfer);

            // Loop through each buyer and distribute the funds based on their share
            let given_shares = state.total_shares - state.rem_shares;
            while (!state.buyers_iter.is_empty()) {
                let buyer = vector::pop_back(&mut state.buyers_iter);
                let shares = *table::borrow<address, u64>(&state.buyers, buyer);

                // calculate share //NO float in Sui
                // let price_per_share = state.collateral.value() / state.shares;
                // let amount_to_get = shares * price_per_share;

                let share_percentage: u64 = (shares * PRECISION_FACTOR) / given_shares;
                let buyer_balance_val = (share_percentage * total_amount) / PRECISION_FACTOR;

                let buyer_balance_to_transfer = coin::split(&mut coin_to_transfer, buyer_balance_val, ctx);

                // Transfer corresponding collateral to the buyer (or distribute accordingly)
                transfer::public_transfer(buyer_balance_to_transfer, buyer);
            };
                transfer::public_transfer(coin_to_transfer, state.seller);
        };
    }



    //TODO func to fetch state by ID
}



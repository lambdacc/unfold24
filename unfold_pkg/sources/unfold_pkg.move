module unfold_pkg::contract {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{TxContext};
    use sui::coin::{Self, Coin};
    use sui::table::{Self, Table};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;


    public struct State has key, store {
        id: UID,
        seller: address,
        risk_coverage: u64,
        collateral: Coin<SUI>,
        total_shares: u64,
        rem_shares: u64,
        buyers_balance: Balance<SUI>,
        buyers: Table<address, u64>
    }

    public fun new_risk(
        seller: address,
        risk_coverage: u64,
        countShares: u64,
        collateral: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let state = State {
            id: object::new(ctx),
            seller,
            risk_coverage,
            collateral,
            total_shares: countShares, /// shares
            rem_shares: countShares, /// shares
            buyers_balance: balance::zero<SUI>(),
            buyers: table::new(ctx)
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
        };

        // Convert payment coin to balance and add to buyers_balance
        balance::join(&mut state.buyers_balance, coin::into_balance(payment));

        // Mint an NFT as proof of purchase (placeholder function for minting logic)
        //mint_nft(buyer, ctx);

        // Additional logic for handling `payment` can be added here (e.g., transferring coins)
    }


    /// function to settle after the risk expire
    public fun settle(state: &mut State, toggle: bool, ctx: &mut TxContext) {
    }

    public fun payoffToSeller(state: &mut State, toggle: bool, ctx: &mut TxContext) {
        // If toggle is true, return the collateral and balance to the seller
        if (toggle) {
            let mut amount = state.collateral.value();
            let mut coin_to_transfer = state.collateral.split(amount, ctx);
            // Transfer collateral and buyer's balance to the
            amount = state.buyers_balance.value();
            let balance_to_transfer = state.buyers_balance.split(amount);
            coin_to_transfer.join(coin::from_balance(balance_to_transfer, ctx));
            transfer::public_transfer(coin_to_transfer, state.seller);
            // Transfer buyers' balance to the seller
        } else {
            /*
            // If risk event did not occur, distribute collateral and balance among the buyers
            let total_buyers = Table::length(&state.buyers);  // Get number of buyers
            let total_balance = state.buyers_balance; // The total balance to be distributed
            // Add the collateral to the total_balance
            balance::join(&mut total_balance, state.collateral);

            // Loop through each buyer and distribute the funds based on their share
            Table::for_each(&state.buyers, |buyer, shares| {
                let share_percentage = u64::to_float(shares) / u64::to_float(total_buyers); // Calculate share percentage
                let buyer_balance = share_percentage * total_balance;  // Calculate buyer's balance to receive

                // Transfer corresponding collateral to the buyer (or distribute accordingly)
                Coin::transfer(&mut state.collateral, buyer, ctx);
            });
            */
        }
    }
}



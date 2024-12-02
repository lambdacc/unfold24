/// testnet address : 0x6cd2958dc4384a766685dbce8e56fda9aee25bcf2bc7458ad6d474e6768d01bb

module unfold_pkg::contract {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{TxContext};
    use sui::coin::{Self, Coin};
    use sui::table::{Self, Table};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use std::string::String;


    const PRECISION_FACTOR: u64 = 100000;


    public struct State has key, store {
        id: UID,
        seller: address,
        name: String,
        description: String,
        ipfs_hash: String,       
        risk_coverage: u64,
        collateral: Coin<SUI>,
        total_shares: u64,
        rem_shares: u64,
        buyers_balance: Balance<SUI>,
        buyers: Table<address, u64>,
        buyers_iter: vector<address>
    } // In practice there might be an expiry date added for further asserting when settlement should occur

    public fun new_risk(
        name: String,
        description: String,
        ipfs_hash: String,       
        risk_coverage: u64,
        countShares: u64,
        collateral: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let seller = tx_context::sender(ctx);
        let state = State {
            id: object::new(ctx),
            seller,
            name,
            description,
            ipfs_hash,
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
        // Validate that sufficient shares are available for purchase
        assert!(state.rem_shares >= amount, 1);

        // Reduce the total number of remaining shares by the purchased amount
        state.rem_shares = state.rem_shares - amount;

        // Check if the buyer already exists in the buyers table
        if (table::contains(&state.buyers, buyer)) {
            // If buyer exists, update their existing share count
            let current_shares = table::borrow_mut(&mut state.buyers, buyer);
            *current_shares = *current_shares + amount;
        } else {
            // If buyer is new, add them to the buyers table and track in buyers_iter
            table::add(&mut state.buyers, buyer, amount);
            state.buyers_iter.push_back(buyer);
        };

        // Convert the payment coin to balance and aggregate with existing buyer balances
        balance::join(&mut state.buyers_balance, coin::into_balance(payment));

        // Mint an NFT as proof of purchase (placeholder function for minting logic) using unfold_nft package
        //mint_nft(buyer, ctx);
    }


    /// function to settle after the risk expire
    public fun settleContract(state: &mut State, riskEventOccurred: bool, ctx: &mut TxContext) {
        // Determine contract settlement based on risk event occurrence
        // If a risk event has happened, all funds are transferred to the seller
        // If no risk event occurred, funds are distributed back to the buyers
        if (riskEventOccurred) {
            pay_to_seller(state, ctx)
        } else {
            pay_to_buyers(state, ctx)
        };
    }


    fun pay_to_seller(state: &mut State, ctx: &mut TxContext) {
        // Extract the total collateral amount and create a coin from it
        let mut amount = state.collateral.value();
        let mut coin_to_transfer = state.collateral.split(amount, ctx);

        // Calculate the total balance collected from buyers
        amount = state.buyers_balance.value();

        // Prepare the buyers' balance for transfer to the seller
        let balance_to_transfer = state.buyers_balance.split(amount);

        // Combine the collateral and buyers' balance into a single coin for transfer
        coin_to_transfer.join(coin::from_balance(balance_to_transfer, ctx));

        // Transfer the total accumulated funds to the seller
        transfer::public_transfer(coin_to_transfer, state.seller);
    }

    fun pay_to_buyers(state: &mut State, ctx: &mut TxContext) {
        // Prepare the total collateral for distribution
        let mut amount = state.collateral.value();
        let mut coin_to_transfer = state.collateral.split(amount, ctx);

        //Commented out transfer to seller (previous strategy)
        //transfer::public_transfer(coin_to_transfer, state.seller);

        // Calculate total number of buyers and total collateral amount
        let total_buyers = table::length(&state.buyers);
        let total_amount = coin::value(&coin_to_transfer);

        // Calculate total shares that have been issued
        let given_shares = state.total_shares - state.rem_shares;

        // Distribute collateral proportionally among buyers based on their share
        while (!state.buyers_iter.is_empty()) {
            // Retrieve the next buyer from the iterator
            let buyer = vector::pop_back(&mut state.buyers_iter);
            let shares = *table::borrow<address, u64>(&state.buyers, buyer);

            // Calculate buyer's share percentage using precision factor to avoid floating-point math
            // PRECISION_FACTOR allows for more accurate proportional distribution
            let share_percentage: u64 = (shares * PRECISION_FACTOR) / given_shares;

            // Calculate the exact amount to transfer to this buyer
            let buyer_balance_val = (share_percentage * total_amount) / PRECISION_FACTOR;

            // Split the collateral coin for this specific buyer
            let buyer_balance_to_transfer = coin::split(&mut coin_to_transfer, buyer_balance_val, ctx);

            // Transfer the calculated share to the buyer
            transfer::public_transfer(buyer_balance_to_transfer, buyer);
        };

        // Transfer any remaining balance back to the seller
        transfer::public_transfer(coin_to_transfer, state.seller);
    }

    /*Struct to encapsulate key details of a State object for easy retrieval and potential serialization.
    But its redundant after we found out about sui_getObject and sui_multiGetObjects methods
    These built-in Sui methods provide more efficient object retrieval, so this approach is unnecessary*/
    public struct StateDetails has drop {
        id: ID,
        seller: address,
        risk_coverage: u64,
        total_shares: u64,
        rem_shares: u64,
        collateral_amount: u64,
        buyers_count: u64,
        buyers_iter: vector<address>
    }

    public fun get_state_details(state: &State): StateDetails {
        StateDetails {
            id: object::id(state),
            seller: state.seller,
            risk_coverage: state.risk_coverage,
            total_shares: state.total_shares,
            rem_shares: state.rem_shares,
            collateral_amount: coin::value(&state.collateral),
            buyers_count: table::length(&state.buyers),
            buyers_iter: state.buyers_iter
        }
    }
}



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
        risk_coverage: u64,
        collateral: Coin<SUI>,
        total_shares: u64,
        rem_shares: u64,
        buyers_balance: Balance<SUI>,
        buyers: Table<address, u64>
    }

    public fun new_risk(risk_coverage: u64, countShares:u64, collateral: Coin<SUI>, ctx: &mut TxContext) {
        let state = State {
            id: object::new(ctx),
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


    public fun settle() {
        /// function to settle after the risk expire
    }
}



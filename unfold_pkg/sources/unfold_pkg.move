/// Module: unfold_pkg
module unfold_pkg::unfold_pkg; 

public struct State has key, store {
  id: UID,
  risk_coverage: u64,
  collateral: Coin<Sui>,
  shares: 10, 
  buyers_balance: Balance<Sui>,
  buyers: Table<address, u64>
}

public fun new_risk(risk_coverage: u64, collateral: Coin<Sui>, ctx: &mut TxContext){
  let state = State{
    id: object::new(ctx),
    risk_coverage,
    collateral,
    10 /// shares,
    buyers_balance: Balance::zero<Sui>(),
    buyers: Table::new<address, u64>(ctx)
  }

  transfer::public_share_object(state);
}

public fun buy_share(){
  /// function for buying shares
  /// check the shares left to buy, if left execute the function
  /// add nft mint at the end 
}

public fun settle(){
  /// function to settle after the risk expire
}



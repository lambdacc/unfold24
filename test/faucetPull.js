import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui/faucet';

await requestSuiFromFaucetV0({
    host: getFaucetHost('devnet'),
    recipient: '0x16c23765a41a8fdae85301e16c1a8800aeb1582c92b1e6e6f699eeb630a80b30',
});




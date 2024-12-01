import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui/faucet';

async function getMultipleSui(recipient, times) {
    const host = getFaucetHost('devnet'); // Use 'testnet' if on the testnet
    for (let i = 0; i < times; i++) {
        try {
            console.log(`Requesting SUI... (${i + 1})`);
            const response = await requestSuiFromFaucetV0({ host, recipient });
            console.log('Response:', response);
        } catch (error) {
            console.error('Error during faucet request:', error);
        }
    }
}

const recipient = '0x16c23765a41a8fdae85301e16c1a8800aeb1582c92b1e6e6f699eeb630a80b30'; // Replace with your actual SUI address
getMultipleSui(recipient, 10); // Request 10 times (adjust as needed)



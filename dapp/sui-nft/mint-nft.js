import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client"
import { Transaction } from '@mysten/sui/transactions';

// Generate a new Keypair
// const keypair = new Ed25519Keypair();
// console.log(keypair);
// const address = "0x" + keypair.getPublicKey().toSuiAddress().toString()

const address = "0xfa939f43112cd4c1144434579858ec6e1151b2051f6e243d1e2cd402260a07f6"
const mnemonic = 'gospel huge glance help always bubble critic accident street current write figure';
const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
console.log(keypair);

// console.log(address)

// // Create Network Connection and receive airdrop 
// const provider = new JsonRpcProvider(Network.DEVNET);

// // // Get Sui from faucet
// const fund = await provider.requestSuiFromFaucet(address)
// console.log(fund)

// // Pause function
// const wait = async (time) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, time)
//   });
// }

// await wait(3000)

// // Merge two of the Sui coin objects 
// const coin1 = fund.transferred_gas_objects[1].id
// const coin2 = fund.transferred_gas_objects[2].id
//const signer = new RawSigner(keypair, provider);
// const mergeTxn = await signer.mergeCoin({
//   primaryCoin: coin1,
//   coinToMerge: coin2,
//   gasBudget: 1000,
// });
// console.log('MergeCoin txn', mergeTxn);

// // Call to Mint NFT
const client = new SuiClient({ url: getFullnodeUrl("devnet")})
const txb = new Transaction();
txb.moveCall({
  target: "0x3e28adaeff4fe9b2a9d73a7a06f0e447b41ded2a1ca58887138a59f376db2af8::nft::mint_and_transfer",
  args: [
    txb.pure.string('gm'),
    txb.pure.string('A nice gm brought to you by Pinata and Sui'),
    txb.pure.string('ipfs://QmZhnkimthxvL32vin2mrQvnhN8ZbWFMvKMxRqHEq7dPz3'),
    txb.pure.address(address)
  ]
})

const tx = await client.signAndExecuteTransaction({
  transaction: txb,
  signer: keypair
})

console.log(tx);


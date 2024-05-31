/*
  Mints a single asset in the LAOS sibling collection,
  hence filling the corresponding slot created in the
  ERC721 deployed in another chain.
  The sender must be the owner of the collection in LAOS.

  Bridgelessly minted assets are ready to be traded on chain, for example,
  using Etherscan/Polygonscan, by importing them to Metamask and using "Send",
  or by using your favorite web3 library connected to Ethereum/Polygon, etc.
  To appear in Opensea & marketplaces that use event-based indexers, and which
  still don't use the uNode, you will either need to 'Send' it first, or
  execute a broadcast transaction.

  The front end at https://apps.klaos.io/asset/<networkId>/<uERC721 address>/<tokenID>
  can be used to facilitate importing to Metamask and broadcasting.
  */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const { Web3 } = require('web3');
const axios = require('axios');

// Initialize Web3 instance with LAOS node provider
const web3 = new Web3('https://rpc.klaosnova.laosfoundation.io');

// Environment variables
const privateKey = process.env.PRIVATE_KEY;

// The address of the recipient of the asset
const toAddress = '0xd2f5c0A2273e9F98629A890d0737AdC5f0DfF1F2';

// The contract address of a collection in KLAOS.
// This must either be a collection owned by the sender,
// or a collection with Public Minting enabled.
// As examples, the following two uERC-721 contracts point to sibling KLAOS
// collections that currently have Public Minting enabled:
// Ethereum:
//   Opensea Collection: https://opensea.io/collection/laos-bridgeless-minting-on-eth
//   Ethereum uERC-721 contract: 0x501E7DeadfDcAE6654B0233632fad0D263d1D823
//   KLAOS sibling collection: 0xffFfFFFffFfFFFfFffFFFFFe0000000000000044
// Polygon:
//   Opensea Collection: https://opensea.io/collection/laos-bridgeless-minting-on-polygon
//   Ethereum uERC-721 contract: 0x167ef072F21D5ec07139810B32970921d15a3dE5
//   KLAOS sibling collection: 0xFFfFfFffFFfFFfFFffffFffe000000000000011d

const klaosCollectionAddr = '0xFfFfffFFFFFfFfFfFFfffFFE0000000000000363';

// polygon contract 0xC4F6A03480fC46d2040c49656AF3C5f0A77574E4

// The IPFS address with the metadata of the asset to be minted.
// You can use the ipfs-uploader.js script in these examples to
// create a valid IPFS address.
// The address must start with 'ipfs://....'
// const tokenURI = 'ipfs://QmQ964v3i2sqg9D7saRsjvspgPyJMDiJCf1hWXrWm17K2E';
const tokenURI ='ipfs://QmPVv7npG77rsYDf7wc1UuHH1Lywv43qK9wJvWPAMPqpxt';

// The URL of the interface ABI, loaded from the LAOS GitHub for convenience
const contractABIUrl = 'https://github.com/freeverseio/laos/blob/main/precompile/evolution-collection/contracts/EvolutionCollection.json?raw=true';

// Generates a random integer between 0 and max
function getRandomBigInt(max) {
  return (BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)) ** 2n) % BigInt(max);
}

async function main() {
  try {
    // Fetching the contract ABI
    const response = await axios.get(contractABIUrl);
    const contractABI = response.data;

    // Instantiating the contract
    const contract = new web3.eth.Contract(contractABI, klaosCollectionAddr);

    // Generate a random slot number
    const slot = getRandomBigInt(2n ** 96n - 1n);

    // Prepare the mint transaction
    const encodedABI = contract.methods.mintWithExternalURI(toAddress, slot, tokenURI).encodeABI();
    const fromAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;
    const transaction = {
      from: fromAddress,
      to: klaosCollectionAddr,
      data: encodedABI,
      gas: 35000,
      gasPrice: web3.utils.toWei('0.5', 'gwei'), // Set the desired gas price
    };

    // Sign and send the transaction
    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
    console.log('Transaction sent. Waiting for confirmation...');

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    const blockNumber = await web3.eth.getBlockNumber();
    console.log('Current block number:', blockNumber);
    console.log('Transaction confirmed. Asset minted in block number:', receipt.blockNumber);

    // Retrieve the token ID from the transaction receipt
    const mintEventABI = contractABI.find((abi) => abi.name === 'MintedWithExternalURI' && abi.type === 'event');
    const mintEvent = receipt.logs.find(
      (log) => log.address.toLowerCase() === klaosCollectionAddr.toLowerCase(),
    );
    if (mintEvent && mintEventABI) {
      const decodedLog = web3.eth.abi.decodeLog(
        mintEventABI.inputs,
        mintEvent.data,
        mintEvent.topics.slice(1),
      );
      console.log(`Token ID: ${decodedLog._tokenId}`);
    } else {
      console.log('Mint event log not found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
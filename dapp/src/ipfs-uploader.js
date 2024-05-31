/*
  Uploads the metadata of an asset to IPFS, using Pinata
  The image of the asset is uploaded first, so that its IPFS
  address can be used in the asset image metadata field
*/
require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Pinata API headers
const headers = {
  pinata_api_key: process.env.PINATA_API_KEY,
  pinata_secret_api_key: process.env.PINATA_API_SECRET,
};

async function uploadToIPFS(filePath) {
  try {
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath));
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, { headers: { ...headers, ...data.getHeaders() } });
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    return null;
  }
}

async function main() {
  // Example usage for uploading an image
  const imagePath = '/Users/loganchoi/Desktop/cryptopolis/cryptopoly.png'; // Path to the image file
  const imageHash = await uploadToIPFS(imagePath); // Upload image

  if (imageHash) {
    console.log('\n-------------');
    // console.log(`Image uploaded to IPFS: ipfs://${imageHash}`);

    // Prepare metadata
    // const metadata = {
    //   name: 'Your NFT Name',
    //   description: 'Description of your NFT',
    //   image: `ipfs://${imageHash}`, // Link image hash in metadata
    //   attributes: [
    //     { trait_type: 'Attr 1', value: 'Value 1' },
    //     { trait_type: 'Attr 2', value: 'Value 2' },
    //   ],
    // };

    const metadata = {
      name: 'Cryptopoly',
      description: 'Save State',
      image: `ipfs://${imageHash}`, // Link image hash in metadata
      string: '0,9,23,1,13,23,2,11,27,9,6,28,9,6,29,9,7,30,9,8,31,9,9,31,9,10,31,9,11,31,9,12,31,9,13,31,9,14,31,9,15,30,9,16,29,9,16,28'
    };

    // Save metadata to a file
    const metadataPath = 'metadata.json';
    fs.writeFileSync(metadataPath, JSON.stringify(metadata));

    // Upload metadata
    const metadataHash = await uploadToIPFS(metadataPath);
    if (metadataHash) {
      console.log('-------------');
      console.log('Metadata uploaded to IPFS');
      console.log(`IPFS address (to pass to single-mint.js): ipfs://${metadataHash}`);
      console.log('-------------\n');
    } else {
      console.log('Failed to upload metadata to IPFS');
    }
  } else {
    console.log('Failed to upload image to IPFS');
  }
}

main();
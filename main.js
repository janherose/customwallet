const fs = require('fs');
const { ethers } = require('ethers');

function generateWallet() {
  let walletInfo;
  do {
    const wallet = ethers.Wallet.createRandom(['123456789qwerty']);

    walletInfo = {
      mnemonic: wallet.mnemonic.phrase,
      privateKey: wallet.privateKey,
      address: wallet.address,
    };
  } while (!GetZero(walletInfo.address));

  return walletInfo;
}

function GetZero(address) {
  // get 6 landing zero 0x000000
  return /^0x0{6}/.test(address);
}

let walletInfo;
let count = 0;
do {
  walletInfo = generateWallet();
  count++;
} while (!GetZero(walletInfo.address));

console.log(`\nWallet looping count ${count} :`);
console.log('Seed phrase (Mnemonic):', walletInfo.mnemonic);
console.log('Private Key:', walletInfo.privateKey);
console.log('Address:', walletInfo.address);

// save file
const filename = 'address.txt';
const content = `Seed phrase (Mnemonic): ${walletInfo.mnemonic}\nPrivate Key: ${walletInfo.privateKey}\nAddress: ${walletInfo.address}\n`;

try {
  fs.appendFileSync(filename, content);
  console.log(`Saved file ${filename}`);
} catch (err) {
  console.error('failed save file:', err);
}

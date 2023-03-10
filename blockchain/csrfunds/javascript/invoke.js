/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
console.log(argv);

// let args = process.argv.slice(2);
const func = argv._[argv._.length - 4];
const productId = argv._[argv._.length - 3];
const user = argv._[argv._.length - 2];
const obj = argv.obj;
const usertype = argv._[argv._.length - 6];
const channel = argv._[argv._.length - 5];
const cc = argv._[argv._.length - 1];

console.log(func, productId, user, usertype);

let org = '';

if(usertype === 'Company1') {
    org = '1';
}
else if(usertype === 'Portal') {
    org = '2';
}
else if(usertype === 'Company2') {
    org = '3';
}
else if(usertype === 'Student') {
    org = '4';
}
// else if(usertype === 'Retailer') {
//     org = '5';
// }

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', `org${org}.example.com`, `connection-org${org}.json`);
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(__dirname, `wallet${org}`);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(user);
        if (!identity) {
            console.log('From invoke.js');
            console.log('An identity for the user ' + user + ' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(`${channel}`);

        // Get the contract from the network.
        const contract1 = network.getContract('csrfunds');
        const contract2 = network.getContract('scholarships');

        const contract = (cc === 'csrfunds')? contract1: contract2;

        // Submit the specified transaction.
        if(func === 'createTransaction') {
            if(cc === 'scholarships') {
                const querybal = await contract1.submitTransaction('queryTransaction', 'Transaction0');
                const queryobj = JSON.parse(querybal.toString('utf8'));
                const balance = queryobj.amount;
                if(balance >= obj.amount) {
                    console.log('Transferring Funds');
                    await contract2.submitTransaction(func, productId, JSON.stringify(obj));
                    await contract1.submitTransaction('updateFunds', obj.amount);
                } else {
                    console.log('Insufficient Funds');
                }
            } else {
                await contract1.submitTransaction(func, productId, JSON.stringify(obj));
            }
            console.log('Transaction has been submitted');
        } else if(func === 'queryAllTransactions') {
            await contract.submitTransaction(func);
            console.log('Transaction has been submitted');
        } else if(func === 'queryTransaction') {
            await contract.submitTransaction(func, productId);
            console.log('Transaction has been submitted');
        } else {
            console.log('Invalid function');
        }

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();

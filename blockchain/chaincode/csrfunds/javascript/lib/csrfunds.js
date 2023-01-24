/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class CSRFunds extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const transactions = [
            {
                id: '0',
                amount: 0,
            },
        ];

        // const now = String(new Date());
        // await ctx.stub.putState('Total Funds', Buffer.from(JSON.stringify({amount: 0, timestamp: now})));
        for (let i = 0; i < transactions.length; i++) {
            transactions[i].timestamp = 'DDMMYY';
            transactions[i].cause = 'Education';
            if(i !== 0) transactions[i].docType = 'transaction';
            await ctx.stub.putState('Transaction' + i, Buffer.from(JSON.stringify(transactions[i])));
            console.info('Added <--> ', transactions[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryTransaction(ctx, transactionId) {
        const transactionAsBytes = await ctx.stub.getState(transactionId); // get the transaction from chaincode state
        if (!transactionAsBytes || transactionAsBytes.length === 0) {
            throw new Error(`${transactionId} does not exist`);
        }
        console.log(transactionAsBytes.toString());
        return transactionAsBytes.toString();
    }

    async createTransaction(ctx, transactionId, newTransaction) {
        console.info('============= START : Create Transaction ===========');

        const newTransactionJson = JSON.parse(newTransaction)

        const transaction = {
            transactionId: newTransactionJson.transactionId,
            company: newTransactionJson.company,
            address: newTransactionJson.address,
            amount: newTransactionJson.amount,
            timestamp: newTransactionJson.timestamp,
            cause: 'Education',
            docType: 'transaction',
        };

        await ctx.stub.putState(transactionId, Buffer.from(JSON.stringify(transaction)));
        console.info('============= END : Create Transaction ===========');

        console.info('============= START : Update Funds ===========');

        const transactionAsBytes = await ctx.stub.getState('Transaction0'); // get the transaction from chaincode state
        if (!transactionAsBytes || transactionAsBytes.length === 0) {
            throw new Error(`Total Funds does not exist`);
        }
        const tr = JSON.parse(transactionAsBytes.toString());
        tr.amount = tr.amount + newTransactionJson.amount;

        await ctx.stub.putState('Transaction0', Buffer.from(JSON.stringify(tr)));
        console.info('============= END : Update Funds ===========');
    }

    async queryAllTransactions(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async updateFunds(ctx, amt) {
        console.info('============= START : updateFunds ===========');
        const transactionAsBytes = await ctx.stub.getState('Transaction0'); // get the transaction from chaincode state
        if (!transactionAsBytes || transactionAsBytes.length === 0) {
            throw new Error(`Total Funds does not exist`);
        }
        const tr = JSON.parse(transactionAsBytes.toString());
        tr.amount = tr.amount - amt;

        await ctx.stub.putState('Transaction0', Buffer.from(JSON.stringify(tr)));
        console.info('============= END : updateFunds ===========');
    }

    // async changeTransactionOwner(ctx, transactionId, newOwner) {
    //     console.info('============= START : changeTransactionOwner ===========');

    //     const transactionAsBytes = await ctx.stub.getState(transactionId); // get the transaction from chaincode state
    //     if (!transactionAsBytes || transactionAsBytes.length === 0) {
    //         throw new Error(`${transactionId} does not exist`);
    //     }
    //     const transaction = JSON.parse(transactionAsBytes.toString());
    //     transaction.owner = newOwner;

    //     await ctx.stub.putState(transactionId, Buffer.from(JSON.stringify(transaction)));
    //     console.info('============= END : changeTransactionOwner ===========');
    // }

}

module.exports = CSRFunds;

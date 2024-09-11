const express = require('express');
const {Web3} = require('web3');
const tracking = require('./asset/MessageStorageABI.json');
require('dotenv').config();

const app = express();
app.use(express.json());

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URL));
const contractABI = tracking.abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Add wallet and load the account from the private key
const account = web3.eth.accounts.privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

// Add the account to the wallet
web3.eth.accounts.wallet.add(account);


app.post('/store-message', async (req, res) => {
    const { userId, message, data } = req.body;

    // Ensure userId is converted to BigInt if needed
    const userIdAsBigInt = BigInt(userId);  // Converting userId to BigInt to ensure compatibility with uint256

    try {
        // Call the storeMessage method with the correct parameters
        const receipt = await contract.methods.storeMessage(userIdAsBigInt, message, JSON.stringify(data))
            .send({
                from: account.address,
                gas: 1000000
            });

        // Convert BigInt in receipt to strings for serialization
        const receiptStr = JSON.parse(JSON.stringify(receipt, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.json({ success: true, receipt: receiptStr });
    } catch (error) {
        console.error("Transaction failed:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/get-all-messages', async (req, res) => {
    try {
        const messages = await contract.methods.getAllMessages().call();

        // Convert any BigInt values to strings for JSON serialization
        const messagesStr = JSON.parse(JSON.stringify(messages, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.json(messagesStr);
    } catch (error) {
        console.error("Error fetching all messages:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/get-messages-by-user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        // Convert userId to BigInt for compatibility with uint256
        const userIdAsBigInt = BigInt(userId);

        const messages = await contract.methods.getMessagesByUserId(userIdAsBigInt).call();

        // Convert any BigInt values in the messages to strings for JSON serialization
        const messagesStr = JSON.parse(JSON.stringify(messages, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.json(messagesStr);
    } catch (error) {
        console.error(`Error fetching messages for userId ${userId}:`, error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

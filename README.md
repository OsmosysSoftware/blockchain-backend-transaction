# Blockchain Messaging API

This project provides an API to store and retrieve user-specific messages on the blockchain. All blockchain operations are performed through a single application wallet, but the API allows associating each transaction with a specific user by storing `userId` along with the message data.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

---

## Features

- Store user-specific messages on the blockchain
- Retrieve all messages stored on the blockchain
- Fetch messages for a specific user by their `userId`

---

## Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/)
- [Web3.js](https://web3js.readthedocs.io/en/v1.5.2/)
- Active Metamask account with testnet blockchain (this project uses fantomTestnet)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OsmosysSoftware/blockchain-backend-transaction
   cd blockchain-backend-transaction
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure the `.env` file with your Ethereum account's private key and contract details:

   ```bash
   PRIVATE_KEY=<your-wallet-private-key>
   PROVIDER_URL=<your-testnet-blockchain-url>
   CONTRACT_ADDRESS=<your-deployed-contract-address>
   ```

4. Deploy the smart contract :

   You can either deploy the contract manually using `truffle` or `hardhat` or include a script in the project for automated deployment.

---

## Usage

1. Start the server:

   ```bash
   node server.js
   ```

   The server will run on `http://localhost:3000`.

2. Use the available API endpoints to store and retrieve messages. Check the [API Document](./docs/api.md)

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Ganache default port
      network_id: "*", // Match any network ID
    },
    // Sepolia Testnet
    sepolia: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
      ),
      network_id: 11155111,  // Sepolia's chain ID
      gas: 5500000,          // Adjust gas limit
      confirmations: 2,      // # of confirmations to wait
      timeoutBlocks: 200,    // Timeout after 200 blocks
      skipDryRun: true       // Skip dry run before migrations
    },
  
  },
  compilers: {
    solc: {
      version: "0.8.0", // Match your Solidity version
    },
  },
};
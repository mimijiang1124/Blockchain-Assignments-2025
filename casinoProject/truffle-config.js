module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Ganache default
      network_id: "*",
    },
    sepolia: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY], // Wallet private key
        providerOrUrl: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      }),
      network_id: 11155111, // Sepolia's chain ID
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }

  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
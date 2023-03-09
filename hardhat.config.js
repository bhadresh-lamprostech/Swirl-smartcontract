require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    local: {
      chainId: 31337,
      url: "http://127.0.0.1:8545", //Your RPC URL
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ], //Your private key
    },
    polygon: {
      chainId: 80001,
      url: "https://matic-mumbai.chainstacklabs.com", // Your RPC url
      accounts: [
        "c3e56e73612a930801c3a54b9f2056670e44b76e81aab1c883570b396c204958",
      ], // yout private key
    },
    goerli: {
      chainId: 05,
      url: "https://rpc.ankr.com/eth_goerli", // your RPC URl
      accounts: [
        "c3e56e73612a930801c3a54b9f2056670e44b76e81aab1c883570b396c204958",
      ], // Your Private key
    },
  },
};

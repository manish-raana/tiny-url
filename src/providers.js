import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "TinyQR",
      rpc: {
        80001: "https://polygon-mumbai.g.alchemy.com/v2/aWibDV94uYYQgHqtHlwXrOVow9kWfbCJ",
      },
      chainId: 80001,
    },
  },
};

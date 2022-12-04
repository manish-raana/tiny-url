import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "TinyUrl",
      rpc: {
        80001: "https://compatible-convincing-silence.matic-testnet.discover.quiknode.pro/00c2868d40dacc12b1680099724b33ac29fc8173/",
      },
      chainId: 80001,
    },
  },
};

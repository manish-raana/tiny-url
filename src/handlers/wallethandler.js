import { ethers } from "ethers";
import { toHex } from "../utils";

export const connectWallets = async (
  setLibrary,
  setChainId,
  setWeb3Provider,
  web3modal,
  toast,
  setConnectedChain
) => {
  try {
    const web3ModalInstance = await web3modal.connect();
    const library = new ethers.providers.Web3Provider(web3ModalInstance);
    setLibrary(library);

    const web3ModalProvider = new ethers.providers.Web3Provider(
      web3ModalInstance
    );
    if (web3ModalProvider) {
      setWeb3Provider(web3ModalProvider);
    }
    const { chainId } = await web3ModalProvider.getNetwork();
    setConnectedChain(chainId);
    setChainId(chainId);
    if (chainId !== 80001) {
      toast("Please switch to the Polygon Mumbai network");
      throw new Error("Incorrect network");
    }
    return library;
  } catch (error) {
    console.log(error);
  }
};

export const switchNetwork = async (
  library,
  setChainId,
  setConnectedChain,
  web3modal,
  setLibrary
) => {
  try {
    await library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(80001) }],
    });
    const web3ModalInstance = await web3modal.connect();
    const newlibrary = new ethers.providers.Web3Provider(web3ModalInstance);
    setLibrary(newlibrary);
    setChainId(80001);
    setConnectedChain(80001);
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await library.provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: toHex(80001),
              chainName: "Polygon Mainnet",
              rpcUrls: ["https://polygon-mumbai.g.alchemy.com/v2/aWibDV94uYYQgHqtHlwXrOVow9kWfbCJ"],
              nativeCurrency: {
                decimals: 18,
                symbol: "MATIC",
              },
              blockExplorerUrls: ["https://mumbai.polygonscan.com"],
            },
          ],
        });
        setChainId(80001);
        setConnectedChain(80001);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

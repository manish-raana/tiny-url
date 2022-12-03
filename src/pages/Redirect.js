import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetLink } from "../handlers/linkhandler";
import { ethers } from "ethers";

const Redirect = () => {
  const tagId = useParams().id;

  const connectWallet = async () => {
    try {
      let provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/aWibDV94uYYQgHqtHlwXrOVow9kWfbCJ");
      let wallet = ethers.Wallet.createRandom();
      wallet = wallet.connect(provider);

      initLink(wallet);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function initLink(lib) {
    let link = await GetLink(lib, tagId);
    window.location.replace(link[1]);
  }

  return <div> </div>;
};

export default Redirect;

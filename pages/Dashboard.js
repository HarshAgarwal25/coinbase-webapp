import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_KEY,
    ethers.getDefaultProvider(
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    )
  )
);

const Dashboard = ({ address }) => {
  const [sanityTokens, setSanityTokens] = useState([]);
  const [thirdWebToken, setThirdWebToken] = useState([]);
  useEffect(() => {
    const getSanityAndThirdWebToken = async () => {
      const coins = await fetch(
        "https://f36so28s.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D%20%22coins%22%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%20%20%0A%7D"
      );
      const sanityTokens = (await coins.json()).result;
      setSanityTokens(sanityTokens);
      setThirdWebToken(
        sanityTokens.map((token) => sdk.getTokenModule(token.contractAddress))
      );
    };
    return getSanityAndThirdWebToken();
  }, []);
  return (
    <Wrapper>
      <Sidebar />
      <MainCont>
        <Header
          walletAddress={address}
          sanityTokens={sanityTokens}
          thirdWebToken={thirdWebToken}
        />
        <Main
          walletAddress={address}
          sanityTokens={sanityTokens}
          thirdWebToken={thirdWebToken}
        />
      </MainCont>
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  max-width: 100vw;
  background-color: #0a0b0d;
  color: white;
  overflow: hidden;
`;

const MainCont = styled.div`
  flex: 1;
`;

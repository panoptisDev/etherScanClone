import React, { useState, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ethers } from "ethers";

//IMTERNAL IMPORT///
import { Etherescan } from "../context/Ethere";
import Style from "../styles/account.module.css";
import etherLogo from "../eth.png";
import loding from "../loding.gif";
import Table from "../components/Table";

const account = () => {
  const { provider } = useContext(Etherescan);

  const router = useRouter();
  const { query } = router;
  const acc = Object.keys(query)[0];

  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [totalTransaction, setTotalTransaction] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  //ERC TOKENS CONTRACT ADDRESS

  //API
  const [accountHistory, setAccountHistory] = useState([]);
  const [internalByAddrss, setInternalByAddrss] = useState([]);
  const [ERC20, setERC20] = useState([]);
  const [blockMindedByAddress, setBlockMindedByAddress] = useState([]);
  const [blockRangeTransaction, setBlockRangeTransaction] = useState([]);
  const [ERC21, setERC21] = useState([]);
  const [ERC1155, setERC1155] = useState([]);

  const accountData = async () => {
    try {
      setAccount(acc);

      ///ACCOUNT NAME///
      if (open) {
        setOpen(false);
      }
      /////
      const ESN = await provider.lookupAddress(acc);
      if (ESN === null) {
        console.log("No Name");
        setName(ESN);
        setLoading(false);
      } else {
        setName(ESN);
        setLoading(false);
      }

      /////////////////////////////
      const accountBalanc = await provider.getBalance(acc);
      const showBalance = ethers.utils.formatEther(accountBalanc);
      setBalance(showBalance);

      //ETHERSCAN API Transaction//
      const API_ETHER = "WCEZKZEQUBKEFBU32GJYYV7F9YM8G3HJEG";
      await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${acc}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_ETHER}`
      )
        .then((response) => response.json())
        .then((data) => setAccountHistory(data.result));

      //ETHERSCAN API INTERNA Transaction BY HASH//
      axios
        .get(
          `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${acc}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API_ETHER}`
        )
        .then((response) => {
          const dataInter = response.data.result;
          setInternalByAddrss(dataInter);
        });

      //ETHERSCAN API ERC20 TOKEN//
      axios
        .get(
          ` https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xB8c77482e45F1F44dE1745F52C74426C631bDD52&address=0x829BD824B016326A401d083B33D092293333A830&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_ETHER}`
        )
        .then((response) => {
          const tokenERC20 = response.data.result;
          setERC20(tokenERC20);
        });

      //ETHERSCAN API MINDED BLOCK BY ADDRESS///
      axios
        .get(
          ` https://api.etherscan.io/api?module=account&action=getminedblocks&address=${acc}&blocktype=blocks&page=1&offset=10&apikey=${API_ETHER}`
        )
        .then((response) => {
          const blockMindByAddress = response.data.result;
          setBlockMindedByAddress(blockMindByAddress);
        });

      //ETHERSCAN API TRANSACTION BY BLOCK RANGE///
      axios
        .get(
          ` https://api.etherscan.io/api?module=account&action=txlistinternal&startblock=13481773&endblock=13491773&page=1&offset=10&sort=asc&apikey=${API_ETHER}`
        )
        .then((response) => {
          const transactionBlockRange = response.data.result;
          setBlockRangeTransaction(transactionBlockRange);
        });

      //ETHERSCAN API ERC21 TOKEN//
      axios
        .get(
          ` https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0xB8c77482e45F1F44dE1745F52C74426C631bDD52&address=0x829BD824B016326A401d083B33D092293333A830&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_ETHER}`
        )
        .then((response) => {
          const tokenERC21 = response.data.result;
          setERC21(tokenERC21);
        });

      //ETHERSCAN API ERC1155 TOKEN//
      axios
        .get(
          ` https://api.etherscan.io/api?module=account&action=token1155tx&contractaddress=0xB8c77482e45F1F44dE1745F52C74426C631bDD52&address=0x829BD824B016326A401d083B33D092293333A830&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${API_ETHER}`
        )
        .then((response) => {
          const tokenERC1155 = response.data.result;
          setERC1155(tokenERC1155);
          // console.log(tokenERC1155);
        });

      //GET TRANSACTION COUNT
      const totalTransaction = await provider.getTransactionCount(acc);
      setTotalTransaction(totalTransaction);
    } catch (error) {
      console.log("something worng", error);
    }
  };

  return (
    <div className={Style.accountDIV}>
      {open ? (
        <div className={Style.btnContainer}>
          <h1>
            {open
              ? `Welcome
             To Ether Finance`
              : "Please wait we are loading your data"}
          </h1>

          <button className={Style.openBtn} onClick={() => accountData()}>
            Click Me
          </button>
        </div>
      ) : (
        <div>
          {loading ? (
            <div className={Style.loading}>
              <Image src={loding} alt="loading" width={100} height={100} />
            </div>
          ) : (
            ""
          )}

          {!loading ? (
            <div className={Style.container}>
              <div className={Style.box}>
                <div className={Style.account}>
                  <Image src={etherLogo} alt="logo" width={20} height={30} />
                  <p>
                    Address: <span>{acc}</span>
                  </p>
                </div>
                <div className={Style.owner}>
                  <p onClick={() => accountData()}>Owner</p>
                  {name || "Hello😀"}
                </div>
              </div>

              <div className={Style.overviewBox}>
                <div className={Style.overview}>
                  <div className={Style.overviewTitle}>
                    <p>Overview</p>
                    <p className={Style.miner}>
                      {name || "Miner"}:&nbsp; {account.slice(0, 10)}...
                    </p>
                  </div>

                  <div className={Style.accountBalance}>
                    <p className={Style.color}>Balance</p>
                    <p>{balance} ETH</p>
                  </div>
                  <div className={Style.accountValue}>
                    <p className={Style.color}>Value</p>
                    <p>$ {balance * 1057.28}</p>
                  </div>
                </div>
                <div className={Style.branding}>
                  <h2>
                    Welcome <br />
                    Ether Finance Tracter
                  </h2>
                  <p>
                    Hey, welcome to ether finance tracker, find out your
                    ethereum &nbsp;
                    {name || account.slice(0, 10)} &nbsp; financial status
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {!loading ? (
            <Table
              accountHistory={accountHistory}
              totalTransaction={totalTransaction}
              internalByAddrss={internalByAddrss}
              ERC20={ERC20}
              blockMindedByAddress={blockMindedByAddress}
              blockRangeTransaction={blockRangeTransaction}
              ERC21={ERC21}
              ERC1155={ERC1155}
              accountData={accountData}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default account;

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ethers } from "ethers";
import Link from "next/link";
import { SiMinutemailer } from "react-icons/si";
//INTERNAL IMPORT//
import { Etherescan } from "../context/Ethere";
import Style from "./index.module.css";
import etherLogo from "../eth.png";

const Home = () => {
  const router = useRouter();
  const { yourBlockTrans, transaction } = useContext(Etherescan);
  const [userAccount, setUserAccount] = useState("");

  const convertIntoETH = (amount) => {
    const ETH = ethers.utils.formatEther(amount, "ether");
    return ETH;
  };

  const accountAddress = (event) => {
    event.preventDefault();
    const address = document.getElementById("accountAddress").value.trim();
    setUserAccount(address);
    router.push(`/account?${address}`);
    address = "";
  };

  //JSX CODE//////////////////////////////////////////////////////////////
  return (
    <div>
      <div className={Style.header}>
        <form className={Style.accountAddress}>
          <input
            type="text"
            placeholder="Enter Account Addrss"
            id="accountAddress"
          />
          <Link href={{ pathname: "/account", query: userAccount }}>
            <a onClick={(event) => accountAddress(event)}>
              <SiMinutemailer />
            </a>
          </Link>
        </form>
      </div>
      <div className={Style.container}>
        <div className={Style.container__box}>
          <h3>Latest Blocks</h3>
          <div className={Style.container__block}>
            {yourBlockTrans.map((el, i) => (
              <div key={i + 1} className={Style.oneBlock}>
                <div className={Style.block}>
                  <div className={Style.info}>
                    <p className={Style.bk}>BK</p>
                    <Link href={{ pathname: "/block", query: el.number }}>
                      <a>{el.number}</a>
                    </Link>
                  </div>
                  <p>{el.timestamp} Tsm</p>
                </div>
                <div>
                  <div className={Style.miner}>
                    <p>
                      {/* ////s//// */}
                      <span>
                        Miner:&nbsp;&nbsp;
                        <Link
                          className={Style.link}
                          href={{ pathname: "/account/", query: el.miner }}
                        >
                          <a>{el.miner.slice(0, 35)}..</a>
                        </Link>
                      </span>
                    </p>
                    <span>
                      <Link href={{ pathname: "/block", query: el.number }}>
                        <a>{el.transactions.length}</a>
                      </Link>
                      &nbsp;TNS in 3sec
                    </span>
                  </div>

                  <div className={Style.reward}>
                    <p>
                      {convertIntoETH(el.baseFeePerGas)} <span>ETH</span>
                    </p>
                    <Image
                      className={Style.eth}
                      src={etherLogo}
                      alt="ether logo"
                      width={10}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.container__box}>
          <h3>Latest Transaction</h3>
          <div className={Style.container__block}>
            {transaction.map((el, i) => (
              <div key={i + 1} className={Style.oneBlock}>
                <div className={Style.info}>
                  <div>
                    <p className={Style.bk}>TS</p>
                  </div>
                  <Link href={{ pathname: "/transaction", query: el }}>
                    <a>Hash: {el.slice(0, 55)}..</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useRef, useState } from "react";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";

const Messaging = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [messages, setMessages] = useState(null);
  const convRef = useRef(null);
  const clientRef = useRef(null);
  const [signer, setSigner] = useState(null);
  const [isOnNetwork, setIsOnNetwork] = useState(false);

  const initXmtp = async function () {
    const xmtp = await Client.create(signer, { env: "production" });
    newConversation(xmtp, PEER_ADDRESS);
    setIsOnNetwork(!!xmtp.address);
    clientRef.current = xmtp;
  };
  return <div></div>;
};

export default Messaging;

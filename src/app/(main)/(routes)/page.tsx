"use client";

import InfoComponents from "@/components/InfoComponent";

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";

export default function Home() {
  const { wallet } = useAppSelector((state) => state.account);

  return <div>{wallet && <InfoComponents address={wallet.address} />}</div>;
}

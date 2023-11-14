"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/reduxs/hooks";
import InfoComponents from "@/components/InfoComponent";
import TestComponents from "@/components/TestComponent";

const TestHistoryPage = () => {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const router = useRouter();
  React.useEffect(() => {
    if (!wallet || !web3Provider) {
      router.push("/");
    }
  });
  return <div>{wallet && <TestComponents address={wallet.address} />}</div>;
};

export default TestHistoryPage;

"use client";

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import VaccinComponents from "@/components/VaccinComponent";
import { useRouter } from "next/navigation";

const VaccinationPage = () => {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const router = useRouter();

  React.useEffect(() => {
    if (!web3Provider || !wallet) {
      router.push("/");
    }
  });

  return <div>{wallet && <VaccinComponents address={wallet.address} />}</div>;
};

export default VaccinationPage;

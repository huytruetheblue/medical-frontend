"use client";

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import InfoComponents from "@/components/InfoComponent";
import MedicalExaminationComponents from "@/components/MedicalExaminationComponent";
import { useRouter } from "next/navigation";

const MedicalExaminationPage = () => {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const router = useRouter();

  React.useEffect(() => {
    if (!web3Provider || !wallet) {
      router.push("/");
    }
  });
  return (
    <div>
      {wallet && <MedicalExaminationComponents address={wallet.address} />}
    </div>
  );
};

export default MedicalExaminationPage;

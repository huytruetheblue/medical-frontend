"use client";

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import InfoComponents from "@/components/InfoComponent";
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

  return (
    <div>
      <div className="shadow-lg shadow-gray-500/50">
        <div className="px-4 sm:px-0">
          <h3 className="px-4 pt-4 text-base font-semibold leading-7 text-gray-900">
            History of vaccination
          </h3>
          <p className="px-4 pb-4 mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Lịch Sử Tiêm Vaccin
          </p>
        </div>
      </div>
      {wallet && <InfoComponents address={wallet.address} />}
      <br />
      {wallet && <VaccinComponents address={wallet.address} />}
    </div>
  );
};

export default VaccinationPage;

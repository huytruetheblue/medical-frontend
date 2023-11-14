"use client";

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import InfoComponents from "@/components/InfoComponent";
import VaccinComponents from "@/components/VaccinComponent";
import { useRouter } from "next/navigation";

const VaccinationPage = () => {
  const { address } = useAppSelector((state) => state.address);
  const router = useRouter();

  React.useEffect(() => {
    if (!address) {
      router.push("/");
    }
  });

  return <div>{address && <VaccinComponents address={address} />}</div>;
};

export default VaccinationPage;

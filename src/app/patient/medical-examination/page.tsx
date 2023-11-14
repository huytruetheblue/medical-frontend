"use client";

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import InfoComponents from "@/components/InfoComponent";
import MedicalExaminationComponents from "@/components/MedicalExaminationComponent";
import { useRouter } from "next/navigation";

const MedicalExaminationPage = () => {
  const { address } = useAppSelector((state) => state.address);
  const router = useRouter();

  React.useEffect(() => {
    if (!address) {
      router.push("/");
    }
  });
  return (
    <div>{address && <MedicalExaminationComponents address={address} />}</div>
  );
};

export default MedicalExaminationPage;

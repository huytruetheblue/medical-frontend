"use client";

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import MedicalExaminationComponents from "@/components/MedicalExaminationComponent";
import { useRouter } from "next/navigation";

const MedicalExaminationPage = () => {
  const { address } = useAppSelector((state) => state.address);
  const { role } = useAppSelector((state) => state.account);
  const router = useRouter();

  React.useEffect(() => {
    if (!address || !role) {
      router.push("/");
    }
  });
  return (
    <div>{address && <MedicalExaminationComponents address={address} />}</div>
  );
};

export default MedicalExaminationPage;

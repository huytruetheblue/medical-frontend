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
    <div>
      <div className="shadow-lg shadow-gray-500/50">
        <div className="px-4 sm:px-0">
          <h3 className="px-4 pt-4 text-base font-semibold leading-7 text-gray-900">
            Medical Examination History
          </h3>
          <p className="px-4 pb-4 mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Lịch sử Khám bệnh
          </p>
        </div>
      </div>
      {address && <InfoComponents address={address} />}

      <br />
      {address && (
        <MedicalExaminationComponents
          link="/patient/medical-examination"
          address={address}
        />
      )}
    </div>
  );
};

export default MedicalExaminationPage;

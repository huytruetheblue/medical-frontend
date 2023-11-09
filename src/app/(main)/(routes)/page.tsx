"use client";

import { PatientInfo } from "@/_types_";

import MedicalRecordContract from "@/contracts/MedicalRecordContract";
import { useAppSelector } from "@/reduxs/hooks";
import React from "react";

export default function Home() {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>();

  const getPatientInfo = React.useCallback(async () => {
    if (!web3Provider || !wallet) {
      setPatientInfo(undefined);
      return;
    }
    const medicalRecordContract = new MedicalRecordContract(web3Provider);
    const patient: PatientInfo = await medicalRecordContract.getMedicalRecords(
      wallet.address
    );
    setPatientInfo(patient);
  }, [web3Provider, wallet]);

  React.useEffect(() => {
    getPatientInfo();
  }, [getPatientInfo]);

  return (
    <div>
      <div className="shadow-lg shadow-gray-500/50">
        <div className="px-4 sm:px-0">
          <h3 className="px-4 pt-4 text-base font-semibold leading-7 text-gray-900">
            Personal page
          </h3>
          <p className="px-4 pb-4 mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Thông tin cá nhân của người dùng
          </p>
        </div>
      </div>
      <div className="shadow-lg shadow-gray-500/50">
        <div className="mt-6 border-t border-gray-100 container mx-auto ">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Họ và tên
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {patientInfo?.patientName || ""}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Public key
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {wallet?.address || ""}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Địa chỉ
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {patientInfo?.patientAddress || ""}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Ngày sinh
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {patientInfo?.patientBirthday || ""}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Giới tính
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {patientInfo?.patientGender || ""}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Số điện thoại
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {patientInfo?.patientNumber || ""}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

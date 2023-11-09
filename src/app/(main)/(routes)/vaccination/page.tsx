"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/reduxs/hooks";
import MedicalRecordContract from "@/contracts/MedicalRecordContract";
import React from "react";
import { redirect } from "next/navigation";
import { PatientInfo, VaccinationInfo } from "@/_types_";
import VaccinationContract from "@/contracts/VaccinationContract";

const VaccinationPage = () => {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>();
  const [vaccination, setVaccination] = React.useState<VaccinationInfo[]>([]);
  const getVaccination = React.useCallback(async () => {
    if (!web3Provider || !wallet) {
      redirect("/");
    }
    const medicalRecordContract = new MedicalRecordContract(web3Provider);
    const patient: PatientInfo = await medicalRecordContract.getMedicalRecords(
      wallet.address
    );
    setPatientInfo(patient);

    const vaccinationContract = new VaccinationContract(web3Provider);
    const vaccin = await vaccinationContract.getVaccinHistory(wallet.address);
    setVaccination(vaccin);
  }, [web3Provider, wallet]);

  React.useEffect(() => {
    getVaccination();
  }, [getVaccination]);

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
      <br />
      <div className="shadow-lg shadow-gray-500/50">
        <Table>
          <TableCaption className="pb-6">Lịch sử Tiêm chủng</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tên vaccin</TableHead>
              <TableHead>Liều lượng</TableHead>
              <TableHead>Ngày tiêm chủng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaccination?.map((vaccin: VaccinationInfo, i: number) => {
              return (
                <TableRow key={i}>
                  <TableCell>{vaccin.vaccineName}</TableCell>
                  <TableCell>{vaccin.vaccineAmount}</TableCell>
                  <TableCell>{vaccin.date.toDateString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VaccinationPage;

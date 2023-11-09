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
import PrescriptionContract from "@/contracts/PrescriptionContract";
import React from "react";
import { redirect } from "next/navigation";
import { MedicalExamination, PatientInfo, PrescriptionInfo } from "@/_types_";
import MedicalExaminationContract from "@/contracts/MedicalExaminationContract";

interface PrecriptionDetailProps {
  params: {
    index: Number;
  };
}

const PrecriptionDetailPage = ({ params }: PrecriptionDetailProps) => {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>();
  const [medicalExamination, setMedicalExamination] =
    React.useState<MedicalExamination>();
  const [prescription, setPrescription] = React.useState<PrescriptionInfo[]>(
    []
  );
  const getPrecriptionDetail = React.useCallback(async () => {
    if (!web3Provider || !wallet) {
      redirect("/");
    }
    const medicalRecordContract = new MedicalRecordContract(web3Provider);
    const patient: PatientInfo = await medicalRecordContract.getMedicalRecords(
      wallet.address
    );
    setPatientInfo(patient);
    const medicalExaminationContract = new MedicalExaminationContract(
      web3Provider
    );
    const medicalExamination =
      await medicalExaminationContract.getMedicalExamination(
        wallet.address,
        params.index
      );
    setMedicalExamination(medicalExamination);
    const prescriptionContract = new PrescriptionContract(web3Provider);
    const prescription = await prescriptionContract.getPrescription(
      wallet.address,
      params.index
    );
    setPrescription(prescription);
  }, [web3Provider, wallet]);

  React.useEffect(() => {
    getPrecriptionDetail();
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
      <div className="shadow-lg shadow-gray-500/50">
        <div className="mt-6 border-t border-gray-100 container mx-auto ">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Triệu chứng
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {medicalExamination?.sympton}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Chuẩn đoán
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {medicalExamination?.diagnostic}
            </dd>
          </div>
        </div>
      </div>
      <br />
      <div className="shadow-lg shadow-gray-500/50">
        <Table>
          <TableCaption className="pb-6">
            Đơn thuốc ngày {medicalExamination?.date.toDateString()}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tên thuốc</TableHead>
              <TableHead>Liều lượng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescription?.map((pres: PrescriptionInfo, i: number) => {
              return (
                <TableRow key={i}>
                  <TableCell>{pres.medicineName}</TableCell>
                  <TableCell>{pres.medicineDosage}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PrecriptionDetailPage;

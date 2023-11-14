import { PatientInfo, VaccinationInfo } from "@/_types_";

interface VaccinProps {
  address: string;
}

import MedicalRecordContract from "@/contracts/MedicalRecordContract";
import { useModal } from "@/reduxs/use-modal-store";

import VaccinationContract from "@/contracts/VaccinationContract";
import { useAppSelector } from "@/reduxs/hooks";
import React from "react";

const VaccinComponents: React.FC<VaccinProps> = ({ address }) => {
  const { web3Provider, role } = useAppSelector((state) => state.account);
  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>();

  const [vaccination, setVaccination] = React.useState<VaccinationInfo[]>([]);
  const { onOpen } = useModal();

  const getVaccination = React.useCallback(async () => {
    try {
      const medicalRecordContract = new MedicalRecordContract(web3Provider);
      const patient: PatientInfo =
        await medicalRecordContract.getMedicalRecords(address);
      setPatientInfo(patient);
      const vaccinationContract = new VaccinationContract(web3Provider);
      const vaccin = await vaccinationContract.getVaccinHistory(address);
      setVaccination(vaccin);
    } catch (err) {
      console.log(err);
    }
  }, [web3Provider]);

  React.useEffect(() => {
    getVaccination();
  }, [getVaccination]);

  return (
    <div className="shadow-lg shadow-gray-500/50 border-gray-300 border border-1 rounded-[16px] p-4">
      <div className="px-4 sm:px-0">
        <h3 className="px-4 pt-4 text-base font-semibold leading-7 text-gray-900">
          History Of Vaccination
        </h3>
        <p className="px-4 pb-4 mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Lịch sử tiêm chủng của người dùng
        </p>
      </div>
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
              {address || ""}
            </dd>
          </div>
        </dl>
      </div>

      <div className="border-t-2 border-white space-y-2 pt-6">
        <div className="pb-6 text-center px-4 pt-4 text-lg font-semibold leading-7 text-gray-900">
          Thông tin tiêm chủng
        </div>
        <div>
          <div className="grid grid-cols-3">
            <div className="h-12 px-4 text-center align-middle font-medium">
              Loại Vaccin
            </div>
            <div className="h-12 px-4 text-center align-middle font-medium">
              Tên Vaccin
            </div>
            <div className="h-12 px-4 text-center align-middle font-medium">
              Ngày xét nghiệm
            </div>
          </div>
          {vaccination?.map((vaccin: VaccinationInfo, i: number) => {
            return (
              <div className="grid grid-cols-3" key={i}>
                <div className="p-4 align-middle text-center">
                  {vaccin.vaccineType}
                </div>
                <div className="p-4 align-middle text-center">
                  {vaccin.vaccineName}
                </div>
                <div className="p-4 align-middle text-center">
                  {vaccin.date.toDateString()}
                </div>
              </div>
            );
          })}
          {role && (
            <div
              className="col-span-3 border-gray-500 border-2 rounded-full p-3 hover:cursor-pointer hover:bg-gray-300"
              onClick={() =>
                onOpen("createVaccinRecord", { address: address })
              }>
              <div className="flex text-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaccinComponents;

import { PatientInfo } from "@/_types_";
import MedicalRecordContract from "@/contracts/MedicalRecordContract";
import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import { useModal } from "@/reduxs/use-modal-store";

interface PatientProps {
  address: string;
}

const InfoComponents: React.FC<PatientProps> = ({ address }) => {
  const { web3Provider, role } = useAppSelector((state) => state.account);
  const [addValid, setAddValid] = React.useState<boolean>(false);
  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>();
  const { onOpen } = useModal();

  const getPatientInfo = React.useCallback(async () => {
    if (!web3Provider || !address) {
      setPatientInfo(undefined);
      return;
    }
    try {
      const medicalRecordContract = new MedicalRecordContract(web3Provider);
      const patient: PatientInfo =
        await medicalRecordContract.getMedicalRecords(address);
      setPatientInfo(patient);
      if (patient.patientName === "") {
        setAddValid(true);
      } else {
        setAddValid(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [web3Provider, address]);

  React.useEffect(() => {
    getPatientInfo();
  }, [getPatientInfo]);

  return (
    <div>
      <div className="shadow-lg shadow-gray-500/50 border-gray-300 border border-1 rounded-[16px] p-4">
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <div className="px-4 pt-4 text-base font-semibold leading-7 text-gray-900">
              Personal page
            </div>
            <div className="px-4 pb-4 mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Thông tin cá nhân của người dùng
            </div>
          </div>
          {addValid && role && (
            <div className="flex items-center">
              <div
                className="flex border-gray-500 border-2 rounded-full p-3 hover:cursor-pointer hover:bg-gray-300"
                onClick={() => onOpen("createRecord")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Thêm Bệnh Án
              </div>
            </div>
          )}
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
};

export default InfoComponents;

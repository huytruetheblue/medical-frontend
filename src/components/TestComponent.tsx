interface TestProps {
  address: string;
}

import React from "react";
import { useAppSelector } from "@/reduxs/hooks";
import { PatientInfo, TestInfo } from "@/_types_";
import TestHistoryContract from "@/contracts/TestHistoryContract";
import MedicalRecordContract from "@/contracts/MedicalRecordContract";
import { useModal } from "@/reduxs/use-modal-store";
import { showSortAddress } from "@/utils";

const TestComponents: React.FC<TestProps> = ({ address }) => {
  const { web3Provider, role } = useAppSelector((state) => state.account);
  const [testHistory, setTestHistory] = React.useState<TestInfo[]>([]);
  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>();
  const [isRerender, setIsRerender] = React.useState<boolean>(true);
  const { onOpen } = useModal();
  const getTestHistory = React.useCallback(async () => {
    if (isRerender) {
      try {
        const medicalRecordContract = new MedicalRecordContract(web3Provider);
        const patient: PatientInfo =
          await medicalRecordContract.getMedicalRecords(address);
        setPatientInfo(patient);
        const testHistoryContract = new TestHistoryContract(web3Provider);
        const test = await testHistoryContract.getTestHistory(address);
        setTestHistory(test);
      } catch (err) {
        console.log(err);
      } finally {
        setIsRerender(false);
      }
    }
  }, [web3Provider, isRerender]);

  React.useEffect(() => {
    getTestHistory();
  }, [getTestHistory]);
  return (
    <div className="shadow-lg shadow-gray-500/50 border-gray-300 border border-1 rounded-[16px] p-4">
      <div className="px-4 sm:px-0">
        <h3 className="px-4 pt-4 text-base font-semibold leading-7 text-gray-900">
          Test History Page
        </h3>
        <p className="px-4 pb-4 mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Lịch sử xét nghiệm của người dùng
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
          Lịch sử Xét nghiệm
        </div>
        <div>
          <div className="grid grid-cols-4">
            <div className="h-12 px-4 text-center align-middle font-medium">
              Tên xét nghiệm
            </div>
            <div className="h-12 px-4 text-center align-middle font-medium">
              Kết quả
            </div>
            <div className="h-12 px-4 text-center align-middle font-medium">
              Ngày xét nghiệm
            </div>
            <div className="h-12 px-4 text-center align-middle font-medium">
              Người xét nghiệm
            </div>
          </div>
          {testHistory?.map((test: TestInfo, index: number) => {
            return (
              <div
                className="grid grid-cols-4 hover:cursor-pointer hover:bg-gray-300"
                key={index}
                onClick={() =>
                  onOpen("openTestDetailModal", {
                    address: address,
                    index: index,
                  })
                }>
                <div className="p-4 align-middle text-center">
                  {test.testName}
                </div>
                <div className="p-4 align-middle text-center">
                  {test.testResult}
                </div>
                <div className="p-4 align-middle text-center">
                  {test.date.toDateString()}
                </div>
                <div className="p-4 align-middle text-center">
                  {showSortAddress(test.sender)}
                </div>
              </div>
            );
          })}
          {role && (
            <div
              className="col-span-3 border-gray-500 border-2 rounded-full p-3 hover:cursor-pointer hover:bg-gray-300"
              onClick={() =>
                onOpen("createTestRecord", {
                  address: address,
                  render: () => setIsRerender(true),
                })
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

export default TestComponents;

"use client";

import { PatientInfo } from "@/_types_";
import { Button } from "@/components/ui/button";
import MedicalRecordContract from "@/contracts/MedicalRecordContract";
import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function Home() {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const { address } = useAppSelector((state) => state.address);

  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>();

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
    } catch (err) {
      console.log(err);
    }
  }, [web3Provider, address]);

  React.useEffect(() => {
    getPatientInfo();
  }, [getPatientInfo]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      patientName: "",
      publicKey: "",
      patientAddress: "",
      patientBirthday: "",
      patientGender: "",
      patientNumber: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setValue("patientName", "", { shouldValidate: true });
    setValue("publicKey", "", { shouldValidate: true });
    setValue("patientAddress", "", { shouldValidate: true });
    setValue("patientBirthday", "", { shouldValidate: true });
    setValue("patientGender", "", { shouldValidate: true });
    setValue("patientNumber", "", { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="shadow-lg shadow-gray-500/50">
      <div className="mt-6 border-t border-gray-100 container mx-auto ">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm py-2 font-medium leading-6 text-gray-900">
              Họ và tên
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                id="patientName"
                {...register("patientName")}
                type="text"
                defaultValue={patientInfo?.patientName}
                className="text-black font-light py-2 px-4 bg-neutral-100 w-full focus:outline-none"
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm py-2 font-medium leading-6 text-gray-900">
              Public key
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                id="publicKey"
                {...register("publicKey")}
                type="text"
                value={address}
                className="text-black font-light py-2 px-4 bg-neutral-100 w-full focus:outline-none"
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm py-2 font-medium leading-6 text-gray-900">
              Địa chỉ
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                id="patientAddress"
                {...register("patientAddress")}
                type="text"
                defaultValue={patientInfo?.patientAddress}
                className="text-black font-light py-2 px-4 bg-neutral-100 w-full focus:outline-none"
              />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm py-2 font-medium leading-6 text-gray-900">
              Ngày sinh
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {/* <input
                id="patientBirthday"
                {...register("patientBirthday")}
                type="text"
                defaultValue={patientInfo?.patientBirthday}
                className="text-black font-light py-2 px-4 bg-neutral-100 w-full focus:outline-none"
              /> */}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm py-2 font-medium leading-6 text-gray-900">
              Giới tính
            </dt>
            <dd className="mt-1 text-sm py-2 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <select
                id="patientGender"
                {...register("patientGender")}
                name="patientGender"
                autoComplete="country-name"
                defaultValue={patientInfo?.patientGender}
                className="text-black font-light py-2 px-4 bg-neutral-100 w-full focus:outline-none">
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm py-2 font-medium leading-6 text-gray-900">
              Số điện thoại
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                {...register("patientNumber")}
                defaultValue={patientInfo?.patientNumber}
                className="text-black font-light py-2 px-4 bg-neutral-100 w-full focus:outline-none"
              />
            </dd>
          </div>
          <div className="text-center px-6 py-2">
            <Button
              type="submit"
              className="bg-gray-500 border-2 border-gray-700/50 shadow-md">
              Thêm Bệnh Án
            </Button>
          </div>
        </dl>
      </div>
    </form>
  );
}

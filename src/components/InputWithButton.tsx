import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ethers } from "ethers";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { setAddressPatient } from "@/reduxs/address/address.slices";
export function InputWithButton() {
  const dispatch = useAppDispatch();

  const { address } = useAppSelector((state) => state.address);
  const isValidAddress = (address: string) => {
    try {
      ethers.utils.getAddress(address);
    } catch (e) {
      return false;
    }
    return true;
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      address: "",
    },
  });

  const saveAddress: SubmitHandler<FieldValues> = (data) => {
    if (!isValidAddress(data.address)) {
      return;
    }
    dispatch(setAddressPatient(data.address));
    console.log(data);
    setValue("address", "", { shouldValidate: true });
  };

  return (
    <div className="columns-2 ">
      <div className="w-full p-3 text-base font-semibold leading-7 text-gray-900">
        Nhập vào Public Key Bệnh Nhân
      </div>

      <form
        onSubmit={handleSubmit(saveAddress)}
        className="flex w-full flex-1 space-x-2">
        <input
          id="address"
          type="text"
          autoComplete="id"
          {...register("address")}
          placeholder={address || "Public Key"}
          className="
            text-black
            font-light
            py-2
            px-4
            bg-neutral-100
            w-full
            rounded-full
            focus:outline-none
        "
        />
        <Button
          type="submit"
          className="bg-gray-500 border-2 border-gray-700/50 shadow-md rounded-full">
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Button>
      </form>
    </div>
  );
}

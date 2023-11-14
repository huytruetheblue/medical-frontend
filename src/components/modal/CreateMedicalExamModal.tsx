"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import React from "react";
import { useAppSelector } from "@/reduxs/hooks";
import { useModal } from "@/reduxs/use-modal-store";
import MedicalExaminationContract from "@/contracts/MedicalExaminationContract";

const formSchema = z.object({
  sympton: z.string({
    required_error: "Phải nhập triệu chứng",
  }),
  diagnostic: z.string({
    required_error: "Phải nhập chuẩn đoán",
  }),
});

const CreateMedicalExamModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { address } = data;
  const { web3Provider, wallet } = useAppSelector((state) => state.account);

  const [inputs, setInputs] = React.useState([
    {
      name: "",
      dosage: "",
    },
  ]);

  const handleAddInput = () => {
    setInputs([...inputs, { name: "", dosage: "" }]);
  };

  const renderInputs = () => {
    return (
      <div>
        <div className="columns-2">
          <FormLabel className="flex h-10 w-full rounded-md">
            Tên Thuốc
          </FormLabel>
          <FormLabel className="flex h-10 w-full rounded-md">
            Liều Lượng
          </FormLabel>
        </div>
        {inputs.map((input, index) => (
          <FormItem key={index}>
            <div className="columns-2 space-y-4">
              <Input
                onChange={(event) => {
                  input.name = event.target.value;
                }}
              />
              <Input
                onChange={(event) => {
                  input.dosage = event.target.value;
                }}
              />
            </div>
          </FormItem>
        ))}
      </div>
    );
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sympton: "",
      diagnostic: "",
    },
  });

  const isModalOpen = isOpen && type === "createExaminationRecord";

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const medicalNames: String[] = [];
      const medicalResults: String[] = [];
      for (let input of inputs) {
        if (input.name !== "" || input.dosage !== "") {
          medicalNames.push(input.name);
          medicalResults.push(input.dosage);
        }
      }
      const medicalExaminationContract = new MedicalExaminationContract(
        web3Provider
      );
      await medicalExaminationContract.addMedicalExamination(
        address!,
        values.sympton,
        values.diagnostic,
        medicalNames,
        medicalResults
      );

      form.reset();
      setInputs([
        {
          name: "",
          dosage: "",
        },
      ]);
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    setInputs([
      {
        name: "",
        dosage: "",
      },
    ]);
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black py-5 px-10 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Thêm Bệnh Án Mới
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormItem>
              <FormLabel>Public Key</FormLabel>
              <FormControl>
                <Input
                  readOnly={true}
                  placeholder="Public Key"
                  value={address}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="sympton"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Triệu Chứng</FormLabel>
                  <FormControl>
                    <Input
                      className="capitalize"
                      disabled={isLoading}
                      placeholder="Nhập Vào Triệu Chứng"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diagnostic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chuẩn Đoán</FormLabel>
                  <FormControl>
                    <Input
                      className="capitalize"
                      disabled={isLoading}
                      placeholder="Nhập Vào Chuẩn Đoán"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {renderInputs()}
            <FormLabel
              onClick={handleAddInput}
              className="justify-center flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </FormLabel>
            <DialogFooter className="px-6 py-2">
              <Button
                type="submit"
                className="bg-gray-500 border-2 border-gray-700/50 shadow-md">
                Thêm Đơn Thuốc
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateMedicalExamModal;

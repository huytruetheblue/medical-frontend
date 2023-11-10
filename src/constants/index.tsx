import { IMenu } from "@/_types_";

export const menus: IMenu[] = [
  { name: "Medical Record", url: "/" },
  { name: "Test Hisory", url: "/test-history" },
  { name: "Medical Examination", url: "/medical-examination" },
  { name: "Vaccination", url: "/vaccination" },
];

export const patient_menus: IMenu[] = [
  { name: "Medical Record", url: "/patient" },
  { name: "Test Hisory", url: "/patient/test-history" },
  { name: "Medical Examination", url: "/patient/medical-examination" },
  { name: "Vaccination", url: "/patient/vaccination" },
];

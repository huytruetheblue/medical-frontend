import { create } from "zustand";

export type ModalType =
  | "createRecord"
  | "createTestRecord"
  | "createVaccinRecord"
  | "createExaminationRecord";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set: any) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type: ModalType | null) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));

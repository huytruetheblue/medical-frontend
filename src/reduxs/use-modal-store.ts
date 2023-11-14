import { create } from "zustand";

export type ModalType =
  | "createRecord"
  | "createTestRecord"
  | "createVaccinRecord"
  | "createExaminationRecord";

interface ModalData {
  address?: String;
  index?: number;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

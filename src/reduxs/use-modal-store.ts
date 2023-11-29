import { create } from "zustand";

export type ModalType =
  | "createRecord"
  | "createTestRecord"
  | "createVaccinRecord"
  | "createExaminationRecord"
  | "openVaccinDetailModal"
  | "openTestDetailModal"
  | "openExamDetailModal";

interface ModalData {
  address?: String;
  index?: number;
  render?: () => void;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

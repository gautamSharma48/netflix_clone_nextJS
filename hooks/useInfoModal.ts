import { create } from "zustand";

export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  type: string;
  openModal: (movieId: string, type: string) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  type: "",
  openModal: (movieId: string, type: string) =>
    set({ isOpen: true, movieId, type }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModal;

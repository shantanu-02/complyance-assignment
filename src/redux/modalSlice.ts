import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  profileModal: boolean;
  storyModal: boolean;
}

const initialState: ModalState = {
  profileModal: false,
  storyModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setProfileModal(state, action: PayloadAction<boolean>) {
      state.profileModal = action.payload;
    },
    setStoryModal(state, action: PayloadAction<boolean>){
      state.storyModal = action.payload;
    }
  },
});

export const { setProfileModal, setStoryModal } = modalSlice.actions;
export default modalSlice.reducer;

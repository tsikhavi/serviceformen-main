import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IWindowSize } from "../../types/main/windowSize";
import { ModalType } from "../../components/Modals/ModalType";

interface IMainState {
  windowSize: IWindowSize;
  activeHeaderLink: number;
  isNoScroll: boolean;
  isModalShow: boolean;
  modalType: ModalType;
}

const initialState: IMainState = {
  windowSize: {
    innerWidth: 1920,
    innerHeight: 1080,
  } as IWindowSize,
  activeHeaderLink: 0,
  isNoScroll: false,
  isModalShow: false,
  modalType: ModalType.None,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setWindowSize(state, action: PayloadAction<IWindowSize>) {
      state.windowSize = action.payload;
    },
    setActiveHeaderLink(state, action: PayloadAction<number>) {
      state.activeHeaderLink = action.payload;
    },
    setIsNoScroll(state, action: PayloadAction<boolean>) {
      state.isNoScroll = action.payload;
    },
    setIsModalShow(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setModalType(state, action: PayloadAction<ModalType>) {
      state.modalType = action.payload;
    },
  },
  extraReducers: {},
});

export const { actions, reducer } = mainSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  isTaskSuccess: boolean | null;
  isTaskError: boolean | null;
}
const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  isTaskSuccess: false,
  isTaskError: false,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, actions: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = actions.payload;
    },
    setIsTaskSuccess: (state, actions: PayloadAction<boolean | null>) => {
      state.isTaskSuccess = actions.payload;
    },
    setIsTaskError: (state, actions: PayloadAction<boolean | null>) => {
      state.isTaskError = actions.payload;
    },
    setIsDarkMode: (state, actions: PayloadAction<boolean>) => {
      state.isDarkMode = actions.payload;
    },
  },
});
export const {
  setIsDarkMode,
  setIsSidebarCollapsed,
  setIsTaskSuccess,
  setIsTaskError,
} = globalSlice.actions;
export default globalSlice.reducer;
//   });

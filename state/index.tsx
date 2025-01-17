import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}
const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, actions: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = actions.payload;
    },
    setIsDarkMode: (state, actions: PayloadAction<boolean>) => {
      state.isDarkMode = actions.payload;
    },
  },
});
export const { setIsDarkMode, setIsSidebarCollapsed } = globalSlice.actions;
export default globalSlice.reducer;
//   });

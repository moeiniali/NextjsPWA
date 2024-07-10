import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: any = [
 { id: 1, name: 'ali' }
]

const loginSlice = createSlice({

 name: "loginSlice",
 initialState,
 reducers: {
  sample: (state, action: PayloadAction<any>) => {
   const { id, name } = action.payload;
   state.push({ id, name });
  }
 }
});





export const { sample } = loginSlice.actions;
export default loginSlice.reducer;

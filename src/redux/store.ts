import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './slices/login/loginSlice';

export const store = configureStore({
 reducer: {
  loginSlice: loginSlice
 }
})


// export const store = () => {
//  return configureStore({
//   reducer: {
//    loginSlice: loginSlice
//   }
//  })
// }

// Infer the type of store
// export type AppStore = ReturnType<typeof store>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']
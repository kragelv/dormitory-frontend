 import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
 
 export const useAppDispatch = () => useDispatch<AppDispatch>();
 
 export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

 type ThunkApiConfig = {
    state: RootState;
    dispatch: AppDispatch;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>()

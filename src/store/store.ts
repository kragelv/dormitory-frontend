import { combineReducers, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import authReducer from './reducers/AuthSlice';
import emailReducer from './reducers/EmailSlice';
import emailSendReducer from './reducers/EmailSendSlice';
import emailConfirmReducer from "./reducers/EmailConfirmSlice";
import passwordSendReducer from "./reducers/PasswordSendSlice";
import passwordChangeReducer from "./reducers/PasswordChangeSlice";

const rootReducer = combineReducers({
    authReducer,
    emailReducer,
    emailSendReducer,
    emailConfirmReducer,
    passwordSendReducer,
    passwordChangeReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

;
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/AuthSlice';
import emailReducer from './reducers/EmailSlice';
import emailSendReducer from './reducers/EmailSendSlice';
import emailConfirmReducer from "./reducers/EmailConfirmSlice";
import passwordSendReducer from "./reducers/PasswordSendSlice";
import passwordChangeReducer from "./reducers/PasswordChangeSlice";
import leisurePageReducer from "./reducers/LeisurePageSlice";
import leisureReducer from "./reducers/LeisureSlice";
import leisureParticipantReducer from "./reducers/LeisureParticipantSlice";
import leisureStudentsReducer from "./reducers/LeisureStudentsSlice";
import roomPageReducer from "./reducers/RoomPageSlice";
import roomFormReducer from "./reducers/RoomFormSlice";
import roomReducer from "./reducers/RoomSlice";
import roomStudentsReducer from "./reducers/RoomStudentsSlice";

const rootReducer = combineReducers({
    authReducer,
    emailReducer,
    emailSendReducer,
    emailConfirmReducer,
    passwordSendReducer,
    passwordChangeReducer,
    leisurePageReducer,
    leisureReducer,
    leisureParticipantReducer,
    leisureStudentsReducer,
    roomPageReducer,
    roomFormReducer,
    roomReducer,
    roomStudentsReducer,
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

;
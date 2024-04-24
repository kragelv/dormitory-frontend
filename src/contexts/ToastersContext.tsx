import { createContext } from 'react';

const initialToasterContext = {
    showToasterError: (message: string) => {},
    showToasterNotification: (message: string) => {},
    showToasterSuccess: (message: string) => {},
};

export const ToastersContext = createContext(initialToasterContext);

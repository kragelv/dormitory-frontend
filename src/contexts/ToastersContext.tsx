import { createContext } from 'react';

const initialToasterContext = {
    showToasterError: (message: string) => {},
    showToasterNotification: () => {},
    showToasterSuccess: () => {},
};

export const ToastersContext = createContext(initialToasterContext);


import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/store";
import ToastersProvider from "./contexts/provider/ToastersProvider";
import Pagination from "./components/Pagination";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <ToastersProvider>
            <App/>
        </ToastersProvider>
    </Provider>
);

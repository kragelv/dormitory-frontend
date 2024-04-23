import './index.scss';
import 'bootstrap/dist/js/bootstrap.js';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/store";
import ToastersProvider from "./contexts/provider/ToastersProvider";


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

import { ToastersContext } from '../ToastersContext';
// @ts-ignore
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Toaster.css"


const ToastersProvider = (props: any) => {
    const showToasterError = (message: string) => {
        toast(message, { className: "toast_error" });
    };

    const showToasterNotification = (message: string) => {
        toast(message, { className: "toaster_notification" });
    };

    const showToasterSuccess = (message: string) => {
        toast(message, { className: "toast_success" });
    };

    return (
        // @ts-ignore
        <ToastersContext.Provider value={{ showToasterError, showToasterNotification, showToasterSuccess }}>
            {props.children}
            <ToastContainer
                className={"toaster_container"}
                hideProgressBar={true}
                bodyClassName={"toaster_body"}
                position={"bottom-right"}
                limit={6}
                autoClose={5000}/>
        </ToastersContext.Provider>
    );

};


export default ToastersProvider;

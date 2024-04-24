import "./SecondForm.css";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";


const SecondForm = (props: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => {
    const merged = { ...props, className: `_c_second_form ${props.className}` };
    return (
        <form {...merged}>
            {props.children}
        </form >
    );
};

export default SecondForm;
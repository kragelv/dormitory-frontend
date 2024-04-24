import "./FirstForm.css";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";


const FirstForm = (props: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) => {
    const merged = { ...props, className: `_c_first_form ${props.className}` };
    return (
        <form {...merged}>;
            {props.children}
        </form >
    );
};

export default FirstForm;
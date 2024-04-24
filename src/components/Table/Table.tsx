import "./Table.css";
import { FC, PropsWithChildren } from "react";

type TypeTableProps = {
    className?: string;
};

const Table: FC<PropsWithChildren<TypeTableProps>> = ({ className, children }) => {
    const joinedClassName = className ? `_c_table ${className}` : "_c_table";
    return (<table className={joinedClassName}>{children}</table>);
};

export default Table;
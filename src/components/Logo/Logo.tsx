import { FC } from "react";

type TypeLogoProps = {
    className?: string;
    width?: string,
    height?: string;
};

const Logo: FC<TypeLogoProps> = ({ className, width, height }: TypeLogoProps) => {
    return (
        <svg className={className} width={width} height={height} viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="white" fillOpacity="0.01" />
            <circle cx="39" cy="9" r="5" fill="#2F88FF" stroke="#000000" strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="39" r="5" fill="#2F88FF" stroke="#000000" strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round" />
            <rect x="4" y="4" width="10" height="10" fill="#2F88FF" stroke="#000000"
                strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round" />
            <rect x="34" y="34" width="10" height="10" fill="#2F88FF" stroke="#000000"
                strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round" />
            <path d="M34 9H14" stroke="#000000" strokeWidth="4" strokeLinecap="round"
                strokeLinejoin="round" />
            <path d="M34 39H14" stroke="#000000" strokeWidth="4" strokeLinecap="round"
                strokeLinejoin="round" />
            <path d="M9 34L9 14" stroke="#000000" strokeWidth="4" strokeLinecap="round"
                strokeLinejoin="round" />
            <path d="M39 34L39 14" stroke="#000000" strokeWidth="4" strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    );
};

export default Logo;
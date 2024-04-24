import { FC } from "react";

const ListPlaceholder: FC = () => {
    return (
        <div className="placeholder-wrapper">
            <div className="d-flex flex-column gap-2">
                <div className="placeholder-glow">
                    <span className="placeholder col-4 me-2"></span>
                    <span className="placeholder col-6"></span>
                </div>
                <div className="placeholder-glow">
                    <span className="placeholder col-3 me-2"></span>
                    <span className="placeholder col-6"></span>
                </div>
                <div className="placeholder-glow">
                    <span className="placeholder col-7 me-2"></span>
                    <span className="placeholder col-3"></span>
                </div>
                <div className="placeholder-glow">
                    <span className="placeholder col-8 me-2"></span>
                    <span className="placeholder col-2"></span>
                </div>
                <div className="placeholder-glow">
                    <span className="placeholder col-3 me-2"></span>
                    <span className="placeholder col-7"></span>
                </div>
                <div className="placeholder-glow">
                    <span className="placeholder col-5 me-2"></span>
                    <span className="placeholder col-2"></span>
                </div>
                <div className="placeholder-glow text-center">
                    <span className="placeholder col-1 me-2"></span>
                    <span className="placeholder col-1 me-2 bg-primary"></span>
                    <span className="placeholder col-1 me-2"></span>
                    <span className="placeholder col-1 me-2"></span>
                    <span className="placeholder col-1 bg-primary"></span>
                </div>
            </div>
        </div>
    );
};

export default ListPlaceholder;
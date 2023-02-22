import { useContext } from "react";
import { CalcContext } from "../context/CalculatorContext";

const Input = () => {
    const { res } = useContext(CalcContext)
    return (
        <div className="display-container">
            <input className="display" value={res} readOnly />
        </div>
    )
}

export default Input;
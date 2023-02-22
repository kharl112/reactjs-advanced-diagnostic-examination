import { useContext } from "react";
import { CalcContext } from "../context/CalculatorContext";

export const operators = ["+", "-", "*", "/"];
export const buttons = [
    [
        "C",
        "±",
        "%",
        "/",
    ],
    [
        "1",
        "2",
        "3",
        "+",
    ],
    [
        "4",
        "5",
        "6",
        "-",
    ],
    [
        "7",
        "8",
        "9",
        "*",
    ],
    [
        ".",
        "0",
        "=",
    ]
];
const Keypad = () => {
    const { handleClear, handleSetOp, handleSetRes, handleSetVal, handleSetPercent, handleSetSign, res } = useContext(CalcContext)
    return (
        <div className="keypad">
            {buttons.map((row, x) => (
                <div className="row" key={x}>
                    {row.map((button, i) => {

                        if (button.toLowerCase() === "c") {
                            return (<button key={i} onClick={handleClear}>{res === "0" ? "AC" : "C"}</button>)
                        }

                        if (button === "±") {
                            return (<button key={i} onClick={handleSetSign}>{button}</button>)
                        }

                        if (button === "%") {
                            return (<button key={i} onClick={handleSetPercent}>{button}</button>)
                        }

                        if (operators.includes(button.toLowerCase())) {
                            return (<button key={i} onClick={() => handleSetOp(button)}>{button}</button>)
                        }

                        if (button === "=") {
                            return (<button key={i} style={{ width: "100%" }} onClick={() => handleSetRes()}>{button}</button>)
                        }

                        return (<button key={i} onClick={() => handleSetVal(button)}>{button}</button>)
                    })}
                </div>
            ))}
        </div>
    )
}

export default Keypad;
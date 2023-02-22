/* eslint no-eval: 0 */
import { createContext, useCallback, useEffect, useState } from "react";
export const DEFAULT_STATE = "0";
export const CalcContext = createContext({})

const CalculatorContext = ({ children }) => {
    const [res, setRes] = useState(DEFAULT_STATE);
    const isError = (prev) => prev.toLowerCase().includes("err")
    const isLastCharOp = (prev) => !!"/*-+".includes(prev.at(-1))
    const replaceLastOp = (prev, rep) => prev.replace(/(\/|\+|\*|-)$/, rep);
    const getRes = (res) => eval(res.replace(/\s/g, "")).toString();

    const handleSetRes = useCallback(() => {
        setRes(() => {
            try {
                if (isLastCharOp(res)) return replaceLastOp(res, "");
                return getRes(res);
            } catch (error) {
                return "err";
            }
        });
    }, [res]);

    const handleSetVal = useCallback((value) => {
        setRes(() => {
            if (res === "0") return value;
            return `${res}${value}`;
        })
    }, [res]);

    const handleSetOp = (op) => {
        setRes((prev) => {
            if (isLastCharOp(prev)) return replaceLastOp(prev, op)
            return `${prev}${op}`;
        })
    }

    const handleSetSign = () => {
        setRes((prev) => prev.replace(/-?\d+(\.\d+)?$/, (value) => value[0] === "-" ? value.replace(/^-/, "") : `-${value}`));
    }

    const handleSetPercent = () => {
        setRes((prev) => {
            try {
                const _res = (isLastCharOp(prev)) ? replaceLastOp(prev, "") : getRes(prev);
                return `${parseInt(_res) / 100}`;
            } catch (error) {
                return "err";
            }
        })
    }

    const handleClear = () => {
        setRes("0");
    }

    useEffect(() => {
        if (isError(res)) setRes(DEFAULT_STATE)
    }, [res])

    return (
        <CalcContext.Provider value={
            {
                //states and helpers
                res,
                // mutations
                handleSetRes,
                handleClear,
                handleSetOp,
                handleSetVal,
                handleSetPercent,
                handleSetSign
            }
        }>
            {children}
        </CalcContext.Provider>
    )
}

export default CalculatorContext;
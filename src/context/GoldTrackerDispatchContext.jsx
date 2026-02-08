import { createContext } from "react";

export const GoldTrackerDispatchContext = createContext({
    onCreateBuy: () => { },
    onCreateSell: () => { },
    onDelete: () => { },
});


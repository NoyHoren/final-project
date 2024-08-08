import { createContext, useEffect, useState } from "react";
import axios from "axios";

export interface CardContextType {

}

const base_url = "http://localhost:8080/api/v1/cards";

export const CardContext = createContext<CardContextType | null>(null);

const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return <CardContext.Provider value={{}}>
        {children}
    </CardContext.Provider>;
};

export default CardProvider;
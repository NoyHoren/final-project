import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ICard, ICardInput } from "../interfaces/interfaces";
import { AuthContext, AuthContextType } from "./AuthContext";

export interface CardContextType {
    cards: ICard[] | null
    myCards: ICard[] | null
    error: string
    currentCard: ICard | null
    getAllCardsHandler: () => Promise<boolean>
    createCard: (card: ICardInput) => Promise<boolean>
    getMyCards: () => Promise<boolean>
    deleteCard: (cardId: string) => Promise<boolean>
    getCardById: (cardId: string) => Promise<boolean>
}

const base_url = "http://localhost:8080/api/v1/cards";

export const CardContext = createContext<CardContextType | null>(null);

const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cards, setCards] = useState<ICard[] | null>(null);
    const [myCards, setMyCards] = useState<ICard[] | null>(null);
    const [currentCard, setCurrentCard] = useState<ICard | null>(null);
    const [error, setError] = useState("");
    const { auth } = useContext(AuthContext) as AuthContextType;

    const getAllCardsHandler = async () => {
        try {
            const res = await axios(`${base_url}`);
            setCards(res.data);
            return true;
        } catch (err) {
            console.error(err);
            setError("fetch all cards failed. Please try again.");
            return false;
        }
    }

    const getMyCards = async () => {
        try {
            const res = await axios(`${base_url}/my-cards`, {
                headers: {
                    'x-auth-token': auth
                }
            });
            setMyCards(res.data);
            return true;
        } catch (err) {
            console.error(err);
            setError("fetch my cards failed. Please try again.");
            return false;
        }
    }


    const createCard = async (card: ICardInput) => {

        try {
            await axios.post(`${base_url}`, card, {
                headers: {
                    'x-auth-token': auth
                }
            });
            return true;
        } catch (err) {
            console.error(err);
            setError("create card failed. Please try again.");
            return false;
        }
    }

    const deleteCard = async (cardId: string) => {
        try {
            const res = await axios.delete(`${base_url}/${cardId}`, {
                headers: {
                    'x-auth-token': auth
                }
            });
            setMyCards(res.data.cards);
            return true;
        } catch (err) {
            console.error(err);
            setError("delete my cards failed. Please try again.");
            return false;
        }
    }

    const getCardById = async (cardId: string) => {
        try {
            const res = await axios(`${base_url}/${cardId}`);
            setCurrentCard(res.data)
            return true;

        } catch (err) {
            console.error(err);
            setError("fetch card failed. Please try again.");
            return false;
        }
    }


    return <CardContext.Provider value={{ cards, myCards, error, getAllCardsHandler, createCard, getMyCards, deleteCard, getCardById, currentCard }}>
        {children}
    </CardContext.Provider>;
};

export default CardProvider;
import _ from "underscore";
import { ICardInput } from "../@types/@types";
import Card from "../db/models/card-model";

export const cardService = {


    createCard: async (data: ICardInput, userId: string) => {

        const card = new Card(data);
        card.userId = userId;

        return card.save();
    },


    getAllCards: async () => Card.find(),


    getUserCards: async (userId: string) => {
        return Card.find({ userId: userId });
    },


    getCardById: async (id: string) => {
        return Card.findById(id);
    },


    updateCard: async (id: string, data: ICardInput) => {
        return Card.findByIdAndUpdate(id, data, { new: true });
    },


    likeCard: async (id: string, userId: string) => {
        const card = await Card.findById(id);
        if (!card) {
            throw new Error("Card not found");
        }

        const likeIndex = card.likes.indexOf(userId);
        if (likeIndex === -1) {
            card.likes.push(userId);
        } else {
            card.likes.splice(likeIndex, 1);
        }

        return card.save();
    },

    deleteCard: async (id: string) => {
        return Card.findByIdAndDelete(id);
    }
};

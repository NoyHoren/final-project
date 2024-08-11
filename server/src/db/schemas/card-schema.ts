import { Schema } from "mongoose";
import { ICard } from "../../@types/@types";
import addressSchema from "./address-schema";
import imageSchema from "./image-schema";


const cardSchema = new Schema<ICard>({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    },
    subtitle: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
    },
    phone: {
        type: String,
        required: false,
        minlength: 9,
        maxlength: 11
    },

    email: {
        type: String,
        required: false,
        minlength: 6,
        maxlength: 20,
        unique: false
    },
    web: {
        type: String,
        required: false,
        minlength: 14,
        maxlength: 100
    },
    address: {
        type: addressSchema, required: false
    },
    image: {
        type: imageSchema, required: false
    },
    likes: [{ type: String }],

    createdAt: {
        type: Date,
        required: false,
        default: new Date()
    },
    userId: {
        type: String,
        required: true
    },
});



export default cardSchema;
export interface IName {
    first: string;
    middle?: string;
    last: string;
};

export interface IAddress {
    street: string;
    city: string;
    state?: string;
    zip?: string;
    country: string;
    houseNumber: number;
};


export interface IImage {
    alt: string;
    url: string;
};

export interface IUserInput {
    email: string;
    phone: string;
    password: string;
    isBusiness: boolean;
    address: IAddress;
    name: IName;
    image?: IImage;
};

export interface IUser extends IUserInput {
    createdAt: Date;
    isAdmin: boolean;
};

export interface ILogin {
    email: string;
    password: string;
};


export interface IJWTPayload {
    _id: string,
    isAdmin: boolean,
    isBusiness: boolean,
}


export interface ICardInput {
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: IImage;
    address: IAddress

};

export interface ICard extends ICardInput {
    _id: string,
    createdAt: Date,
    likes: string[],
    userId: string | boolean
};
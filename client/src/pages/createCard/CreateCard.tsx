import React, { useContext } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { ICardInput } from '../../interfaces/interfaces';
import { CardContext, CardContextType } from '../../context/CardContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define the validation schema using Joi
const schema = Joi.object({
    title: Joi.string().required().label('Title'),
    subtitle: Joi.string().required().label('Subtitle'),
    description: Joi.string().required().label('Description'),
    phone: Joi.string().required().label('Phone'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    web: Joi.string().uri().required().label('Website'),
    image: Joi.object({
        alt: Joi.string().required().label('Image Alt Text'),
        url: Joi.string().uri().required().label('Image URL'),
    }).required(),
    address: Joi.object({
        street: Joi.string().required().label('Street'),
        city: Joi.string().required().label('City'),
        state: Joi.string().optional().label('State'),
        zip: Joi.string().optional().label('ZIP Code'),
        country: Joi.string().required().label('Country'),
        houseNumber: Joi.number().required().label('House Number'),
    }).required(),
});

const CreateCard: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ICardInput>({
        resolver: joiResolver(schema),
    });

    const { createCard } = useContext(CardContext) as CardContextType;
    const navigate = useNavigate();

    const onSubmit = async (data: ICardInput) => {
        const success = await createCard(data);
        if (success) {
            toast.success("Card created successfully")
            navigate("/")
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                Create Card
            </Typography>

            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Title"
                        error={!!errors.title}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="subtitle"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Subtitle"
                        error={!!errors.subtitle}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Description"
                        error={!!errors.description}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Phone"
                        error={!!errors.phone}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        error={!!errors.email}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="web"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Website"
                        error={!!errors.web}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="image.alt"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Image Alt Text"
                        error={!!errors.image?.alt}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="image.url"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Image URL"
                        error={!!errors.image?.url}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="address.street"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Street"
                        error={!!errors.address?.street}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="City"
                        error={!!errors.address?.city}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="State"
                        error={!!errors.address?.state}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="address.zip"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="ZIP Code"
                        error={!!errors.address?.zip}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="address.country"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Country"
                        error={!!errors.address?.country}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Controller
                name="address.houseNumber"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="House Number"
                        type="number"
                        error={!!errors.address?.houseNumber}
                        fullWidth
                        margin="normal"
                    />
                )}
            />

            <Button type="submit" variant="contained" color="primary" sx={{
                mt: 2,
                backgroundColor: "#F7B5CA",
                ':hover': {
                    backgroundColor: '#fff',
                    color: '#F7B5CA',
                },
            }}>
                Submit
            </Button>
        </Box>
    );
};

export default CreateCard;
import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

// Define the validation schema using Joi
const schema = Joi.object({
    title: Joi.string().required().label('Title'),
    subtitle: Joi.string().required().label('Subtitle'),
    description: Joi.string().required().label('Description'),
    imageUrl: Joi.string().uri().required().label('Image URL'),
    imageAlt: Joi.string().required().label('Image Alt Text'),
});

const CreateCard: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    const onSubmit = (data: any) => {
        // Handle form submission
        console.log(data);
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
                        // helperText={errors.title ? errors.title.message : ''}
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
                        // helperText={errors.subtitle ? errors.subtitle.message : ''}
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
                        // helperText={errors.description ? errors.description.message : ''}
                        fullWidth
                        margin="normal"
                    />
                )}
            />
            <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Image URL"
                        error={!!errors.imageUrl}
                        // helperText={errors.imageUrl ? errors.imageUrl.message : ''}
                        fullWidth
                        margin="normal"
                    />
                )}
            />
            <Controller
                name="imageAlt"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Image Alt Text"
                        error={!!errors.imageAlt}
                        // helperText={errors.imageAlt ? errors.imageAlt.message : ''}
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
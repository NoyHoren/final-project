import React from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { ILogin } from '../../interfaces/interfaces';

// Define the validation schema using Joi
const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    password: Joi.string().required().label('Password'),
});

const Login: React.FC = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<ILogin>({
        resolver: joiResolver(schema),
    });

    const onSubmit = (data: ILogin) => {
        // Handle form submission
        console.log(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    mt: 2,
                    backgroundColor: "#F7B5CA",
                    ':hover': {
                        backgroundColor: '#000',
                        color: '#fff',
                    },
                }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default Login;
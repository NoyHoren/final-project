import React, { useContext } from 'react';
import { Box, Button, TextField, Typography, Grid, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { IUserInput } from '../../interfaces/interfaces';
import { AuthContext, AuthContextType } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{7,20}$/;
const phoneRegex = /^((\+972|0)([23489]|5[02468]|77)-?[1-9]\d{6})$/;

// Define the validation schema using Joi
const addressSchema = Joi.object({
    city: Joi.string().min(2).max(50).required().label('City'),
    country: Joi.string().min(2).max(50).required().label('Country'),
    houseNumber: Joi.number().required().label('House Number'),
    street: Joi.string().min(2).max(50).required().label('Street'),
    zip: Joi.string().min(2).max(10).required().label('ZIP Code'),
    state: Joi.string().min(2).max(50).label('State'),
});

const imageSchema = Joi.object({
    url: Joi.string().uri().required().label('Image URL'),
    alt: Joi.string().min(2).max(50).required().label('Image Alt Text'),
}).optional();

const userSchema = Joi.object({
    isBusiness: Joi.boolean().required().label('Is Business'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    phone: Joi.string().pattern(phoneRegex).required().label('Phone Number'),
    password: Joi.string().pattern(passwordRegex).required().label('Password'),

    address: addressSchema.required(),
    name: Joi.object({
        first: Joi.string().min(2).max(50).required().label('First Name'),
        middle: Joi.string().allow('').min(0).label('Middle Name'),
        last: Joi.string().min(2).max(50).required().label('Last Name'),
    }).required(),

    image: imageSchema,
});

const Signup: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserInput>({
        resolver: joiResolver(userSchema),
    });

    const { handleSignup } = useContext(AuthContext) as AuthContextType;
    const navigate = useNavigate();

    const onSubmit = async (data: IUserInput) => {
        const success = await handleSignup(data);
        if (success) {
            toast.success("user signed up successfully");
            navigate("/login")
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                Signup
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="name.first"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="First Name"
                                error={!!errors.name?.first}
                                helperText={errors.name?.first ? errors.name.first.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="name.middle"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Middle Name"
                                error={!!errors.name?.middle}
                                helperText={errors.name?.middle ? errors.name.middle.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="name.last"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Last Name"
                                error={!!errors.name?.last}
                                helperText={errors.name?.last ? errors.name.last.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Controller
                        name="address.country"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Country"
                                error={!!errors.address?.country}
                                helperText={errors.address?.country ? errors.address.country.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="address.state"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="State"
                                error={!!errors.address?.state}
                                helperText={errors.address?.state ? errors.address.state.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="address.city"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="City"
                                error={!!errors.address?.city}
                                helperText={errors.address?.city ? errors.address.city.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Controller
                        name="address.street"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Street"
                                error={!!errors.address?.street}
                                helperText={errors.address?.street ? errors.address.street.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="address.zip"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="ZIP Code"
                                error={!!errors.address?.zip}
                                helperText={errors.address?.zip ? errors.address.zip.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Controller
                        name="address.houseNumber"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="House Number"
                                error={!!errors.address?.houseNumber}
                                helperText={errors.address?.houseNumber ? errors.address.houseNumber.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="image.url"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Image URL"
                                error={!!errors.image?.url}
                                helperText={errors.image?.url ? errors.image.url.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="image.alt"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Image Alt Text"
                                error={!!errors.image?.alt}
                                helperText={errors.image?.alt ? errors.image.alt.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Phone Number"
                                error={!!errors.phone}
                                helperText={errors.phone ? errors.phone.message : ''}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="isBusiness"
                        control={control}
                        render={({ field }) => (
                            <Box>
                                <FormLabel component="legend">Is Business</FormLabel>
                                <RadioGroup {...field} row>
                                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={false} control={<Radio />} label="No" />
                                </RadioGroup>
                                {errors.isBusiness && (
                                    <Typography variant="body2" color="error">
                                        {errors.isBusiness.message}
                                    </Typography>
                                )}
                            </Box>
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

export default Signup;
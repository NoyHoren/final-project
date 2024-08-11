import React, { useContext, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CardContext, CardContextType } from '../../context/CardContext';
import { toast } from 'react-toastify';

const SingleCard: React.FC = () => {
    const { id } = useParams();
    const { currentCard, getCardById } = useContext(CardContext) as CardContextType;

    useEffect(() => {
        if (id) getCard(id);
    }, [id])

    const getCard = async (id: string) => {
        const success = await getCardById(id)
        // if (success) toast.success("card fetched successfully");
    }

    return (
        <>
            {currentCard ?
                <Card sx={{ maxWidth: '100%', margin: 'auto', borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={currentCard.image.url}
                        alt={currentCard.image.alt}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {currentCard.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {currentCard.subtitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                            {currentCard.description}
                        </Typography>
                        <Box sx={{ marginTop: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Phone: {currentCard.phone}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Email: {currentCard.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Website: <a href={currentCard.web} target="_blank" rel="noopener noreferrer">{currentCard.web}</a>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Address: {`${currentCard.address.street} ${currentCard.address.houseNumber}, ${currentCard.address.city}, ${currentCard.address.state} ${currentCard.address.zip}, ${currentCard.address.country}`}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
                :
                <div>Loading...</div>}
        </>
    );
};

export default SingleCard;
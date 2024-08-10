import React, { useContext, useEffect } from 'react';
import { CardContext, CardContextType } from '../../context/CardContext';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Box,
    CardActions,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

export const MyCard: React.FC = () => {
    const { myCards, getMyCards, deleteCard } = useContext(CardContext) as CardContextType;

    useEffect(() => {
        getMyCards();
    }, []);

    const handleDelete = async (id: string) => {
        const success = await deleteCard(id);
        if (success) {
            toast.success("Card deleted successfully");
        }
    };

    const handleEdit = (id: string) => {
        // Implement the edit functionality here
        console.log(`Edit card with id: ${id}`);
    };

    console.log("myCards", myCards);

    return (
        <Box sx={{ margin: 3 }}>
            <Grid container spacing={2}>
                {myCards && myCards.map(card => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={card._id}>
                        <Card sx={{ maxWidth: 400, margin: 'auto', height: 350, display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={card.image.url}  // Assuming card.image has a url property
                                alt={card.title}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.subtitle}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => handleEdit(card._id)} aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(card._id)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
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
    Button
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { AuthContext, AuthContextType } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Home: React.FC = () => {
    const { getAllCardsHandler, cards, getCardById } = useContext(CardContext) as CardContextType;
    const { user } = useContext(AuthContext) as AuthContextType;
    const navigate = useNavigate();

    useEffect(() => {
        getAllCardsHandler();
    }, []);

    const handleLike = (id: string) => {
        // Implement the like functionality here
    };

    const handleInfo = async (id: string) => {
        // const success = await getCardById(id);
        // if (success) {
        //     toast.success("card fetched successfully");
        // }
        navigate(`/singleCard/${id}`);
    };

    return (
        <div className='home-container'>
            <h1>My Cards</h1>
            <Box sx={{ margin: 3 }}>
                <Grid container spacing={2}>
                    {cards && cards.map(card => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={card._id}>
                            <Card sx={{ maxWidth: 345, marginBottom: 2, height: 400, display: 'flex', flexDirection: 'column' }}>
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
                                </CardContent>
                                {user &&
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleInfo(card._id)}
                                            sx={{
                                                mt: 2,
                                                backgroundColor: "#F7B5CA",
                                                ':hover': {
                                                    backgroundColor: '#ffff00',
                                                    color: '#F7B5CA',
                                                    fontWeight: "bold"
                                                },
                                            }}
                                        >
                                            Read More
                                        </Button>
                                    </CardActions>

                                }
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};
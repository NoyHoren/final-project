import React, { useContext } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, IconButton, Button } from "@mui/material";
import { CardContext, CardContextType } from "../../context/CardContext";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Favorites = () => {
    const { getAllCardsHandler, cards, toggleLike } = useContext(CardContext) as CardContextType;
    const { user } = useContext(AuthContext) as AuthContextType;
    const navigate = useNavigate();

    const handleLike = async (id: string) => {
        await toggleLike(id);
    };

    const handleInfo = async (id: string) => {
        navigate(`/singleCard/${id}`);
    };

    return (
        <Grid container spacing={3} sx={{ width: "80vw", display: "flex", justifyContent: "center" }}>
            {cards && user ? cards.filter((card) => card.likes.includes(user._id)).map((card) => (
                <Grid item key={card._id} xs={12} sm={6} md={4} lg={3} >
                    <Card sx={{ width: 250, height: 350, display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            component="img"
                            image={card.image.url}
                            alt={card.title}
                            sx={{ width: "100%", height: "200px" }}
                        />
                        <CardContent>
                            <Typography variant="h6">{card.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {card.subtitle}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'space-between' }}>
                            <IconButton
                                onClick={() => handleLike(card._id)}
                                color={card.likes.includes(user._id) ? 'error' : 'default'}
                            >
                                <FavoriteIcon />
                            </IconButton>
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
                    </Card>
                </Grid>
            )) :
                <Typography variant="h6" >No Favorites</Typography>
            }
        </Grid>
    );
};

export default Favorites;
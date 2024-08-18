import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: '#F7B5CA',
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 100
            }}
        >
            <Typography variant="body1" sx={{ color: "#fff" }}>
                © 2024 Noy Horen. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
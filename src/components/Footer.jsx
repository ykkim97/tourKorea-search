// src/Footer.js
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
        component="footer"
        sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        }}
        >
        <Container maxWidth="sm">
            <Typography variant="body1" align="center">
            Email | 97ykkim@naver.com
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            <Link color="inherit" href="https://your-website.com/">
                TourKoreaInformation
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
        </Container>
        </Box>
    );
};

export default Footer;

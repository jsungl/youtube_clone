import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header/Header';
// import NavBar from './Header/NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const theme = createTheme();

export default function Layout() {


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <Box component='main' sx={{ width: '100%', mt:"50px", mb:"50px" }}>
                    <Outlet/>
                </Box>
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </ThemeProvider>
    );
}
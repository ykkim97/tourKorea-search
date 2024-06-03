import { useState } from "react";
import axios from "axios";
import RegionCard from "./pages/home/components/RegionCard";
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Nav from "./components/Nav";
import { AppBar, Box, CssBaseline, Divider, ListItemButton, ListItemIcon, Toolbar, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomePage from "./pages/home/HomePage";
import { Route, Routes } from 'react-router-dom';
import DetailPage from "./pages/home/DetailPage";

const menuItems = ['서울', '강원', '전북', '전남', '제주'];
const drawerWidth = 240;

export default function Home ({
    searchRegion,
    setSearchRegion
}) {
    const [drawerClicked, setDrawerClikded] = useState(false);

    const handleMenuClick = async (region) => {
        try {
            const response = await axios.get(`http://localhost:7516/api/search`, {
                params: { region }
            });
            setSearchRegion(response.data);
        } catch (error) {
            console.error('Error fetching region data:', error);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Nav
                        searchRegion={searchRegion}
                        setSearchRegion={setSearchRegion}
                        setDrawerClikded={setDrawerClikded}
                    />
                </ AppBar>
                {drawerClicked ? null : (
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                        }}
                    >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['검색', '지도', '행사', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List>
                    </Box>
                </Drawer>
                )}

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Grid container spacing={2}>
                        {/* 반복되는 Grid 아이템을 렌더링 */}
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <HomePage searchRegion={searchRegion} />
                                } 
                            />

                            <Route 
                                path='/detail/:id' 
                                element={
                                    <DetailPage searchRegion={searchRegion} />
                                } 
                            />
                        </Routes>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

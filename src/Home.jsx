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
import { Route, Routes, useNavigate } from 'react-router-dom';
import DetailPage from "./pages/home/DetailPage";
import Festival from "./pages/Festival/Festival";
import FestivalDetailPage from "./pages/Festival/FestivalDetailPage";

const menuItems = ['서울', '강원', '전북', '전남', '제주'];
const drawerWidth = 240;

export default function Home ({
    totalLength,
    setTotalLength,
}) {
    const naviagate = useNavigate();
    const [drawerClicked, setDrawerClikded] = useState(false);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Nav
                        setDrawerClikded={setDrawerClikded}
                        totalLength={totalLength}
                        setTotalLength={setTotalLength}
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
                        {['여행지', '행사', '지도', '반려동물동반'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                {text === '여행지' ? (
                                    <ListItemText primary={text} onClick={() => naviagate(`/`)} />
                                ) : (
                                    text === '행사' ? (
                                        <ListItemText primary={text} onClick={() => naviagate(`/festival`)} />
                                    ) : (
                                        <ListItemText primary={text} />
                                    )
                                )}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['게시판', '공지사항', '문의'].map((text, index) => (
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
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <HomePage  
                                        totalLength={totalLength} 
                                    />
                                } 
                            />

                            <Route 
                                path='/detail/:id' 
                                element={
                                    <DetailPage />
                                } 
                            />

                            <Route 
                                path='/festival' 
                                element={
                                    <Festival 
                                        totalLength={totalLength} 
                                        // region={region} 
                                    />
                                } 
                            />

                            <Route 
                                path='/festival/detail/:id' 
                                element={
                                    <FestivalDetailPage />
                                } 
                            />
                        </Routes>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

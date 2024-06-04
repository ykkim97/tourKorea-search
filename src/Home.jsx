import { useState } from "react";
import axios from "axios";
import RegionCard from "./pages/home/components/RegionCard";
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Nav from "./components/Nav";
import { AppBar, Box, CssBaseline, Divider, ListItemButton, ListItemIcon, Slide, Toolbar, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomePage from "./pages/home/HomePage";
import { Route, Routes, useNavigate } from 'react-router-dom';
import DetailPage from "./pages/home/DetailPage";
import Festival from "./pages/Festival/Festival";
import FestivalDetailPage from "./pages/Festival/FestivalDetailPage";
import Accommodation from "./pages/Accommodation/Accommodation";

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
                    <Slide direction="right" in={!drawerClicked} mountOnEnter unmountOnExit>
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
                                    {['여행지정보', '행사정보', '숙박정보', '지도'].map((text, index) => (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton>
                                            <ListItemIcon>
                                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                            </ListItemIcon>
                                            {text === '여행지정보' ? (
                                                <ListItemText primary={text} onClick={() => naviagate(`/`)} />
                                            ) : (
                                                text === '행사정보' ? (
                                                    <ListItemText primary={text} onClick={() => naviagate(`/festival`)} />
                                                ) : (
                                                    text === '숙박정보' ? (
                                                        <ListItemText primary={text} onClick={() => naviagate(`/accommodation`)}/>
                                                    ) : (
                                                        <ListItemText primary={text} onClick={() => naviagate(`/`)} />
                                                    )
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
                    </Slide>
                )}

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Grid container spacing={2}>
                        <Routes>
                            <Route 
                                path="/" 
                                element={ <HomePage totalLength={totalLength} /> } 
                            />

                            <Route 
                                path='/detail/:id' 
                                element={ <DetailPage /> } 
                            />

                            <Route 
                                path='/festival' 
                                element={ <Festival totalLength={totalLength} /> } 
                            />

                            <Route 
                                path='/festival/detail/:id' 
                                element={ <FestivalDetailPage /> } 
                            />

                            <Route 
                                path='/accommodation' 
                                element={ <Accommodation totalLength={totalLength} /> } 
                            />

                            <Route 
                                path='/accommodation/detail/:id' 
                                element={ <FestivalDetailPage /> } 
                            />
                        </Routes>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

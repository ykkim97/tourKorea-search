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

const menuItems = ['서울', '강원', '전북', '전남', '제주'];
const drawerWidth = 240;

export default function Home ({
    searchRegion,
    setSearchRegion
}) {
    const handleMenuClick = async (region) => {
        try {
            const response = await axios.get(`http://localhost:7516/search`, {
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
                    />
                </AppBar>
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
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
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
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Grid container spacing={2}>
                        {/* 반복되는 Grid 아이템을 렌더링 */}
                        {searchRegion && searchRegion.map((item) => (
                            <Grid item key={item.contentid} xs={12} sm={6} md={4} lg={3}>
                                <RegionCard item={item} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                </Box>
        </>
    )
}

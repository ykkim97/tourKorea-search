import { useState } from "react";
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
import AccommodationDetailPage from "./pages/Accommodation/components/AccommodationDetailPage";
import AreaSearch from "./pages/AreaSearch/AreaSearch";
import AreaSearchDetailPage from "./pages/AreaSearch/AreaSearchDetailPage";
import MapIcon from '@mui/icons-material/Map';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FestivalIcon from '@mui/icons-material/Festival';
import HotelIcon from '@mui/icons-material/Hotel';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import MyPage from "./pages/MyPage/MyPage";
import UpdateMyInfo from "./pages/MyPage/update/UpdateMyInfo";
import CreateReivew from "./pages/Review/Create/CreateReview";
import MapSearchPage from "./pages/MapSearch/MapSearchPage";

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
                                fontFamily: 'Pretendard-Regular'
                            }}
                        >
                            <Toolbar />
                            <Box sx={{ overflow: 'auto', }}>
                                <List>
                                    {['키워드 검색', '지역별 검색', '행사정보', '숙박정보', '지도'].map((text, index) => (
                                        <ListItem key={text} disablePadding >
                                            <ListItemButton>
                                            <ListItemIcon sx={{ color: "black" }}>
                                                {index === 0 ? <ManageSearchIcon /> : (
                                                    index === 1 ? <QueryStatsIcon /> : (
                                                        index === 2 ? <FestivalIcon /> : (
                                                            index === 3 ? <HotelIcon /> : <MapIcon />
                                                        )
                                                    )
                                                )}
                                            </ListItemIcon>
                                            {text === '키워드 검색' ? (
                                                <ListItemText primary={text} onClick={() => naviagate(`/`)} />
                                            ) : (
                                                text === '지역별 검색' ? (
                                                    <ListItemText primary={text} onClick={() => naviagate(`/areaBasedSearch`)} />
                                                ) : (
                                                    text === '행사정보' ? (
                                                        <ListItemText primary={text} onClick={() => naviagate(`/festival`)}/>
                                                    ) : (
                                                        text === '숙박정보' ? (
                                                            <ListItemText primary={text} onClick={() => naviagate(`/accommodation`)} />
                                                        ) : (
                                                            text === '지도' ? (
                                                                <ListItemText primary={text} onClick={() => naviagate(`/mapSearch`)} />
                                                            ) : <ListItemText primary={text} onClick={() => naviagate(`/`)} />
                                                        )
                                                    )
                                                )
                                            )}
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider />
                                <List>
                                    {['QnA', '공지사항', '문의'].map((text, index) => (
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

                <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 3 }}>
                    <Toolbar />
                    <Grid container spacing={2}>
                        <Routes>
                            <Route 
                                path="/login" 
                                element={ <LoginPage /> } 
                            />

                            <Route 
                                path="/signup" 
                                element={ <SignUpPage /> } 
                            />

                            <Route 
                                path="/mypage" 
                                element={ <MyPage /> } 
                            />

                            <Route 
                                path="/mypage/updateMyInfo" 
                                element={ <UpdateMyInfo /> } 
                            />
                            
                            <Route 
                                path="/" 
                                element={ <HomePage totalLength={totalLength} /> } 
                            />

                            <Route 
                                path='/detail/:id' 
                                element={ <DetailPage /> } 
                            />

                            <Route 
                                path="/areaBasedSearch" 
                                element={ <AreaSearch totalLength={totalLength} /> } 
                            />

                            <Route 
                                path='/areaBasedSearch/detail/:id' 
                                element={ <AreaSearchDetailPage /> } 
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
                                element={ <AccommodationDetailPage /> } 
                            />

                            <Route 
                                path='/mapSearch' 
                                element={ <MapSearchPage /> } 
                            />
                        </Routes>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Select, FormControl, InputLabel, Button, Tooltip } from '@mui/material';
import { useState,useEffect } from 'react';
import axios from 'axios';
import useSearch from '../store/search/useSearch';
import { useNavigate } from 'react-router-dom';
import useAreaCode from '../store/areaCode/useAreaCode';
import useAreaSearch from '../store/areaSearch/ussAreaSearch';
import useLoginUser from '../store/Login/useLoginUser';
import { getCookie, deleteCookie } from '../utils/cookie';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const regionArray = ['서울','대전','대구','부산','울산','제주','강원','전북','전남','경남','경북','세종'];

export default function Nav({
  setDrawerClikded,
  totalLength,
  setTotalLength,
}) {
  const { searchRegion, setSearchRegion, region, setRegion } = useSearch();
  const { searchAreaBasedData, setSearchAreaBasedData, areaValue, setAreaValue } = useAreaSearch();
  const { areaCodeData, fetchAreaCode } = useAreaCode();
  const { userData, setUserData, userToken, setUserToken } = useLoginUser();

  useEffect(() => {
    fetchAreaCode();
  }, [])

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };
  
  const hamburgerBtnClick = () => {
    setDrawerClikded(prev => !prev)
  }

  const handleHomeNavigation = () => {
    navigate('/');
  }

  const handleAreaValue = (value) => {
    setAreaValue(value);
    navigate('/areaBasedSearch');
  }

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/users/logout`, {
      headers: {
        'x_auth': getCookie('x_auth')
      }
    })
    .then(response => {
      console.log('[Logout Success]:', response.data);
      setUserData(null);
      setUserToken('');
      deleteCookie('x_auth');
    })
    .catch(error => {
      console.error('[Logout Error] :', error);
    });
  };

  const handleLinkMyPage = () => {
    navigate('/mypage');
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    const fetchTourData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/search`, {
        params : { keyword : region }
      });

      setSearchRegion(response.data.result);
      setTotalLength(response.data.totalCount);
    }
    fetchTourData();
  }, [region])

  useEffect(() => {
    const fetchAreaBasedData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/areaBasedSearch`, {
        params : { areaCode : areaValue }
      });

      setSearchAreaBasedData(response.data.result);
      setTotalLength(response.data.totalCount);
    }
    fetchAreaBasedData();
  }, [areaValue])

  useEffect(() => {
    const token = getCookie('x_auth');
    console.log(token, "-authtk");
    setUserToken(token);
    if (token) {
      axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/users/auth`, {
        headers: {
          'x_auth': token,
        },
      })
      .then(response => {
        console.log('인증 확인:', response.data);
        setUserData(response.data);
      })
      .catch(error => {
        console.error('인증 오류:', error);
        setUserData(null);
      });
    } else {
      setUserData(null);
    }
  }, [userToken]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={hamburgerBtnClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
            onClick={handleHomeNavigation}
          >
            TripStory
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="검색"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setRegion(e.target.value)}
            />
          </Search>
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="region-select-label" color='success' sx={{ color : "#fff" }}>지역 선택</InputLabel>
            <Select
              labelId="region-select-label"
              id="region-select"
              value={region}
              onChange={handleRegionChange}
              label="지역 선택"
              color='success'
              sx={{ color : "#fff" }}
            >
              {
                areaCodeData && areaCodeData.result?.map((item) => (
                  <MenuItem 
                    value={item.code} 
                    key={item.code}
                    onClick={() => handleAreaValue(Number(item.code))}
                  >
                    {item.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            {!userData ? (
              <Button variant='contained' color='primary' onClick={handleLogin}>로그인</Button>
            ) : (
              <Box sx={{ display:"flex", alignItems: "center" }}>
                <Tooltip title="내 정보">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    // onClick={handleProfileMenuOpen}
                    onClick={handleLinkMyPage}
                    color="warning"
                    sx={{ marginRight:"5px" }}
                  >
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
                <Box sx={{ display: "flex",flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                  <Typography sx={{ marginRight: "10px" }}>{userData?.userName}님 </Typography>
                  <Typography sx={{ marginRight: "10px", color: "yellow", fontSize:"13px" }}>{userData?.userNickname}</Typography>
                </Box>
                <Button variant='contained' color='info' onClick={handleLogout}>로그아웃</Button>
              </Box>
            )}

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

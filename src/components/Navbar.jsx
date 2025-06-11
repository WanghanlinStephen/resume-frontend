import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ translations, isAuthenticated, setIsAuthenticated }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    navigate('/');
    handleClose();
  };

  const navItems = [
    { label: '开始使用', path: '/editor' },
    { label: '使用指南', path: '/user-guide' },
    { label: '成功案例', path: '/success-stories' },
  ];

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'rgba(2, 8, 22, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 107, 53, 0.3)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              color: '#FF6B35',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: '#FF6B35',
              }
            }}
          >
            校招王中王
          </Typography>

          {/* Mobile Menu */}
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ color: '#FF6B35' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    backgroundColor: 'rgba(2, 8, 22, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 107, 53, 0.3)',
                  }
                }}
              >
                {navItems.map((item) => (
                  <MenuItem 
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    onClick={handleClose}
                    sx={{
                      color: activePath === item.path ? '#FF6B35' : 'rgba(255, 255, 255, 0.9)',
                      backgroundColor: activePath === item.path ? 'rgba(255, 107, 53, 0.1)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      }
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            /* Desktop Navigation */
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  variant={activePath === item.path ? "contained" : "text"}
                  sx={activePath === item.path ? {
                    backgroundColor: '#FF6B35',
                    color: '#020816',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 53, 0.8)',
                    }
                  } : {
                    color: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': {
                      color: '#FF6B35',
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Auth Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleMenu}
                  sx={{
                    color: '#FF6B35',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    }
                  }}
                >
                  <Avatar sx={{ bgcolor: '#FF6B35', color: '#020816' }}>
                    {localStorage.getItem('username')?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      backgroundColor: 'rgba(2, 8, 22, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 107, 53, 0.3)',
                    }
                  }}
                >
                  <MenuItem 
                    component={RouterLink} 
                    to="/profile"
                    onClick={handleClose}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      }
                    }}
                  >
                    修改个人信息
                  </MenuItem>
                  <MenuItem 
                    component={RouterLink} 
                    to="/vip"
                    onClick={handleClose}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      }
                    }}
                  >
                    充值VIP
                  </MenuItem>
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      }
                    }}
                  >
                    退出登录
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {/* 登录注册按钮已隐藏 */}
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 
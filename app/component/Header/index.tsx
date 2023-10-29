'use client';
import { useState, useEffect, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation'
import { useSession } from '../SessionProvider';

const protectedPages = [{
  name: 'Chat',
  route: '/chat'
}
];
const authPages = [{
  name: 'Login',
  route: '/login'
},
{
  name: 'Signup',
  route: '/signup'
}
];

function ResponsiveAppBar() {

  const session: any = useSession();


  const router = useRouter()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [userInfo, setUserInfo] = useState<any>(null);


  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickMenu = (route: string) => {
    router.push(route);
  }

  const handleLogout = () => {
    handleCloseUserMenu()
    localStorage.removeItem('token');
    window.location.reload();
  }

  useEffect(() => {
    if (session) {
      setUserInfo(session)
    }
  }, [session]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>


          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {userInfo ?
              <>
                {protectedPages.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => handleClickMenu(item.route)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {item.name}
                  </Button>
                ))}
              </> :
              <>
                {authPages.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => handleClickMenu(item.route)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {item.name}
                  </Button>
                ))}
              </>
            }

          </Box>

          {userInfo &&
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={`${userInfo.firstName} ${userInfo.lastName}`} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => handleClickMenu('/')}>
                  <Typography textAlign="center">{'Dashboard'}</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>
                  <Typography textAlign="center">{'Logout'}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          }

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
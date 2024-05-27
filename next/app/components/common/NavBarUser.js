import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // 引入 useRouter
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
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AutoCompleteUser from './AutoCompleteUser';
import { UserLogic } from '../../../src/logic/UserLogic';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ThemeSelect from "./ThemeSelect";

const drawerWidth = 240;

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

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
    const [loggedInUsername, setLoggedInUsername] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const router = useRouter(); // 使用 useRouter
    const userLogic = new UserLogic();

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const fetchedUsername = await userLogic.fetchUsername();
                setLoggedInUsername(fetchedUsername);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        fetchUsername();
    }, []);

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

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsDrawerOpen(open);
    };

    const handleLogin = async () => {
        try {
            await userLogic.signIn(username, password);
            setLoggedInUsername(username);
            setUsername('');
            setPassword('');
            setIsLoginDialogOpen(false);
            setSnackbarSeverity('success');
            setSnackbarMessage('登录成功');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Login failed:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage('登录失败，请检查用户名和密码');
            setSnackbarOpen(true);
        }
    };

    const handleRegister = async () => {
        try {
            await userLogic.signUp(username, password);
            setLoggedInUsername(username);
            setUsername('');
            setPassword('');
            setIsRegisterDialogOpen(false);
            setSnackbarSeverity('success');
            setSnackbarMessage('注册成功');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Registration failed:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage('注册失败，请重试');
            setSnackbarOpen(true);
        }
    };

    const handleLogout = async () => {
        try {
            // 清除浏览器token
            localStorage.removeItem('token');
            setLoggedInUsername(null);
            setSnackbarSeverity('success');
            setSnackbarMessage('成功退出');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Logout failed:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage('退出失败');
            setSnackbarOpen(true);
        }
    };

    const closeSnackbar = () => {
        setSnackbarOpen(false);
    };

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
            {loggedInUsername ? (
                <>
                    <MenuItem>
                        <Typography>{loggedInUsername}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>退出</MenuItem>
                </>
            ) : (
                <>
                    <MenuItem onClick={() => setIsLoginDialogOpen(true)}>登录</MenuItem>
                    <MenuItem onClick={() => setIsRegisterDialogOpen(true)}>注册</MenuItem>
                </>
            )}
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
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
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
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon/>
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
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton*/}
                    {/*    size="large"*/}
                    {/*    edge="start"*/}
                    {/*    color="inherit"*/}
                    {/*    aria-label="open drawer"*/}
                    {/*    onClick={toggleDrawer(true)}*/}
                    {/*>*/}
                    {/*    <MenuIcon/>*/}
                    {/*</IconButton>*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        哐哐背单词
                    </Typography>
                    <Box sx={{width: 50}}/>
                    <AutoCompleteUser/>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </Box>
                    <Box sx={{m: 2}}>
                        <ThemeSelect/>
                    </Box>
                </Toolbar>
            </AppBar>
            {/*<Drawer*/}
            {/*    anchor="left"*/}
            {/*    open={isDrawerOpen}*/}
            {/*    onClose={toggleDrawer(false)}*/}
            {/*>*/}
            {/*    <List>*/}
            {/*        <ListItem button key={'主页'} onClick={() => handleNavigation('/')}>*/}
            {/*            <ListItemText primary={'主页'}/>*/}
            {/*        </ListItem>*/}
            {/*        <ListItem button key={'用户单词管理'} onClick={() => handleNavigation('/user/modify-your-words')}>*/}
            {/*            <ListItemText primary={'单词管理'}/>*/}
            {/*        </ListItem>*/}
            {/*        <ListItem button key={'数据分析'} onClick={() => handleNavigation('/user/data-analysis')}>*/}
            {/*            <ListItemText primary={'数据分析'}/>*/}
            {/*        </ListItem>*/}
            {/*    </List>*/}
            {/*</Drawer>*/}
            {renderMobileMenu}
            {renderMenu}
            {/* Login Dialog */}
            <Dialog open={isLoginDialogOpen} onClose={() => setIsLoginDialogOpen(false)}>
                <DialogTitle>登录</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="用户名"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="密码"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsLoginDialogOpen(false)}>取消</Button>
                    <Button onClick={handleLogin}>登录</Button>
                </DialogActions>
            </Dialog>

            {/* Register Dialog */}
            <Dialog open={isRegisterDialogOpen} onClose={() => setIsRegisterDialogOpen(false)}>
                <DialogTitle>注册</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="用户名"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="密码"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsRegisterDialogOpen(false)}>取消</Button>
                    <Button onClick={handleRegister}>注册</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={closeSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={closeSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
}
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import { TbLogout2 } from "react-icons/tb";

import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/auth/useAuth";
import { Skeleton } from "@nextui-org/react";
import UserDropdown from "../../../components/UserDropdown";

const drawerWidth = 300;

function Layout({ children, sidebarLinks }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const { useUser, useLogout } = useAuth({ gardName: "admin" });

    const { isPending, user, isAuthenticated } = useUser();

    const { logout, isPending: isLoggedOut } = useLogout();

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <>
            <div className="flex flex-col items-center h-full gap-10 py-6 bg-blue-color-primary">
                <div className="flex flex-col items-center w-full h-full gap-10 py-6 bg-blue-color-primary">
                    <Link to="/">
                        <Logo logo="/images/logo/logoWhite.svg" width="120" />
                    </Link>

                    <List className="w-full">
                        {isPending ? (
                            <div className="flex flex-col items-center w-full gap-10">
                                <Skeleton className="w-[80%] h-4 bg-gray-500 rounded-lg" />
                                <Skeleton className="w-[80%] h-4 bg-gray-500 rounded-lg" />
                                <Skeleton className="w-[80%] h-4 bg-gray-500 rounded-lg" />
                                <Skeleton className="w-[80%] h-4 bg-gray-500 rounded-lg" />
                            </div>
                        ) : (
                            sidebarLinks?.map((item, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        "&.MuiListItem-root": {
                                            justifyContent: "center",
                                            transition: "all 2s",
                                        },
                                    }}
                                >
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `flex items-center py-3 w-11/12 gap-x-2 pl-6 text-white
                                ${
                                    isActive &&
                                    `font-bold bg-blue-color-light rounded-md`
                                }`
                                        }
                                    >
                                        <span className="duration-300">
                                            {item.icon}
                                        </span>
                                        <p className="capitalize text-md ">
                                            {item.name}
                                        </p>
                                    </NavLink>
                                </ListItem>
                            ))
                        )}
                    </List>
                </div>
                {isPending ? (
                    <div className="max-w-[250px] w-full flex justify-center items-center gap-3">
                        <div>
                            <Skeleton className="flex w-12 h-12 bg-gray-500 rounded-full" />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <Skeleton className="w-3/5 h-3 bg-gray-500 rounded-lg" />
                            <Skeleton className="w-4/5 h-3 bg-gray-500 rounded-lg" />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between w-11/12 px-8 py-2 text-white rounded-lg ">
                        {/* <NavLink
                            to={"/admin/profile"}
                            className={({ isActive }) =>
                                `text-3xl p-2 ${
                                    isActive &&
                                    `font-bold  rounded-md text-white`
                                }`
                            }
                            size="sm"
                            color="white"
                        >
                            <User
                                className="font-bold"
                                name={user?.attributes?.name}
                                description={user?.attributes?.email}
                                avatarProps={{
                                    src:
                                        user?.attributes?.image === null
                                            ? "/images/userPlaceholder.png"
                                            : `${STORAGE_LINK}/${user?.attributes?.image}`,
                                }}
                            /> 
                        </NavLink>*/}
                        <button className="flex items-center justify-center gap-4 font-bold text-[#EE4E4E]">
                            <TbLogout2
                                className="text-lg"
                                onClick={() =>
                                    !isLoggedOut &&
                                    logout({ gardName: "admin" })
                                }
                            />
                            Logout Account
                        </button>
                    </div>
                )}
            </div>
        </>
    );

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "#fff",
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    borderLeft: 0,
                    boxShadow: "none",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { md: "none" },
                            color: "#4E74F9",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <div className="flex justify-end w-full py-3 ">
                        {isAuthenticated && !isPending && (
                            <UserDropdown
                                admin={true}
                                user={user}
                                gardName={"admin"}
                            />
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ flexShrink: { xs: 1 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    p: "20px",
                    marginTop: "80px",
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    minHeight: `calc(100dvh - 80px)`,
                }}
                bgcolor="rgba(242, 242, 242, 0.908)"
            >
                <div className="w-full">{children}</div>
            </Box>
        </Box>
    );
}

export default Layout;

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

import UserDropdown from "@/components/UserDropdown";
import Logo from "@/components/Logo";

import { useUser } from "@/features/client/auth/hooks/useUser";

const drawerWidth = 260;

function Layout({ children, sidebarLinks }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { isAuthenticated, isPending } = useUser();

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
    <div className="flex flex-col items-center gap-10 py-6 ">
      <Link to="/">
        <Logo width="100" />
      </Link>

      <List className="w-full">
        {sidebarLinks?.map((item, index) => (
          <ListItem key={index} disablePadding>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center py-4 duration-200 w-full gap-x-2 pl-6 text-blue-color-light
                                ${isActive && ` font-bold bg-yellow-color-light border-r-5 border-blue-color-primary`}`
              }
            >
              <span className={`duration-300 text-3xl`}>{item.icon}</span>
              {<p className="capitalize text-md">{item.name}</p>}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
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
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: "none" }, color: "#4E74F9" }}>
            <MenuIcon />
          </IconButton>
          <div className="flex justify-end w-full py-3 ">{isAuthenticated && !isPending && <UserDropdown admin={true} />}</div>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ flexShrink: { xs: 1 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 4, marginTop: "80px", width: { md: `calc(100% - ${drawerWidth}px)` }, minHeight: `calc(100dvh - 80px)` }} bgcolor="rgb(243, 244, 246)">
        <div className="w-full">{children}</div>
      </Box>
    </Box>
  );
}

export default Layout;

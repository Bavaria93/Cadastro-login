import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const VerticalMenu = ({ menuAberto, drawerWidthExpanded, drawerWidthCollapsed }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      sx={{
        "& .MuiDrawer-paper": {
          width: menuAberto ? drawerWidthExpanded : drawerWidthCollapsed,
          transition: "width 0.3s",
          overflowX: "hidden",
          backgroundColor: "#2C3E50",
          ...(!menuAberto && {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
          }),
        },
      }}
    >
      <List>
        <ListItem button>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/usuarios" style={{ textDecoration: "none", color: "white" }}>
            <ListItemText primary="Lista de Usuários" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/cadastro" style={{ textDecoration: "none", color: "white" }}>
            <ListItemText primary="Cadastro de Usuário" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <ListItemText primary="Logar" />
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default VerticalMenu;

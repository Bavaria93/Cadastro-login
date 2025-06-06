import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { usePermission } from "../hooks/usePermission";

const VerticalMenu = ({ menuAberto, drawerWidthExpanded, drawerWidthCollapsed }) => {
  // Verifica as permissões necessárias para exibir cada item.
  const canViewUsers = usePermission("LIST_USERS");
  const canViewProfiles = usePermission("VIEW_PROFILES");
  const canViewPermissions = usePermission("VIEW_PERMISSIONS");
  const canViewCourses = usePermission("VIEW_COURSES");
  const canViewRequests = usePermission("VIEW_REQUESTS");

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

        {canViewUsers && (
          <ListItem button>
            <Link to="/usuarios" style={{ textDecoration: "none", color: "white" }}>
              <ListItemText primary="Lista de Usuários" />
            </Link>
          </ListItem>
        )}

        {canViewProfiles && (
          <ListItem button>
            <Link to="/perfis" style={{ textDecoration: "none", color: "white" }}>
              <ListItemText primary="Lista de Perfis" />
            </Link>
          </ListItem>
        )}

        {canViewPermissions && (
          <ListItem button>
            <Link to="/permissoes" style={{ textDecoration: "none", color: "white" }}>
              <ListItemText primary="Lista de Permissões" />
            </Link>
          </ListItem>
        )}

        {canViewCourses && (
          <ListItem button>
            <Link to="/cursos" style={{ textDecoration: "none", color: "white" }}>
              <ListItemText primary="Lista de Cursos" />
            </Link>
          </ListItem>
        )}

        {canViewRequests && (
          <ListItem button>
            <Link to="/solicitacoes" style={{ textDecoration: "none", color: "white" }}>
              <ListItemText primary="Lista de Solicitações" />
            </Link>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default VerticalMenu;

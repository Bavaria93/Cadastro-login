// src/components/VerticalMenu/MenuItem.js
import React from 'react';
import { ListItem, ListItemText, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { usePermission } from '../../hooks/usePermission';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.white,
  '&.active > .MuiListItem-root': {
    backgroundColor: theme.palette.action.selected
  }
}));

export function MenuItem({ label, path, permission }) {
  // Chama o hook SEMPRE, mesmo que permission seja null/undefined
  const hasPermission = usePermission(permission);

  // Se não há chave de permissão, exibe sempre; caso contrário, só se tiver permissão
  const canView = permission ? hasPermission : true;
  if (!canView) return null;

  return (
    <StyledNavLink to={path} end>
      <ListItem button>
        <ListItemText primary={label} />
      </ListItem>
    </StyledNavLink>
  );
}

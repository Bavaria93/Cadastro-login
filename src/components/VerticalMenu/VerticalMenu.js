import React from 'react';
import { menuItems } from '../../config/menuConfig';
import { MenuItem } from './MenuItem';
import {
  MenuContainer,
  MenuList
} from './VerticalMenu.styles';

export default function VerticalMenu({
  menuAberto,
  drawerWidthExpanded,
  drawerWidthCollapsed
}) {
  return (
    <MenuContainer
      menuAberto={menuAberto}
      drawerWidthExpanded={drawerWidthExpanded}
      drawerWidthCollapsed={drawerWidthCollapsed}
    >
      <MenuList disablePadding>
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            label={item.label}
            path={item.path}
            permission={item.permission}
          />
        ))}
      </MenuList>
    </MenuContainer>
  );
}

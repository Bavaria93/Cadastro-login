import React from 'react';
import { menuItems } from '../../config/menuConfig';  // Lista de itens de menu a partir da configuração
import { MenuItem } from './MenuItem';                  // Componente que renderiza cada item do menu
import { MenuContainer, MenuList } from './VerticalMenu.styles';  // Componentes estilizados

// Componente VerticalMenu recebe props para controlar estado e largura
export default function VerticalMenu({
  menuAberto,                // Booleano que indica se o menu está aberto
  drawerWidthExpanded,       // Largura quando o menu está expandido
  drawerWidthCollapsed       // Largura quando o menu está colapsado
}) {
  return (
    // MenuContainer é o wrapper principal, ajusta largura e estilo
    <MenuContainer
      menuAberto={menuAberto}
      drawerWidthExpanded={drawerWidthExpanded}
      drawerWidthCollapsed={drawerWidthCollapsed}
    >
      {/* MenuList é a lista sem padding padrão */}
      <MenuList disablePadding>
        {/* Percorre cada configuração de item e renderiza MenuItem */}
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}          // Chave única para cada item
            label={item.label}       // Texto exibido
            path={item.path}         // Rota associada ao item
            permission={item.permission}  // Permissão necessária para exibir
          />
        ))}
      </MenuList>
    </MenuContainer>
  );
}

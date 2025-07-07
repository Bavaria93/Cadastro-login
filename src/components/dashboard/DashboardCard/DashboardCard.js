import React from "react";
import {
  StyledGrid,
  StyledCard,
  StyledCardContent,
  TitleText,
  ValueText
} from "./DashboardCard.styles";

// Componente que renderiza um único card de dashboard
const DashboardCard = ({ title, value }) => (
  <StyledGrid item xs={12} sm={6} md={3}>
    {/* Card com elevação leve */}
    <StyledCard elevation={1}>
      {/* Área de conteúdo do card */}
      <StyledCardContent>
        {/* Título do cartão */}
        <TitleText>
          {title}
        </TitleText>
        {/* Valor principal do cartão */}
        <ValueText>
          {value}
        </ValueText>
      </StyledCardContent>
    </StyledCard>
  </StyledGrid>
);

// React.memo evita re-renderes desnecessários se props não mudarem
export default React.memo(DashboardCard);

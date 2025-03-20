// MenuVertical.js
import React from "react";
import "./MenuVertical.css";

function MenuVertical() {
  return (
    <div className="menu-container">
      <nav className="menu">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default MenuVertical;

import React from 'react';
import { FaUser } from 'react-icons/fa';

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">facebook</div>
        <div className="profile">
          Meu Perfil
          <FaUser />
        </div>

      </nav>
    </header>
  );
}

export default Header;

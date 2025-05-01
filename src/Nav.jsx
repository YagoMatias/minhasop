import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="flex justify-center bg-gray-400 w-full min-h-12 max-h-12 items-center">
      <NavLink
        className="flex justify-center hover:bg-gray-200 min-h-12 items-center w-full focus:bg-gray-200"
        to="/"
      >
        <p>Home</p>
      </NavLink>
      <NavLink
        className="flex justify-center hover:bg-gray-200 min-h-12 items-center w-full focus:bg-gray-200"
        to="faturamento"
      >
        <p>Ranking Faturamento</p>
      </NavLink>
      <NavLink
        className="flex justify-center hover:bg-gray-200 min-h-12 items-center w-full focus:bg-gray-200"
        to="estoque"
      >
        <p>Desempenho de Vendedores</p>
      </NavLink>
      <a
        className="flex justify-center hover:bg-gray-200 min-h-12 items-center w-full focus:bg-gray-200"
        href="https://cursos.universidadecrosby.com/"
        target="blank"
      >
        <p>Universidade Crosby</p>
      </a>
      <a
        className="flex justify-center hover:bg-gray-200 min-h-12 items-center w-full focus:bg-gray-200"
        href="https://wa.me/558491716495"
        target="blank"
      >
        <p>Suporte Crosby</p>
      </a>
    </nav>
  );
};

export default Nav;

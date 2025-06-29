import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Referência para o dropdown
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fechar dropdown se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Fecha o dropdown se clicar fora
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Adiciona o evento de clique fora
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Remove o evento quando o componente for desmontado
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Botão de Menu para Dispositivos Móveis */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu */}
        <div
          className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/home"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                aria-current="page"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faturamento"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => setIsOpen(false)}
              >
                Rank Lojas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vendedores"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                onClick={() => setIsOpen(false)}
              >
                Rank Vendedores
              </NavLink>
            </li>
            {/* Dropdown: Posição de Estoque */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Estoque
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                  <ul className="space-y-2 py-2">
                    <li>
                      <NavLink
                        to="/posestoque"
                        className="block text-gray-700 dark:text-white px-4 py-2 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Posição de Estoque
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/curvaabc"
                        className="block text-gray-700 dark:text-white px-4 py-2 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Curva ABC de Vendas
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/estoque-completo"
                        className="block text-gray-700 dark:text-white px-4 py-2 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Estoque Completo
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <a
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                target="blank"
                onClick={() => setIsOpen(false)}
                href="https://cursos.universidadecrosby.com/"
              >
                Universidade Crosby
              </a>
            </li>
            <li>
              <a
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                target="blank"
                onClick={() => setIsOpen(false)}
                href="https://b2b.crosbyoficial.com.br/b2b/galeria"
              >
                Loja Virtual
              </a>
            </li>
            <li>
              <a
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                target="blank"
                onClick={() => setIsOpen(false)}
                href="https://wa.me/558491716495"
              >
                Canal Crosby
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

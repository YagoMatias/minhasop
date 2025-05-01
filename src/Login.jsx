import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <Link to="home">
        <button className="flex items-center justify-center w-60 h-16 border-2 mt-60">
          LOGAS
        </button>
      </Link>
    </div>
  );
};

export default Login;

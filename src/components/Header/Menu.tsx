import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className='hidden md:flex items-center space-x-1'>
      <Link
        to='/1'
        className='py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold '
      >
        Home
      </Link>
    </div>
  );
}

export default Menu;

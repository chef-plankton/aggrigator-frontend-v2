import React, { FC } from "react";

const Logo:FC<{logoPic: string}> = (props) => {
  return (
      <img src={props.logoPic} alt="Logo" className="h-[40px] mr-2" />
  );
}

export default Logo;

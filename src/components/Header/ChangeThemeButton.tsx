import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { changeTheme } from "../../features/theme/themeSlice";
import lightModeIcon from "../../assets/img/theme/mode.png";
import darkModeIcon from "../../assets/img/theme/night.png";

function ChangeThemeButton() {
  const dispatch = useDispatch();
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <button
      onClick={() => {
        themeMode === "light"
          ? dispatch(changeTheme("dark"))
          : dispatch(changeTheme("light"));
      }}
      className="py-2 px-2"
    >
      {themeMode === "light" ? (
        <img width="32px" src={darkModeIcon} alt="" />
      ) : (
        <img width="32px" src={lightModeIcon} alt="" />
      )}
    </button>
  );
}

export default ChangeThemeButton;

import React from "react";
import { styles } from "../../utils/styles";
import {useAppContext} from "../../utils/context";
// import logoImage from "../../assets/TskManagerLogoRemovebg.png";

export const Menu: React.FC = () => {
  const { state, dispatch } =  useAppContext();

  return (
    <div className="flex justify-around bg-black text-white items-center w-full py-2 px-4 md:px-10 md:mb-8 lg:px-20  rounded-none border-b-2 border-gray-950  top-0 right-0 left-0 shadow">
      {/* <div className="flex items-start">
        <img className="w-20 h-15 mx-4 md:mx-8" src={logoImage} alt="logo" />
      </div> */}
      <div className="flex items-center">
        <div className="flex justify-center items-center">
          <div
            className={`${styles.menu}`}
            onClick={() => {
              dispatch({ type: "SET_VIEW", param: "home" });
            }}
          >
            Home
          </div>
          <div
            className={`${styles.menu} `}
            onClick={() => dispatch({ type: "SET_VIEW", param: "persons" })}
          >
            Persons
          </div>
          <div
            className={`${styles.menu} `}
            onClick={() => dispatch({ type: "SET_VIEW", param: "groups" })}
          >
            Groups
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useReducer } from "react";
import { pages } from "./components/General/pages";
import {Context} from "./utils/context";
import { initState, reducer } from "./utils/reducer";
import { Menu } from "./components/General/menu";
function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  ///
  return (
    <Context.Provider value={{ state, dispatch }}>
      <Menu/>
      <div className="bg-red-900 h-max ">
      {pages[state.view] }
      </div>
    </Context.Provider>
  );
}

export default App;


import { createContext, useContext } from "react";
import { StateType, DispatchType } from "../components/General/intefaces";
import { reducer } from "./reducer";

export const Context = createContext<{
  state: StateType;
  dispatch: DispatchType;
} | undefined>(undefined);

export const PeopleContextProvider = () => {
  // [state, dispatch] = useReducer(reducer, )
}

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
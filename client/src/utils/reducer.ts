import { Action ,StateType} from "../components/General/intefaces";

export const initState: StateType  = {
  view: "home",
  groups:null,
  peoples:null,
};

export const reducer = (state= initState, action:Action) => {
  switch (action.type) {
    case "SET_VIEW": {
      if (action.param !== "home") {
        return {
          ...state,
          view: action.param,
        };
      } else {
        return {
          ...state,
          view: action.param,
         
        };
      }
    }
    case "SET_PEOPLES":
      return {
        ...state,
        peoples: action.param,
      };
      case "SET_GROUPS":
        return {
          ...state,
          groups: action.param,
        };
    default: {
      return state;
    }
  }
};

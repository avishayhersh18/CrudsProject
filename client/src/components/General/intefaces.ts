export interface Action {
    type: string;
    param: any; // Adjust the type of 'param' based on your actual actions
  }
  export type DispatchType = (action: Action) => void;
  // Define the type for the state
  export interface StateType {
    view: string,

    groups:GroupInterface[]|null,
    peoples:PeopleInterface[]|null,
  }


  export interface AppContextValue {
    state: StateType;
    dispatch: DispatchType;
  }

  export interface PeopleInterface {
    age: number;
    belongs_to:GroupInterface[];
    gender:string;
    name: string;
    _id:string;
  }

  export interface PeopleInterfaceGroup{
    fathergroupid:string;
    age: number;
    belongs_to:GroupInterface[];
    gender:string;
    name: string;
    _id:string;
  }
  export interface GroupInterface {
    have_father:boolean;
    groups:GroupInterface[];
    peoples:PeopleInterface[];
    name: string;
    _id:string;
  }

  export interface GroupInterfaceForPerson{
    personid:string;
    have_father:boolean;
    groups:GroupInterface[];
    peoples:PeopleInterface[];
    name: string;
    _id:string;
  }
  export interface GroupInterfaceForGroup{
    fathergroupid:string;
    have_father:boolean;
    groups:GroupInterface[];
    peoples:PeopleInterface[];
    name: string;
    _id:string;
  }

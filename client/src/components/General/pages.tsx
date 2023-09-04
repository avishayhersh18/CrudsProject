// import NewCatergory from "../Tasks/NewCategory.jsx";
 import HomePage from "../home";
 import Peoples from "../People/tablepeoples";
 import GroupTable from "../Group/tableGroup"


export const pages: Record<string, JSX.Element> = {
   home: < HomePage/>,
   persons: <Peoples />,
   groups:<GroupTable/>
};

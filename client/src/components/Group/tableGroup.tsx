import React, { useEffect, useState } from "react";
import "../design.css"
import { PeopleInterface, GroupInterface, GroupInterfaceForPerson } from "../General/intefaces"
import axios from "axios";
import { useAppContext } from "../../utils/context";
import Group from "./rowgroup";
import AddGroup from "./addGroup";

const GroupsTable: React.FC = ({}) => {
    const { state, dispatch } = useAppContext();
    const[hierarchyContent,sethierarchyContent]=useState('')
    const[showhierarchy,setShowhierarchy]=useState(false)
    const[showCreateGroupForm,setshowCreateGroupForm]=useState(false)
    return (
         <div >
    <table className="table-fixed w-full border border-white">
      <thead>
        <tr>
          <th className="w-1/6">Group Name</th>
          <th className="w-1/6">Peoples</th>
          <th className="w-1/6">Groups</th>
          <th className="w-1/6">Options</th>
          <th className="w-1/6">Add Options</th>
        </tr>
      </thead>
      <tbody className="bg-red-300">
        {state.groups?.map((group, index) => (
        <Group  _id={group._id} name={group.name} groups={group.groups} peoples={group.peoples} have_father={group.have_father} setShowhierarchy={setShowhierarchy} sethierarchyContent={sethierarchyContent} />
        ))}
        </tbody>
      </table>
      <div>
        {showCreateGroupForm?<AddGroup setshowCreateGroupForm={setshowCreateGroupForm} />:<button  className="mr-3 bg-green-500" onClick={()=>setshowCreateGroupForm(true)}>create group</button>}
      </div>
      {showhierarchy&&
      <div>
            {hierarchyContent}
   
             
      
            {/* Cancel Button */}
            <button className="border" onClick={() =>setShowhierarchy(false)}>
              Cancel
            </button>
          </div>
}
    </div>
    );
};

export default GroupsTable;

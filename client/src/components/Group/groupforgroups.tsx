
import React from "react";
import "../design.css"
import {GroupInterface, GroupInterfaceForPerson,GroupInterfaceForGroup} from "../General/intefaces"
import axios from "axios";
import { useAppContext } from "../../utils/context";


  
  const GroupForGroup: React.FC<GroupInterfaceForGroup> = ({fathergroupid,have_father,groups,peoples,name,_id}) => {
  const { state, dispatch } =  useAppContext();
  const DeleteGroupFromGroupsFront=async(fathergroupid: string,groupid: string):Promise<void>=>{
    const updatedGroups =await state.groups?.map(group => {
      if (group._id === fathergroupid) {
        group.groups  = group.groups .filter(g  => g._id !== groupid);
      }
      if(group._id===groupid){
        group.have_father=false;
      }
      return group;});
      dispatch({ type: "SET_GROUPS", param: updatedGroups });
      console.log(state)
  }
    const deleteGroupFromGroups=async (fathergroupid: string,groupid: string): Promise<void> =>{
      const response=await axios.post(`http://localhost:4000/common/deleteGroupFromGroups/${fathergroupid}/${groupid}`)
      // console.log(response.status===200)
       if(response.status===200){
        DeleteGroupFromGroupsFront(fathergroupid,groupid)
    }
  }

  return (
    <div className="flex flex-row bg-blue-500 w-24 border border-black rounded-full">
    <div className="mx-3">
      {name}
    </div>
    <div className="hover:bg-red-700 border-2 w-4" onClick={()=>deleteGroupFromGroups(fathergroupid,_id)}>
      x
    </div>
  </div>

  )
};
export default GroupForGroup;



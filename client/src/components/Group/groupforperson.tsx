
import React from "react";
import "../design.css"
import {GroupInterface, GroupInterfaceForPerson} from "../General/intefaces"
import axios from "axios";
import { useAppContext } from "../../utils/context";


  
  const GroupForPerson: React.FC<GroupInterfaceForPerson> = ({personid,have_father,groups,peoples,name,_id}) => {
  

  const { state, dispatch } =  useAppContext();
  const UpdateGroupsAndPeoplesAfterSuccessRequest=async(groupid:string,personid:string):Promise<void>=>{
    const updatedGroups =await state.groups?.map(group => {
        if (group._id === groupid) {
          group.peoples = group.peoples .filter(people => people._id !== personid);
        }
        return group;});
       // console.log(updatedPersons)
        dispatch({ type: "SET_GROUPS", param: updatedGroups });
        //deletefrom state the elements
        //from person and from groups
        console.log(state)
      
      const updatedPersons =await state.peoples?.map(person => {
        if (person._id === personid) {
            person.belongs_to = person.belongs_to.filter(group => group._id !== groupid);
        }
        return person;});
       // console.log(updatedPersons)
        dispatch({ type: "SET_PEOPLES", param: updatedPersons });
        //deletefrom state the elements
        //from person and from groups
        console.log(state)
      }
   

     const deleteGroupFromBelongTo=async(personid: string, groupid: string)=> {
      const response=await axios.delete(`http://localhost:4000/people/deleteGroupFromPersonBelongTo/${personid}/${groupid}`)
     // console.log(response.status===200)
      if(response.status===200){
      UpdateGroupsAndPeoplesAfterSuccessRequest(groupid,personid)
      }
      else{
        window.Error("asdasd")
      }
     
    }
  

    return (
 
      <div className="flex flex-row bg-blue-500 w-24 border border-black rounded-full">
      <div className="mx-3">
        {name}
      </div>
      <div className="hover:bg-red-700 border-2 w-4" onClick={() => deleteGroupFromBelongTo(personid, _id)}>
        x
      </div>
    </div>

  )};

export default GroupForPerson;

import React from "react";
import "../design.css"
import {PeopleInterface,GroupInterface,PeopleInterfaceGroup} from "../General/intefaces"
import GroupForPerson from "../Group/groupforperson";
import {useAppContext} from "../../utils/context";
import axios from "axios";
  
  const PeopleForGroup: React.FC<PeopleInterfaceGroup> = ({fathergroupid, _id,name, age,gender,belongs_to }) => {
    const { state, dispatch } =  useAppContext();

    const UpdateGroupsAndPeoplesAfterSuccessRequest=async(groupid:string,personid:string):Promise<void>=>{
        const updatedGroups =await state.groups?.map(group => {
            if (group._id === groupid) {
              group.peoples = group.peoples.filter(people => people._id !== personid);
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
       
   
   
    const deleteRequestPeopleFromGroup=async(personid: string, groupid:string)=> {
        const response=await axios.post(`http://localhost:4000/groups/deletePeopleFromGroup/${groupid}/${personid}/`)
       // console.log(response.status===200)
        if(response.status===200){
            await UpdateGroupsAndPeoplesAfterSuccessRequest(groupid,personid)
        }
    }

    return (
     
          <div className="flex flex-row bg-blue-500 w-24 border border-black rounded-full">
          <div className="mx-3">
            {name}
          </div>
          <div className="hover:bg-red-700 border-2 w-4" onClick={()=>deleteRequestPeopleFromGroup(_id,fathergroupid)} >
            x
          </div>
        </div>
    

    );
};
export default PeopleForGroup;
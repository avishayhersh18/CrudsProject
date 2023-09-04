import React, { useEffect, useState } from "react";
import "../design.css";
import { GroupInterface, GroupInterfaceForPerson, PeopleInterface } from "../General/intefaces";
import axios from "axios";
import { useAppContext } from "../../utils/context";
import Peoples from "../People/tablepeoples";
import PeopleForGroup from "../People/peopleforgroup";
import GroupForGroup from "./groupforgroups";
interface GroupInterfaceForRowGroup
{  have_father:boolean;
    groups:GroupInterface[];
    peoples:PeopleInterface[];
    name: string;
    _id:string;
    setShowhierarchy:React.Dispatch<React.SetStateAction<boolean>>;
    sethierarchyContent:React.Dispatch<React.SetStateAction<string>>;
}

const Group: React.FC<GroupInterfaceForRowGroup> = ({ have_father, groups, peoples, name, _id,setShowhierarchy, sethierarchyContent }) => {
  const { state, dispatch } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(name);
    const [flagAddpeople,setflagAddpeople]=useState(false)
    const [flagAddGroup,setflagAddGroup]=useState(false)
  const [selectedPerson,setselectedPerson]=useState<PeopleInterface|undefined>(undefined)
   const [selectedGroup, setSelectedGroup] = useState<GroupInterface | undefined>(undefined);
  const handleEnterKey = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (event.key === "Enter") {
      await updateGroup();
      setEditMode(false);
    }
  };

  const updateGroup = async (): Promise<void> => {
    try {
      const response = await axios.post(`http://localhost:4000/groups/updateGroupById/${_id}`, {
        name: editedName,
      });

      if (response.data) {
        const updatedGroups = state.groups?.map((group) => {
          if (group._id === _id) {
            return { ...group, name: editedName };
          }
          return group;
        });

        dispatch({ type: "SET_GROUPS", param: updatedGroups });
        alert(`Group "${editedName}" updated successfully`);
        setEditMode(false)    
      }
    } catch (error) {
        alert(`Group not updated please fill the filed right`);
        setEditMode(false)    
    }
  };
  const showHirearachi=async(groupid:string)=>{
    try {
        const response = await axios.get(`http://localhost:4000/common/hierarchy/${groupid}`);
  
        if (response.data) {
            sethierarchyContent(response.data)
            setShowhierarchy(true)
          };    
   

      } catch (error) {
          alert(`Group not updated please fill the filed right`);
          setEditMode(false)    
      }
    };
    const peopleThatNotInGroup = (): PeopleInterface[] | undefined => {
        const peopleInGroup = state.groups?.find(group => group._id === _id)?.peoples || [];
    
        let peopleThatNotInGroup: PeopleInterface[] | null = state.peoples || [];
        let newArr = peopleThatNotInGroup.filter(person => !peopleInGroup.some(groupPerson => groupPerson._id === person._id));
    
        console.log(newArr);
        return newArr;
    };
    const groupsThatCanAdd=():GroupInterface[]|undefined=>{
        const groupInGroup = state.groups?.find(group => group._id === _id)?.groups|| [];
    
        let groupThatNotInGroup: GroupInterface[] | null = state.groups || [];
        let newArr = groupThatNotInGroup.filter(group => !groupInGroup.some(groupGroup => groupGroup._id ===group._id));
        return newArr;
    }
    const deleteGroup=async (_id: string):Promise<void> =>{

        const response=await axios.post(`http://localhost:4000/groups/deleteGroupById/${_id}`)
        if(response.status===200){
            let updateGroupsArray =await state.groups?.map(group => {
                if (group.groups.some((g)=>g._id===_id)) {
                  group.groups = group.groups.filter(gr => gr._id !== _id);
                }
                return group;});
        
            updateGroupsArray= updateGroupsArray?.filter((group)=>group._id!==_id) 
            console.log(updateGroupsArray)
            await dispatch({ type: "SET_GROUPS", param:  updateGroupsArray })       
            //console.log(updateGroupsArray)
            let updatePeoplesArray= await state.peoples?.map((people)=>{
                console.log(people.belongs_to.some((g)=>g._id===_id))
                if(people.belongs_to.some((g)=>g._id===_id))
                    people.belongs_to = people.belongs_to.filter(group => group._id !== _id); 
            return people;})
            console.log(updatePeoplesArray)
            await dispatch({ type: "SET_PEOPLES", param:updatePeoplesArray})
               
            console.log(state)
        }
        else
        {console.log(response.data)    }  
    }
    const makeIdPerson=async (id:string|null):Promise<PeopleInterface|undefined>=>{
        return state.peoples?.find(people=>people._id===id);
    }
    const saveNewPeopleInGroup=async(peopleid:string|undefined)=>{
        if(selectedPerson){
        const response=await axios.post(`http://localhost:4000/common/addPeopleToGroupAndAddGroupToPeople/${peopleid}/${_id}`)
        console.log(response.data)
        if(response.data==='Updated'){
                let updateGroupsArray = state.groups?.map(group => {
                    if (group._id===_id ) {
                            group.peoples.push(selectedPerson);
                  
                    }
                    return group;});
            
                console.log(updateGroupsArray)
                await dispatch({ type: "SET_GROUPS", param:  updateGroupsArray })       
    
                let updatePeoplesArray= await state.peoples?.map((people)=>{
                   if(people._id===selectedPerson?._id){
                        people.belongs_to.push({ have_father:have_father, groups:groups, peoples:peoples, name:name, _id:_id})
                   }
                return people;})
                console.log(updatePeoplesArray)
                await dispatch({ type: "SET_PEOPLES", param:updatePeoplesArray})
                   
                console.log(state)
                alert("the people add to group successfully")
            }
            else
            {console.log(response.data)}  
        }
        else{  
            alert("please choose people")
           
        }
        setflagAddpeople(false)
    }
    const saveNewGroupInGroup = async (groupid: string|undefined) => {
        if(selectedGroup&&!selectedGroup.have_father){
        try {

          const response = await axios.post(
            `http://localhost:4000/groups/addGroupToGroup/${_id}/${groupid}`
          );
    
          if (response.data==='Updated') {
            // Handle successful addition of group to group

            const updatedGroups = state.groups?.map(existingGroup => {
              if (existingGroup._id === _id) {
                return {
                  ...existingGroup,
                  groups: [...existingGroup.groups, selectedGroup] // Push selectedGroup into the groups array
                };
              }
              if (existingGroup._id === selectedGroup._id) {
                return {
                  ...existingGroup,
                  have_father: true
                };
              }
              return existingGroup; // Return other groups unchanged
            });
            
            dispatch({ type: "SET_GROUPS", param: updatedGroups });
                  
    
            const updatedPeoplesArray = (state.peoples || []).map((people) => {
              if (people._id === selectedPerson?._id) {
                people.belongs_to.push({
                  have_father: have_father,
                  groups: groups,
                  peoples: peoples,
                  name: name,
                  _id: _id,
                });
              }
              return people;
            })
    
            await dispatch({ type: "SET_PEOPLES", param: updatedPeoplesArray });
    
            console.log("State updated");
          } if(response.data==="There is a circle in the graph!") {
              alert("There is create circle between the cruds please add another crud");
          }
        } catch (error) {
          console.log(error);
          alert("Error adding group to group.");
        }
    }
    else{alert("the group that you choose not legal or have father yet ")}
    setflagAddGroup(false);
    setSelectedGroup(undefined)
    }


    const makeIdGroup=async(selectedGroupid: string | null): Promise<GroupInterface|undefined>=>{
      
       const result  =state.groups?.find((group)=>group._id===selectedGroupid)
       console.log(result)
       return result
    }
    useEffect(()=>{
      console.log(selectedGroup?.name)
    },[selectedGroup])
    return (
        <tr key={_id}>
          <td className="border px-4 py-2">
            {editMode ? (
              <input
                type="text"
                value={editedName}
                className="w-16"
                onChange={e => setEditedName(e.target.value)}
                onKeyDown={handleEnterKey}
              />
            ) : (
              name
            )}
          </td>
          <td className="border px-4 py-2">
            {state.groups?.map(group => {
              if (group._id === _id) {
                return group.peoples.map(people => (
                  <PeopleForGroup
                    fathergroupid={_id}
                    _id={people._id}
                    name={people.name}
                    age={people.age}
                    gender={people.gender}
                    belongs_to={people.belongs_to}
                  />
                ));
              }
              return null;
            })}
          </td>
    
          <td className="border px-4 py-2">
            {state.groups?.map(group => {
              if (group._id === _id) {
                return group.groups.map(group => (
                  <GroupForGroup
                    fathergroupid={_id}
                    _id={group._id}
                    name={group.name}
                    have_father={group.have_father}
                    peoples={group.peoples}
                    groups={group.groups}
                  />
                ));
              }
              return null;
            })}
          </td>
          <td className="border px-4 py-2">
            {editMode ? (
              <>
                <button className="mr-3 border" onClick={updateGroup}>
                  Save
                </button>
                <button className="mr-3 border" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="mr-3 border" onClick={() => setEditMode(true)}>
                  Edit
                </button>
                <button className="mr-3 border" onClick={() => deleteGroup(_id)}>
                  Delete
                </button>
                <button className="mr-3 border" onClick={() => showHirearachi(_id)}>
                  Hierarchy
                </button>
              </>
            )}
          </td>
          <td className="border px-4 py-2">
  {flagAddpeople ? (
    <>
      <select
        value={selectedPerson ? selectedPerson.name : ''}
        onChange={async e => setselectedPerson(await makeIdPerson(e.target.options[e.target.selectedIndex].getAttribute("data-id")))}
      >
        <option value="">Select a person to add</option>
        {peopleThatNotInGroup()?.map(person => (
          <option
            key={person._id}
            value={person.name}
            data-id={person._id}
          >
            {person.name}
          </option>
        ))}
      </select>
      <button   className="bg-gray-900-700" onClick={() => saveNewPeopleInGroup(selectedPerson?._id)}>Save</button>
      <button  className="bg-red-700" onClick={() => setflagAddpeople(false)}>Cancel</button>
    </>
 ) : flagAddGroup ? (
  <>
    <select
      value={selectedGroup ? selectedGroup._id : ""}
      onChange={async e => {
        const groupId = e.target.value;
        const group = await makeIdGroup(groupId);
        setSelectedGroup(group);
      }}
    >
      <option value="">Select a group to add</option>
      {groupsThatCanAdd()?.map(group => (
        <option key={group._id} value={group._id}>
          {group.name}
        </option>
      ))}
    </select>
    <button className="bg-gray-900-700 mr-1" onClick={() => saveNewGroupInGroup(selectedGroup?._id)}>Save</button>
    <button className="bg-red-700" onClick={() => setflagAddGroup(false)}>Cancel</button>

  </>
) : (
  <>
    <button className="mr-3 border" onClick={() => setflagAddpeople(true)}>
      Add People
    </button>
    <button className="mr-3 border" onClick={() => setflagAddGroup(true)}>
      Add Group
    </button>
  </>
)}
</td>
</tr>
);
};

export default Group;





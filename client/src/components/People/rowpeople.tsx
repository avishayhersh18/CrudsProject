import React, { KeyboardEventHandler, useState } from "react";
import "../design.css";
import { PeopleInterface, GroupInterface } from "../General/intefaces";
import GroupForPerson from "../Group/groupforperson";
import { useAppContext } from "../../utils/context";
import axios from "axios";

const People: React.FC<PeopleInterface> = ({ _id, name, age, gender, belongs_to }) => {
  const { state, dispatch } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editAge, setEditAge] = useState(age?.toString());
  const [editGender, setEditGender] = useState(gender);

    const deletePeople=async(): Promise<void>=> {
      let updatePeoples:PeopleInterface[]|undefined=[];
      let updateGroups:GroupInterface[]|undefined=[];
      const response=await axios.post(`http://localhost:4000/people/DeletePersonById/${_id}`)
     // console.log(response.data)
      if(response.status===200){

  
        updatePeoples=await state.peoples?.filter((people)=>people._id!==_id) 
      console.log(updatePeoples)
      await dispatch({ type: "SET_PEOPLES", param: updatePeoples })       
      updateGroups= await state.groups?.map((group)=>{
          console.log(group.peoples.some((p)=>p._id===_id))
          if(group.peoples.some((p)=>p._id===_id))
            group.peoples = group.peoples.filter((p)=>p._id!==_id); 
      return group;})
      console.log(updateGroups)
      await dispatch({ type: "SET_GROUPS", param:updateGroups})         
      console.log(state)
      }
      else
      {console.log(response.data)    }  
  } 
  
  const handleEnterKey = async (event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>): Promise<void> => {
    if (event.key === "Enter") {
      await updatePeople();
      setEditMode(false);
    }
  };
  const savePeople = async()=>{
    
      await updatePeople();
      setEditMode(false);
    }

  const updatePeople = async (): Promise<void> => {
    try {
      const response = await axios.post(`http://localhost:4000/people/updatePersonById/${_id}`, {
        name: editName,
        age: parseFloat(editAge),
        gender: editGender,
      });

      if (response.data) {
        const updatedPeoples = state.peoples?.map((people) => {
          if (people._id === _id) {
            return { ...people, name: editName, age: parseFloat(editAge), gender: editGender };
          }
          return people;
        });

        dispatch({ type: "SET_PEOPLES", param: updatedPeoples })
        alert(`the people updated successfully`);
      }
      else{alert(`the person ${name} not update please fill right the field `)}
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  return (
    <tr key={_id}>
      <td className="border px-10 py-2">
        {editMode ? (
          <input
            type="text"
            value={editName}
            className="w-16 align-center"
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={handleEnterKey}
          />
        ) : (
          name
        )}
      </td>
      <td className="border px-4 py-2">
        {editMode ? (
          <input
            type="number"
            className="w-16 align-center"
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
            onKeyDown={handleEnterKey}
          />
        ) : (
          age
        )}
      </td>
      <td className="border px-4 py-2" >
  {editMode ? (
    <select
      value={editGender}
      className="w-16 align-center"
      onChange={(e) => setEditGender(e.target.value)}
      onKeyDown={handleEnterKey}>
    
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  ) : (
    gender
  )}
</td>
      <td className="border px-4 py-2">
        {belongs_to.map((group) => {
          return (
            <GroupForPerson
              personid={_id}
              have_father={group.have_father}
              groups={group.groups}
              peoples={group.peoples}
              name={group.name}
              _id={group._id}
            />
          );
        })}
      </td>
      <td className="border px-4 py-2">
        {editMode ? (
          <>
            <button className="mr-3 border" onClick={savePeople}>
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
       
        <button className="mr-3 border" onClick={deletePeople}>
          Delete
        </button>
        </>
         )}
      </td>
    </tr>
  );
};

export default People;
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import "../design.css"
import { PeopleInterface } from "../General/intefaces"
// import GroupForPerson from "../Group/groupforperson";
import { useAppContext } from "../../utils/context";
import axios from "axios";

interface typeAddPeople {
  setshowCreateFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const addPeople: React.FC<typeAddPeople> = ({ setshowCreateFlag }) => {
  const { state, dispatch } = useAppContext();
  const [personname, setpersonname] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');

  const createPerson = async( )=> {
      const persontocreate= { age: age,belongs_to:[], gender:gender,name: personname}
  
       const response =await axios.post("http://localhost:4000/people/createPerson",persontocreate)
       console.log(response.data)
       if(response.data){
         let peoples:PeopleInterface[]|null=state.peoples
         peoples?.push(response.data)
         dispatch({type:"SET_PEOPLES",param:peoples})
         alert(`person ${response.data.name} created`)
         setshowCreateFlag(false)
         console.log(state)
       }
       else {
         alert("fail to create new person")
         handleCancel();
       }

 
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setpersonname(event.target.value);
  }

  const onChangeAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseFloat(event.target.value); // Parse as float
    setAge(newAge);
  }
  

  const onChangeGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  }
  const handleCancel = () => {
    setpersonname('');
    setAge(0);
    setGender('');
    setshowCreateFlag(false)
  }

  return (
    <div className="flex flex-col border border-black rounded-full">
      <div>Create Person</div>
      <div className="flex aflex-row">
        <div className="mr-3">
          <input type="text" value={personname} onChange={onChangeInput} placeholder="Name"  required/>
        </div>
        <div  className="mr-3" >
          <input type="number" value={age} onChange={onChangeAge} placeholder="Age"  required/>
        </div>
        <div>
          <select value={gender} onChange={onChangeGender}  required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div  className="mr-3 bg-green-500">
          <button onClick={() => createPerson()}>create</button>
        </div>
        <div  className="mr-3 ">
          <button onClick={() => handleCancel()}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default addPeople;
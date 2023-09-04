/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import "../design.css"
import {PeopleInterface,GroupInterface,PeopleInterfaceGroup} from "../General/intefaces"
import GroupForPerson from "../Group/groupforperson";
import {useAppContext} from "../../utils/context";
import axios from "axios";
  interface addGroupType{
    setshowCreateGroupForm:React.Dispatch<React.SetStateAction<boolean>>;
  }
  const addGroup: React.FC<addGroupType> = ({setshowCreateGroupForm}) => {
    const { state, dispatch } =  useAppContext();
    const[groupname,setgroupname]=useState('')
    const createGroup = async() => {
       const grouptocreate={name:groupname,peoples:[],groups:[],have_father:false}
        const response =await axios.post("http://localhost:4000/groups/createGroup",grouptocreate)
       
       if(response.data!==''){
          let groups:GroupInterface[]|null=state.groups
          groups?.push(response.data)
          dispatch({type:"SET_GROUPS",param:groups})
          alert(`group ${response.data.name} created`)
          setshowCreateGroupForm(false)
        }
        else {
          console.log(response.data)
          alert("fail to create new group please choose name with only letter a-z or A-Z")
          setshowCreateGroupForm(false)
        }

    }
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setgroupname(event.target.value);
      }
      const handleCancel = () => {
        setgroupname('');
        setshowCreateGroupForm(false)
      }
    return (
     
          <div className="flex flex-col border border-black rounded-full">
            <div>Create Group</div>
            <div className="flex flex-row">
                <div className="mr-3">Name:<input type="text" value={groupname} onChange={onChangeInput} /></div>
                <div  className="mr-3"> <button onClick={()=>createGroup()}>create</button></div>
                <div  className="mr-3"> <button onClick={()=>handleCancel()}>cancel</button></div>
            </div>

        </div>
    

    );
};
export default addGroup;
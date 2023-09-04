import React, { useEffect, useState } from "react";

import People from "./rowpeople"
import axios from "axios";
import {PeopleInterface} from "../General/intefaces"
import { useAppContext } from "../../utils/context";
import AddPeople from "./addPeople"
const Peoples: React.FC = () => {
 
  const { state, dispatch } =  useAppContext();
  const [showCreateFlag,setshowCreateFlag]=useState(false)
  return (
    <div >
    <table className="table-fixed w-full border border-white mb-3">
      <thead>
        <tr>
          <th className="w-1/6">Name</th>
          <th className="w-1/6">Age</th>
          <th className="w-1/6">Gender</th>
          <th className="w-1/6">Belongs To</th>
          <th className="w-1/6">Options</th>
        </tr>
      </thead>
      <tbody className="bg-red-300">
        {state.peoples?.map((person, index) => (
        <People _id={person._id} name={person.name} age={person.age} gender={person.gender} belongs_to={person.belongs_to} />
        ))}
        </tbody>
      </table>
      <div >

     {showCreateFlag? <AddPeople setshowCreateFlag={setshowCreateFlag}/>: <button  className="mr-3 bg-green-500" onClick={()=>setshowCreateFlag(true)}>create person</button>}
      </div>
    </div>
  );
        }
export default Peoples;
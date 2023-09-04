import React, { useEffect } from "react";
import { PeopleInterface, GroupInterface, GroupInterfaceForPerson } from "./General/intefaces"
import axios from "axios";
import { useAppContext } from "../utils/context";
import HomePageImage from "../asset/crud.png"
const HomePage: React.FC  = () => {
    
  const { state, dispatch } =  useAppContext();
  const importPeoples=async ()=>{
    const response=await axios.get("http://localhost:4000/people/getAllPeoples")
   // console.log(response.data)
    dispatch({ type: "SET_PEOPLES", param: response.data }); 
  }

  const importGroups = async () => {
    try {
        const response = await axios.get("http://localhost:4000/groups/getAllGroups");
        //console.log(response.data);
        dispatch({ type: "SET_GROUPS", param: response.data });
    } catch (error) {
        console.error('Error fetching groups:', error);
    }
};
  useEffect( ()=>{
    importPeoples();
    importGroups();
    console.log(state)
  },[])

    return (
      <div className="min-w-1/2 min-h-1/2 flex flex-col items-center justify-center">
      <img src={HomePageImage} alt="Home Page" className="w-96 h-auto mb-6" />

      <p className="text-center text-lg mb-4">
        <br/>
        Welcome to our CRUD Website! Manage your groups and people with ease.
      </p>

    
    </div>
    )
    };


export default HomePage;
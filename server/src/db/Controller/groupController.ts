import { Groups } from "../Models";
import { validateLegalName } from "../../utils/validation"; // Assuming the validation function is in this file
import {
  DeleteGroup,
  deleteGroupFromUserAndDeleteUserFromGroup,
  AddGroupToGroups,
} from "./commonController";
export const createGroup = async (groupCreate: any) => {
  if (validateLegalName(groupCreate.name)) {
    const groupcreatedinDB = await Groups.create(groupCreate);
    return groupcreatedinDB;
  } else {
    return null;
  }
};
export const getAllGroups = async () => {
  const groups = await Groups.find({})
    .populate("peoples")
    .populate("groups")
    .exec();
  return groups;
};

export const getGroupByName = async (group_name: string) => {
  const group = await Groups.findOne({ name: group_name });
  return group;
};
export const getGroupById = async (group_id: string) => {
  const group = await Groups.findById(group_id);
  return group;
};
export const updateGroupById = async (id: string, body: any) => {
  if (validateLegalName(body.name)) {
    const groupFromDb = await Groups.findByIdAndUpdate(id, body);
    return groupFromDb;
  } else {
    return null;
  }
};

export const deleteGroupById = async (groupid: string) => {
  const success = await DeleteGroup(groupid); // You need to implement DeleteGroup function
  return success;
};

export const deletePeopleFromGroup = async (
  groupid: string,
  personid: string
) => {
  const result: string = await deleteGroupFromUserAndDeleteUserFromGroup(
    personid,
    groupid
  );
  return result === "Updated";
};

export const addGroupToGroup = async (
  groupid: string,
  grouptoaddtogroupsarrayid: string
) => {
  return await AddGroupToGroups(groupid, grouptoaddtogroupsarrayid);
};

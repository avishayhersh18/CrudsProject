import { validateLegalName, isPositiveNumber } from "../../utils/validation";
import {
  deleteGroupFromUserAndDeleteUserFromGroup,
  DeleteUserFromGroups,
} from "./commonController";
import { Peoples } from "../Models";
import { CreatePersonProps } from "../../interfaces";

export const findPersonByName = async (name: string) => {
  return await Peoples.findOne({ name });
};

export const findPersonById = async (id: string) => {
  return await Peoples.findById(id);
};

export const createPerson = async (body: CreatePersonProps) => {
  return await Peoples.create(body);
};

export const updatePersonById = async (id: string, body: any) => {
  if (
    validateLegalName(body.name) &&
    isPositiveNumber(body.age) &&
    body.gender !== ""
  ) {
    const updatedPerson = await Peoples.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updatedPerson;
  } else {
    return null;
  }
};

export const deletePersonById = async (id: string) => {
  await Peoples.findByIdAndDelete(id);
  await DeleteUserFromGroups(id);
};

export const deleteGroupFromPersonAndUser = async (
  personid: string,
  groupid: string
) => {
  const result: string = await deleteGroupFromUserAndDeleteUserFromGroup(
    personid,
    groupid
  );
  if (result === "Updated") {
    const updatedPerson = await findPersonById(personid);
    const updatedGroup = await findPersonById(groupid);
    return { person: updatedPerson, group: updatedGroup };
  } else {
    return null;
  }
};

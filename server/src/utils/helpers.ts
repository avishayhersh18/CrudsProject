import { ObjectId } from "mongodb";
import { Groups } from "../db/Models";
import { Group } from "../interfaces";

export const isGroupAPreviousToGroupB = async (
  groupAId: string,
  groupBId: string
): Promise<boolean> => {
  if (groupAId === groupBId) return true;

  const groupA = await Groups.findById(groupAId);

  if (groupA) {
    for (let groupId of groupA.groups) {
      if (await isGroupAPreviousToGroupB(groupId.toString(), groupBId))
        return true;
    }
  }
  return false;
};

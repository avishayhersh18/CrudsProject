import { Group } from "../../interfaces";
import { isGroupAPreviousToGroupB } from "../../utils/helpers";
import { Groups, Peoples } from "../Models";

export const deleteGroupFromUserAndDeleteUserFromGroup = async (
  personid: string,
  groupid: string
): Promise<string> => {
  try {
    const updatedPerson = await Peoples.findByIdAndUpdate(
      { _id: personid },
      { $pull: { belongs_to: groupid } }
    );

    const updatedGroup = await Groups.findByIdAndUpdate(
      { _id: groupid },
      { $pull: { peoples: personid } }
    );
    if (updatedPerson && updatedGroup) {
      console.log("Updated:", updatedPerson);
      return "Updated";
    } else {
      console.log("Person not found");
      return "Not Updated";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Not Updated";
  }
};
export const DeleteGroupFromUsers = async (
  groupid: string
): Promise<string> => {
  try {
    const updateResult = await Peoples.updateMany(
      { belongs_to: groupid },
      { $pull: { belongs_to: groupid } }
    );

    if (updateResult.modifiedCount >= 0) {
      console.log("delete somthsdfsdf");
      return `Group ${groupid} deleted from the users`;
    } else {
      return `No people found with this group.`;
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    return "An error occurred while processing the request.";
  }
};
export const findGroupsElements = async (
  groupsid: string[]
): Promise<Group[] | null> => {
  let groups: Group[] = [];
  groupsid.forEach(async (group) => {
    const groupFromDb: Group | null = await Groups.findOne({ _id: group });
    if (groupFromDb) groups.push(groupFromDb);
  });
  return groups;
};
export const DeleteUserFromGroups = async (
  personid: string
): Promise<string> => {
  try {
    const updateResult = await Groups.updateMany(
      { peoples: personid },
      { $pull: { peoples: personid } }
    );

    if (updateResult.modifiedCount > 0) {
      return `Person ${personid} deleted from the groups`;
    } else {
      return `No people found with this group.`;
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    return "An error occurred while processing the request.";
  }
};
export const deleteUserFromGroup = async (
  groupid: string,
  personid: string
): Promise<string> => {
  try {
    const updatedGroup = await Groups.findByIdAndUpdate(
      { _id: groupid },
      { $pull: { peoples: personid } }
    );

    if (updatedGroup) {
      console.log("Updated:", updatedGroup);
      return "Updated";
    } else {
      console.log("Person not found");
      return "Not Updated";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Not Updated";
  }
};

export const AddUserToGroup = async (
  userid: string,
  groupid: string
): Promise<string> => {
  const addResult = await Groups.findOneAndUpdate(
    { _id: groupid },
    { $addToSet: { peoples: userid } }
  );
  if (addResult) {
    return "Updated";
  } else {
    return "Not Updated";
  }
};
export const AddGroupToUser = async (
  idperson: string,
  groupid: string
): Promise<string> => {
  if (await Groups.findById(groupid)) {
    const addResult = await Peoples.findOneAndUpdate(
      { _id: idperson },
      { $addToSet: { belongs_to: groupid } }
    );

    if (addResult) {
      return "Updated";
    } else {
      return "Not Updated";
    }
  } else {
    return "Not Updated";
  }
};

export const addUserToGroupAndAddGroupToUser = async (
  userid: string,
  groupid: string
): Promise<string> => {
  if (
    (await AddGroupToUser(userid, groupid)) === "Updated" &&
    (await AddUserToGroup(userid, groupid)) === "Updated"
  ) {
    return "Updated";
  } else {
    return "Not Updated";
  }
};

export const AddGroupToGroups = async (
  groupid: string,
  grouptoaddtogroupsarrayid: string
): Promise<string> => {
  const father: Group | null = await Groups.findById(groupid);
  const child: Group | null = await Groups.findById(grouptoaddtogroupsarrayid);
  if (father && child) {
    if (child?.have_father) return `Not Updated`;

    if (await isGroupAPreviousToGroupB(grouptoaddtogroupsarrayid, groupid))
      return "There is a circle in the graph!";

    const addResult = await Groups.findByIdAndUpdate(groupid, {
      $addToSet: { groups: grouptoaddtogroupsarrayid },
    });
    const updateHaveFather = await Groups.findOneAndUpdate(
      { _id: grouptoaddtogroupsarrayid },
      { have_father: true }
    );

    if (addResult && updateHaveFather) {
      return `Updated`;
    } else {
      // Add a return statement for this code path
      return "the groups not updated"; // Replace "Some error message" with an appropriate error message.
    }
  }
  return `No found people or group this group.`;
};
export const DeleteGroup = async (groupToDelete: string): Promise<boolean> => {
  try {
    // Find all groups that contain the groupToDelete in their groups array
    await Groups.updateMany(
      { groups: groupToDelete },
      {
        $pull: {
          groups: groupToDelete,
        },
      }
    );

    // Update each group to remove the groupToDelete from their groups array
    // const updatePromises = groupsToUpdate.map(async (group) => {
    //   group.groups = group.groups.filter(
    //     (groupId) => groupId.toString() !== groupToDelete
    //   );
    //   await group.save();
    // });

    // await Promise.all(updatePromises);

    await Groups.findByIdAndDelete(groupToDelete);
    await DeleteGroupFromUsers(groupToDelete);
    return true;
  } catch (error) {
    console.error("Error deleting group:", error);
    return false;
  }
};
export const DeleteGroupFromGroups = async (
  groupid: string,
  grouptodelete: string
): Promise<string> => {
  try {
    const updatedGroup = await Groups.findByIdAndUpdate(
      { _id: groupid },
      { $pull: { groups: grouptodelete } }
    );
    const updateGroupToDelete = await Groups.findByIdAndUpdate(
      { _id: grouptodelete },
      { $set: { have_father: false } },
      { new: true }
    ); // Return the updated document

    if (updatedGroup && updateGroupToDelete) {
      console.log("Updated:", updatedGroup);
      return "Updated";
    } else {
      console.log("Person not found");
      return "Not Updated";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Not Updated";
  }
};

// export const getHi = async (groupId: ObjectId) => {
//   const group = await Groups.findById(groupId, { have_father: 0 }).populate(
//     "groups"
//   );
//   if (!group) {
//     return null;
//   }
//   const children = group.groups;
//   for (let index = 0; index < children.length; index++) {
//     // @ts-ignore
//     children[index] = await getHi(children[index]._id);
//   }
//   return group;
// };

export let heirarchyString: string;
export const Heirarchy = async (
  groupids: string[],
  deg: number
): Promise<void> => {
  if (groupids.length === 0) return;

  if (deg === 1) heirarchyString = "";
  heirarchyString += `\n\nDegree number ${deg}:\n`;
  let newGroupIds: string[] = [];

  for (let i = 0; i < groupids.length; i++) {
    const curGroup = await Groups.findById(groupids[i]);

    if (curGroup) {
      heirarchyString += `Group Number ${i + 1} - ${curGroup.name}:\n`;
      if (curGroup.peoples.length === 0)
        heirarchyString += "There are no sons.\n";
      for (let j = 0; j < curGroup.peoples.length; j++) {
        const curPerson = await Peoples.findById(curGroup.peoples[j]);
        if (curPerson)
          heirarchyString += `Person Number ${j + 1} - ${curPerson.name}\n`;
      }
      for (let k = 0; k < curGroup.groups.length; k++)
        newGroupIds.push(curGroup.groups[k].toString());
    }
  }

  await Heirarchy(newGroupIds, deg + 1);
};

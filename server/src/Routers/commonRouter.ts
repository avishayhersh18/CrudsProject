import express from "express";
import { Groups, Peoples } from "../db/Models";
import { Person, Group } from "../interfaces";
import { Request, Response } from "express";
import {
  DeleteGroupFromUsers,
  DeleteUserFromGroups,
  AddUserToGroup,
  Heirarchy,
  AddGroupToUser,
  AddGroupToGroups,
  DeleteGroupFromGroups,
  heirarchyString,
  addUserToGroupAndAddGroupToUser,
} from "../db/Controller";
// import { getHi } from "../db/Controller/commonController";
import { ObjectId } from "mongoose";

const commonRouter: any = express.Router();

//delete group from users---
commonRouter.post(
  "/deleteGroupFromUsers/:groupid",
  async (req: Request, res: Response) => {
    console.log("reach");
    const groupid: string = req.params.groupid;

    res.send(await DeleteGroupFromUsers(groupid));
  }
);
//delete user from groups ---
commonRouter.post(
  "/deleteUserFromGroups/:userid",
  async (req: Request, res: Response) => {
    console.log("reach");
    const userid: string = req.params.userid;

    res.send(await DeleteUserFromGroups(userid));
  }
);
//add user to group--
commonRouter.post(
  "/addUserToGroup/:userid/:groupid",
  async (req: Request, res: Response) => {
    console.log("reach to add user to group");
    const userid: string = req.params.userid;
    const groupid: string = req.params.groupid;

    res.send(await AddUserToGroup(userid, groupid));
  }
);

//add group to user
commonRouter.post(
  "/addGroupToUser/:userid/:groupid",
  async (req: Request, res: Response) => {
    console.log("reach to add group to user");
    const userid: string = req.params.userid;
    const groupid: string = req.params.groupid;

    res.send(await AddGroupToUser(userid, groupid));
  }
);
commonRouter.post(
  "/addPeopleToGroupAndAddGroupToPeople/:userid/:groupid",
  async (req: Request, res: Response) => {
    const userid: string = req.params.userid;
    const groupid: string = req.params.groupid;
    res.send(await addUserToGroupAndAddGroupToUser(userid, groupid));
  }
);
//delete group from group -needd add have_father update false
commonRouter.post(
  "/deleteGroupFromGroups/:groupid/:grouptodelete",
  async (req: Request, res: Response) => {
    console.log("SDdfsdfsdf");
    const groupid: string = req.params.groupid;
    const grouptodelete: string = req.params.grouptodelete;
    console.log(groupid, grouptodelete);
    const result = await DeleteGroupFromGroups(groupid, grouptodelete);
    if (result === "Updated") res.status(200).send("Updated");
    else res.status(404).send("fail");
  }
);

// commonRouter.get("/hi/:groupId", async (req: Request, res: Response) => {
//   res.send(await getHi(req.params.groupId as unknown as ObjectId));
// });
commonRouter.get("/hierarchy/:groupid", async (req: Request, res: Response) => {
  const groupid: string = req.params.groupid;
  await Heirarchy([groupid], 1);
  return res.send(heirarchyString);
});

export default commonRouter;

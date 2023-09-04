import express from "express";
import { Groups, Peoples } from "../db/Models";
import { Person, Group, PeopleToFront, GroupToFront } from "../interfaces";
import { Request, Response } from "express";
import {
  AddGroupToGroups,
  DeleteGroup,
  DeleteGroupFromGroups,
  DeleteGroupFromUsers,
  deleteGroupFromUserAndDeleteUserFromGroup,
} from "../db/Controller";
import { validateLegalName } from "../utils/validation";
import {
  createGroup,
  updateGroupById,
  deleteGroupById,
  deletePeopleFromGroup,
  addGroupToGroup,
  getAllGroups,
  getGroupByName,
  getGroupById,
} from "../db/Controller/groupController";

const groupRouter: any = express.Router();

groupRouter.get("/getAllGroups", async (req: Request, res: Response) => {
  res.send(await getAllGroups());
});

groupRouter.get(
  "/getGroupByName/:groupname",
  async (req: Request, res: Response) => {
    res.send(await getGroupByName(req.params.groupname));
  }
);

groupRouter.get("/getGroupById/:id", async (req: Request, res: Response) => {
  res.send(await getGroupById(req.params.id));
});

groupRouter.post("/createGroup/", async (req: Request, res: Response) => {
  const groupCreate = req.body;
  const groupCreated = await createGroup(groupCreate);
  if (groupCreated) {
    res.send(groupCreated);
  } else {
    console.log("not validated ");
    res.send(null);
  }
});

groupRouter.post(
  "/updateGroupById/:id",
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const body = req.body;
    const updatedGroup = await updateGroupById(id, body);
    if (updatedGroup) {
      res.send(updatedGroup);
    } else {
      res.send(null);
    }
  }
);

groupRouter.post(
  "/deleteGroupById/:groupid",
  async (req: Request, res: Response) => {
    const groupid = req.params.groupid;
    const success = await deleteGroupById(groupid);
    if (success) {
      res.status(200).send(`Deleted group ${groupid} successfully!`);
    } else {
      res.status(404).send("Failed to delete group");
    }
  }
);
groupRouter.post(
  "/deletePeopleFromGroup/:groupid/:personid",
  async (req: Request, res: Response) => {
    const groupid = req.params.groupid;
    const personid = req.params.personid;
    const result = await deletePeopleFromGroup(groupid, personid);
    if (result) {
      res.status(200).send("Updated");
    } else {
      res.status(404).send("Failed");
    }
  }
);

//add group to group
groupRouter.post(
  "/addGroupToGroup/:groupid/:grouptoaddtogroupsarrayid",
  async (req: Request, res: Response) => {
    const groupid = req.params.groupid;
    const grouptoaddtogroupsarrayid = req.params.grouptoaddtogroupsarrayid;
    const result = await addGroupToGroup(groupid, grouptoaddtogroupsarrayid);
    res.send(result);
  }
);

export default groupRouter;

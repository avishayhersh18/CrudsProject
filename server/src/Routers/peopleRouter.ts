import express, { Request, Response } from "express";
import { createPersonSchema } from "../utils/schemas";
import {
  createPerson,
  deleteGroupFromPersonAndUser,
  deletePersonById,
  findPersonById,
  findPersonByName,
  updatePersonById,
} from "../db/Controller/peopleController";
import { Peoples } from "../db/Models";
import {
  isPositiveNumber,
  validateLegalName,
  validateSchema,
} from "../utils/validation";

const peopleRouter = express.Router();

peopleRouter.get("/getAllPeoples", async (req: Request, res: Response) => {
  try {
    const peoplesForFront = await Peoples.find({})
      .populate("belongs_to")
      .exec();

    res.send(peoplesForFront);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching people.");
  }
});

peopleRouter.delete(
  "/deleteGroupFromPersonBelongTo/:personid/:groupid",
  async (req: Request, res: Response) => {
    const personid: string = req.params.personid;
    const groupid: string = req.params.groupid;
    const result = await deleteGroupFromPersonAndUser(personid, groupid);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Fail");
    }
  }
);

//get person by full name
peopleRouter.get(
  "/FindPersonByName/:name",
  async (req: Request, res: Response) => {
    const nameParam: string = req.params.name;
    const people = await findPersonByName(nameParam);
    res.send(people);
  }
);

//get person by id
peopleRouter.get("/findPersonById/:id", async (req: Request, res: Response) => {
  res.send(await findPersonById(req.params.id));
});

//create new person request
peopleRouter.post(
  "/createPerson",
  (req, res, next) => {
    const { error } = validateSchema(createPersonSchema, req.body);
    if (error) {
      next(error?.message);
    }
    next();
  },
  async (req: Request, res: Response) => {
    const createdPerson = await createPerson(req.body);
    if (createdPerson) {
      res.send(createdPerson);
    } else {
      res.send(null);
    }
  }
);

peopleRouter.post(
  "/updatePersonById/:id",
  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const body = req.body;

    if (
      validateLegalName(body.name) &&
      isPositiveNumber(body.age) &&
      body.gender !== ""
    ) {
      const updatedPerson = await updatePersonById(id, body);
      if (updatedPerson) {
        res.send(updatedPerson);
      } else {
        res.send(null);
      }
    } else {
      res.send(null);
    }
  }
);

peopleRouter.post(
  "/DeletePersonById/:id",
  async (req: Request, res: Response) => {
    const deletedid = req.params.id;
    await deletePersonById(deletedid);
    res.status(200).send("Delete successfully!");
  }
);

export default peopleRouter;

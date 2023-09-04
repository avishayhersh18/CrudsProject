import { ObjectId, Types } from "mongoose";

export type Person = {
  _id: ObjectId;
  name: string;
  age: number;
  gender: string;
  belongs_to: ObjectId[];
};

export type CreatePersonProps = Omit<Person, "_id">;

export interface Group {
  _id: string;
  name: string;
  peoples: string[];
  groups: string[];
  have_father: boolean;
}
export interface PeopleToFront {
  _id: Types.ObjectId;
  name: string | undefined;
  age: number | undefined;
  gender: string | undefined;
  belongs_to: Group[];
}
export interface GroupToFront {
  _id: Types.ObjectId;
  name: string;
  peoples: Person[];
  groups: Group[];
  have_father: boolean;
}

// export enum Gender{
//     Male="Male",
//     Female="Female"
// }

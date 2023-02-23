import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IHogwartsSortProps {
  description: string;
  userDisplayName: string;
  email: string;
  context: WebPartContext;
}

export interface IHogwartsHouse {
  Id: number;
  Key: string;
  HouseNameData: string;
}

export interface IStudentHogwartsHouse {
  Id: number;
  Title: string;
  FullName: string;
  Email: string;
  HousesName: string;
  TimeSort: Date;
}

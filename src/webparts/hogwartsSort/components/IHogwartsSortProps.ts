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

export const HOGWARTSHOUSELIST: IHogwartsHouse[] = [
    { Id: 1, Key: "Gryffindor", HouseNameData: "Gryffindor" },
    { Id: 2, Key: "Slytherin", HouseNameData: "Slytherin" },
    { Id: 3, Key: "Ravenclaw", HouseNameData: "Ravenclaw" },
    { Id: 4, Key: "Hufflepuff", HouseNameData: "Hufflepuff" },
];

export interface IStudentHogwartsHouse {
    Id: number;
    Title: string;
    FullName: string;
    Email: string;
    HousesName: string;
    TimeSort: Date;
}

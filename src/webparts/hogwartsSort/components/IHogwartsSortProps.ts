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
    HouseName: string;
}

export const HOGWARTSHOUSELIST: IHogwartsHouse[] = [
    { Id: 1, Key: "Gryffindor", HouseName: "Gryffindor" },
    { Id: 2, Key: "Slytherin", HouseName: "Slytherin" },
    { Id: 3, Key: "Ravenclaw", HouseName: "Ravenclaw" },
    { Id: 4, Key: "Hufflepuff", HouseName: "Hufflepuff" },
];

export interface IStudentHogwartsHouse {
    Id: number;
    Title: string;
    FullName: string;
    Email: string;
    House: string;
    TimeSort: Date;
}

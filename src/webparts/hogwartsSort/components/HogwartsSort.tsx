import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect, useState } from "react";
import { getSP } from "../../../pnpConfiguration";
import styles from "./HogwartsSort.module.scss";
import {
  IHogwartsSortProps,
  IStudentHogwartsHouse,
} from "./IHogwartsSortProps";
interface IHouseName {
  Id: number;
  HouseName: string;
}

const getRandomNumber = (previousNumber: number) => {
  let randomNumber = Math.floor(Math.random() * 4) + 1;
  while (randomNumber === previousNumber) {
    randomNumber = Math.floor(Math.random() * 4) + 1;
  }
  return randomNumber;
};

const HogwartsSort = (props: IHogwartsSortProps) => {
  const { userDisplayName, email, context } = props;

  const _LIST_NAME = "Hogwarts";
  const _LIST_HOUSES_NAME = "HouseName";
  let _sp: SPFI = getSP(context);
  const [listStudents, setListStudents] = useState<IStudentHogwartsHouse[]>([]);
  const [houseName, setHouseName] = useState<string>("");
  const [houseList, setHouseList] = useState<IHouseName[]>([]);
  const [previousHouse, setPreviousHouse] = useState<number>();
  const [randomNumber, setRandomNumber] = useState(getRandomNumber(null));
  const [currentStudent, setCurrentStudent] = useState<IStudentHogwartsHouse>(
    {} as IStudentHogwartsHouse
  );

  const _getHogwartsList = async () => {
    try {
      const hogwartsList = await _sp.web.lists.getByTitle(_LIST_NAME).items();
      setListStudents(
        hogwartsList.map((student: IStudentHogwartsHouse) => {
          return {
            Title: student.Title,
            Id: student.Id,
            FullName: student.FullName,
            Email: student.Email,
            HousesName: student.HousesName,
            TimeSort: student.TimeSort,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const _getCurrentStudent = async (student: IStudentHogwartsHouse) => {
    try {
      const currentStudent = await _sp.web.lists
        .getByTitle(_LIST_NAME)
        .items.getById(student.Id)();
      setHouseName(currentStudent.HousesName);
    } catch (error) {
      console.log(error);
    }
  };

  const _getHouseNames = async () => {
    try {
      const houseNamesList = await _sp.web.lists
        .getByTitle(_LIST_HOUSES_NAME)
        .items();
      setHouseList(
        houseNamesList.map((house) => {
          return {
            Id: house.Id,
            HouseName: house.Title,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _getHogwartsList();
    _getHouseNames();
  }, []);

  useEffect(() => {
    listStudents.map((student: IStudentHogwartsHouse) => {
      if (student.Email === email) {
        _getCurrentStudent(student);
        setCurrentStudent(student);
      }
    });
  }, [listStudents]);

  const addNewHouse = async (currentStudent: IStudentHogwartsHouse) => {
    try {
      await _sp.web.lists
        .getByTitle(_LIST_NAME)
        .items.getById(currentStudent.Id)
        .update({
          HousesName: houseName,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortRandomHouse = () => {
    const newRandomNumber = getRandomNumber(randomNumber);
    setPreviousHouse(randomNumber);
    setRandomNumber(newRandomNumber);
    houseList.forEach((house) => {
      if (house.Id === previousHouse) {
        setHouseName(house.HouseName);
      }
    });
  };

  useEffect(() => {
    addNewHouse(currentStudent);
  }, [previousHouse, randomNumber]);

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>Hogwarts Sort</h1>
        <p>Sort your students into their houses</p>
      </div>
      <hr />

      {/* Current Student Information */}
      <div>
        <h2>Students</h2>
        <p>
          <strong>Student Name: </strong> {userDisplayName}
        </p>
        <p>
          <strong>Student Email: </strong> {email}
        </p>
        <p>
          <strong>Student House: </strong>
          {currentStudent.HousesName || houseName !== "" ? (
            houseName
          ) : (
            <span
              style={{
                color: "red",
                textDecoration: "underline",
                fontStyle: "italic",
              }}
            >
              The Sorting Hat has not yet sorted you into a house.
            </span>
          )}
        </p>
        {currentStudent.HousesName || houseName !== "" ? (
          <div className={styles.container}>
            <div className={styles.button} onClick={handleSortRandomHouse}>
              <div className={styles.icon}>
                <span className={styles.text}>Re-Sort</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.button} onClick={handleSortRandomHouse}>
              <div className={styles.icon}>
                <span className={styles.text}>Sort</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <hr />
      {/* Current Date & Time */}
      <div>
        <h2>Current Date & Time</h2>
        <p>
          <strong>Current Date: </strong>{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <hr />
    </section>
  );
};

export default HogwartsSort;

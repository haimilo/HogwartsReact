import { SPFI } from '@pnp/sp';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getSP } from '../../../pnpConfiguration';
import styles from './HogwartsSort.module.scss';
import { IHogwartsSortProps, IStudentHogwartsHouse } from './IHogwartsSortProps';


const HogwartsSort = (props: IHogwartsSortProps) => {
  const {
    userDisplayName,
    email,
    context
  } = props;

  const _LIST_NAME = 'Hogwarts';
  let _sp: SPFI = getSP(context);
  const [listStudents, setListStudents] = useState<IStudentHogwartsHouse[]>([]);
  console.log('listStudents', listStudents);

  const [currentStudent, setCurrentStudent] = useState<IStudentHogwartsHouse>({} as IStudentHogwartsHouse);
  console.log('currentStudent', currentStudent);

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

      // listStudents.map((student: IStudentHogwartsHouse) => {
      //   console.log('student', student);
      //   if (student.Email === email) {
      //     setCurrentStudent(student);
      //   }
      // })
    } catch (error) {
      console.log(error);
    }
  }

  const _getCurrentStudent = async (
    student: IStudentHogwartsHouse
  ) => {
    try {
      const currentStudent = await _sp.web.lists.getByTitle(_LIST_NAME).items.getById(
        student.Id
      )();
      console.log(currentStudent);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    _getHogwartsList();
  }, [])

  useEffect(() => {
    listStudents.map((student: IStudentHogwartsHouse) => {
      console.log('student', student);
      if (student.Email === email) {
        _getCurrentStudent(student);
        setCurrentStudent(student);
      }
    })

    // if (currentStudent) {
    //   console.log('currentStudent', currentStudent);
    //   _getHogwartsList();
    // }
  }, [listStudents])

  return (
    <section>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
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
          {currentStudent.HousesName ? currentStudent.HousesName :
            <span
              style={{
                color: 'red',
                textDecoration: 'underline',
                fontStyle: 'italic',
              }}
            >
              The Sorting Hat has not yet sorted you into a house.
            </span>
          }
        </p>
        {
          currentStudent.HousesName ? (
            <div className={styles.container}>
              <div className={styles.button}>
                <div className={styles.icon}>
                  <span className={styles.text}>Re-Sort</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.container}>
              <div className={styles.button}>
                <div className={styles.icon}>
                  <span className={styles.text}>Sort</span>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <hr />

      {/* Current Date & Time */}
      <div>
        <h2>Current Date & Time</h2>
        <p>
          <strong>Current Date: </strong> {
            new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }
        </p>
      </div>
      <hr />



    </section >
  )
}

export default HogwartsSort
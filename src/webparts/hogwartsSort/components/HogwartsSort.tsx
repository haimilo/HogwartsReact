import { SPFI } from '@pnp/sp';
import * as React from 'react';
import { useEffect } from 'react';
import { getSP } from '../../../pnpConfiguration';
// import styles from './HogwartsSort.module.scss';
import { IHogwartsSortProps } from './IHogwartsSortProps';


const HogwartsSort = (props: IHogwartsSortProps) => {
  console.log(props)

  const _LIST_NAME = 'Hogwarts';
  let _sp: SPFI = getSP(props.context);

  const _getHogwartsList = async () => {
    try {
      const hogwartsList = await _sp.web.lists.getByTitle(_LIST_NAME).items();
      console.log(hogwartsList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    _getHogwartsList();
  }, [])

  return (
    <div>HogwartsSort</div>
  )
}

export default HogwartsSort
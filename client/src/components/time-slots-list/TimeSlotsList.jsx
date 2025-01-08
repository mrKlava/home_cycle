import { useEffect, useState } from 'react';

import { TimeSlotsListItem } from '..';
import { Button } from '../../ui';

import style from './style.module.scss';


function TimeSlotsList() {
  const [currentDate, currentTime] = new Date().toLocaleString('en-GB').split(', ');
  const [currentHour, currentMinutes] = currentTime.split(':');
  const closestAvailableHour = parseInt(currentHour) + (parseInt(currentMinutes) + 20 >= 60 ? 2 : 1)
  
  const [timeSlots, setTimeSlots] = useState([1, 2, 3, 4, 5, 6, 7]);

  const createTimeSlots = (date) => {
    const slots = [];


    for (let i = 8, end = 19; i < end; i++ ) {
      console.log(closestAvailableHour)

       
      
      slots.push(i);
    }

    return {date, slots}
  }

  useEffect(() => {
    console.log(createTimeSlots(currentDate))

  }, [])

  return (
    <div className={style.slots}>
      <h1>Available Slots</h1>
      <div className={style.slotsInner}>
        <Button>Prev</Button>
        <div className={style.slotsList}>
          {timeSlots.map(slot => <TimeSlotsListItem key={slot}/>)}
        </div>
        <Button>Next</Button>
      </div>
    </div>
  )
}

export default TimeSlotsList
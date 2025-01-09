import { useState } from 'react';

import { TimeSlotsListItem } from '..';
import { Button } from '../../ui';

import style from './style.module.scss';


function TimeSlotsList() {
  const [timeSlots, setTimeSlots] = useState([1, 2, 3, 4, 5, 6, 7]);

  const handlePrev = (e) => e.preventDefault() 
  const handleNext = (e) => e.preventDefault() 

  return (
    <div className={style.slots}>
      <h1>Available Slots</h1>
      <div className={style.slotsInner}>
        <Button onClick={handlePrev}>Prev</Button>
        <div className={style.slotsList}>
          {timeSlots.map(slot => <TimeSlotsListItem key={slot}/>)}
        </div>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}

export default TimeSlotsList
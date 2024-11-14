import { useNavigate } from 'react-router-dom';

import { Button } from '../..';
import { BUTTONS, LINKS } from '../../../constants';

function ButtonBikeNew() {
  const navigate = useNavigate();

  const handleClick = () => navigate(LINKS.BIKE_NEW.PATH);
  
  return (
    <Button onClick={handleClick}>{BUTTONS.BIKE_ADD}</Button>
  )
}

export default ButtonBikeNew;
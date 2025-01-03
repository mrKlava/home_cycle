import { useNavigate } from 'react-router-dom';

import { Button } from '../..';
import { BUTTONS, LINKS } from '../../../constants';

function ButtonBikeNew({navigateTo, label}) {
  const navigate = useNavigate();

  const handleClick = () => navigate(navigateTo);
  
  return (
    <Button onClick={handleClick}>{label}</Button>
  )
}

export default ButtonBikeNew;
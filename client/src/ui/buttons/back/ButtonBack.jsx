import { useNavigate } from 'react-router-dom';
import { Button } from '../..';

import { BUTTONS } from '../../../constants';

/**
 * ### Back Button 
 * 
 * This button navigates to previous page
 * 
 * Can be used only inside of React Router
 */
function ButtonBack() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)}>
      {BUTTONS.BACK}
    </Button>
  )
}

export default ButtonBack;
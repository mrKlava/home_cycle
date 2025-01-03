import { useInterventionsContext } from "../../hooks";
import { InterventionListItem } from "..";

import style from "./style.module.scss";

/**
 * ### Intervention List for user
 *  
 * Renders list of intervention if there is at least one intervention, 
 * if no will render message saying that there is no intervention
 */
function InterventionList() {
  const { interventions } = useInterventionsContext();

  return (
    <section>
      {
        interventions && interventions.length
          ? interventions.map((intervention) => <InterventionListItem key={intervention.interventionId} intervention={intervention} />)
          : <h3>No Intervention where found</h3>
      }
    </section>
  )
}

export default InterventionList;
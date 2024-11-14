
import { useFetchData } from "../../hooks";
import { InterventionServices } from "../../services";

import { Title } from "../../ui";

import { PAGES } from "../../constants";


function InterventionsPage() {
  const {data: interventions, isLoading} = useFetchData(InterventionServices.getInterventions);

  return (
    <main className="main">
      <Title>{PAGES.INTERVENTIONS.TITLE}</Title>
      { isLoading 
      ? <p>Loading...</p> 
      : (
        interventions && interventions.map((intervention) => {
          return (
            <Link key={intervention.intervention_id} to={LINKS.INTERVENTION.PATH + "/" + intervention.intervention_id}>
              {intervention.intervention_id}
            </Link>
          )
        })
      )}
    </main>
  );
}

export default InterventionsPage;

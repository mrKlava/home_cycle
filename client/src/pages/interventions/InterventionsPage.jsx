import { useInterventionsContext } from "../../hooks";

import { InterventionList, PageHeader } from "../../components";
import { ButtonBikeNew } from "../../ui";

import { BUTTONS, LINKS, PAGES } from "../../constants";

function InterventionsPage() {
  const { interventions } = useInterventionsContext();

  return (
    <div>
      <PageHeader title={PAGES.INTERVENTIONS.TITLE} />
      <div className='container'>
        <ButtonBikeNew navigateTo={LINKS.INTERVENTION_NEW.PATH} label={BUTTONS.INTERVENTION_ADD}/>
        <InterventionList />
        <ButtonBikeNew navigateTo={LINKS.INTERVENTION_NEW.PATH} label={BUTTONS.INTERVENTION_ADD}/>
      </div>
    </div>
  );
}

export default InterventionsPage;

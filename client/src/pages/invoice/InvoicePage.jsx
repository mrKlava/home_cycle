import { useParams } from 'react-router-dom';

import { useFetchData } from '../../hooks';
import { InvoiceServices } from '../../services';

import { ButtonBack, Title } from '../../ui';

import { PAGES } from '../../constants';


function InvoicesPage() {
  const { id } = useParams();

  const { data: invoice, isLoading } = useFetchData(InvoiceServices.getInvoiceById, [id]);

  return (
    <main className="main">
      <ButtonBack />
      <Title>{PAGES.INVOICE.TITLE}</Title>
      {isLoading
        ? <p>Loading...</p>
        : invoice && <p>{invoice.invoice_id}</p>}
    </main>
  )
}

export default InvoicesPage

import { Link } from "react-router-dom";

import { useFetchData } from "../../hooks";
import { InvoiceServices } from "../../services";

import { Title } from "../../ui";

import { PAGES, LINKS } from "../../constants";



function InvoicesPage() {
  const {data: invoices, isLoading} = useFetchData(InvoiceServices.getInvoices);
  
  return (
    <main className="main">
      <Title>{PAGES.INVOICES.TITLE}</Title>
      { isLoading 
      ? <p>Loading...</p> 
      : (
        invoices && invoices.map((invoice) => {
          return (
            <Link key={invoice.invoice_id} to={LINKS.INVOICES.PATH + "/" + invoice.invoice_id}>
              {invoice.invoice_id}
            </Link>
          )
        })
      )}
    </main>
  )
}

export default InvoicesPage;

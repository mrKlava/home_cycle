import { RESPONSES } from "../constants/index.js";
import { InvoiceQueries } from "../queries/index.js"
import { RequestTools, ResponseTools } from "../utils/index.js";

/* Get all users */

export const getInvoices = async (req, res, next) => {
  try {
    const currentUser = ResponseTools.getUserFromLocals(res);

    let invoices;

    // select which query you need execute
    if (currentUser.role === 'client') {
      invoices = await InvoiceQueries.getInvoicesByUserId(currentUser.id);
    } else {
      invoices = await InvoiceQueries.getInvoices();
    }

    // check if there are interventions
    if (!invoices.length) return res.status(200).json({ data: invoices, message: RESPONSES.MESSAGES.NO_INVOICE });

    return res.status(200).json({ data: invoices });
  } catch (err) {
    return next(err);
  }
}

export const getInvoiceById = async (req, res, next) => {
  try {
    // get bike and check if 
    const paramInvoiceId = RequestTools.getStringParam(req, 'invoiceID')
    if (!paramInvoiceId) return res.status(200).json({ error: RESPONSES.ERRORS.NO_PARAM })

    const currentUser = ResponseTools.getUserFromLocals(res);

    let invoice;

    if (currentUser.role === 'client') {
      invoice = await InvoiceQueries.getInvoiceByIdAndUserId(paramInvoiceId, currentUser.id);
    } else {
      invoice = await InvoiceQueries.getInvoiceById(paramInvoiceId);
    }

    if (!invoice) return res.status(200).json({ message: RESPONSES.MESSAGES.NO_INVOICE });

    return res.status(200).json({ data: invoice });
  } catch (err) {
    return next(err);
  }
}
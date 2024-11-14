import express from "express";
import {
  getInvoices
  , getInvoiceById
} from "../controllers/invoices.js";


const router = express.Router();

router.get("/", getInvoices);
router.get("/:invoiceID", getInvoiceById);


export default router;
import express from "express";

import { DeleteHistory, EditHistory, getallHistory, Histroy } from "../../Controllers/About/History.js";
const HistoryRouter=express.Router();
HistoryRouter.post('/create',Histroy);
HistoryRouter.get('/getall',getallHistory);
HistoryRouter.put('/Edit/:id',EditHistory);
HistoryRouter.delete('/delete/:id',DeleteHistory)
export default HistoryRouter;
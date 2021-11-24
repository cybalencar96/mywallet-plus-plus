import express from "express";
import cors from "cors";
import { auth } from "./middlewares/auth.js";
import { signup, signin } from "./controllers/userController.js";
import { getFinancialEvents, getTotalFinancialEvents, postFinancialEvents } from "./controllers/financialsEventsController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", signup);
app.post("/sign-in", signin);

app.post("/financial-events", auth, postFinancialEvents);
app.get("/financial-events", auth, getFinancialEvents);
app.get("/financial-events/sum", auth, getTotalFinancialEvents);

export default app;

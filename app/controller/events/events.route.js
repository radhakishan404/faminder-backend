"use strict";
import express from "express";
import reqValidator from "../../middlewares/req.validator.js";
import {
    authenticateUser
} from "../../middlewares/authentication.js";
import {
    insertEvents, getEventsList, getSingleEvents, editEvents, removeEvents
} from "./events.controller.js";
import {
    insertEventsVal, getEventsListVal, singleEventsVal, editEventsVal
} from "./events.validator.js";

const router = express.Router();

router.post("/", authenticateUser, reqValidator(insertEventsVal), insertEvents);
router.get("/list", authenticateUser, reqValidator(getEventsListVal), getEventsList)
router.get("/", authenticateUser, reqValidator(singleEventsVal), getSingleEvents)
router.put("/", authenticateUser, reqValidator(editEventsVal), editEvents);
router.delete("/", authenticateUser, reqValidator(singleEventsVal), removeEvents);

export default router;

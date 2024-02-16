'use strict';
import express from "express";

import authRoutes from "../controller/auth/auth.route.js";
import eventsRoutes from "../controller/events/events.route.js";
// import sansthaRoutes from "../controller/sanstha/sanstha.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/events", eventsRoutes);
// router.use("/sanstha", sansthaRoutes);

export default router;
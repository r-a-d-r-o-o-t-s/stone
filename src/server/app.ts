// Copyright 2021-2023 @radroots/focus authors & contributors
// SPDX-License-Identifier: UNLICENSED

import cors from "cors";
import express, { Express } from "express";
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import morgan from "morgan";
import { envstone } from "../_env";
import { router } from "./router";

const { STONE_CORS_ORIGIN } = envstone

/**
 * * Radroots Documentation
 *
 * @created 08 17 2023
 * @notes [ ]
 *
 */
export const app: Express = express();
app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(express.static(`static`))
    .use(cors({
        credentials: true,
        origin: STONE_CORS_ORIGIN.split(`,`)
            .filter((i) => i !== `,`)
            .filter((j) => !!j),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    }))
    .use(helmet({
        xssFilter: true, // XSS attack
        frameguard: true, // Clickjacking
        hsts: true, // HTTP Strict Transport Security
        noSniff: true, // MIME sniffing
        hidePoweredBy: true, // Hide X-Powered-By
    }))
    .use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 240, // Limit each IP to 120 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }))
    .use(router)


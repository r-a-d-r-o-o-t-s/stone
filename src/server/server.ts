// Copyright 2021-2023 @radroots/focus authors & contributors
// SPDX-License-Identifier: UNLICENSED

import RedisStore from "connect-redis";
import session from "express-session";
import http, { Server } from "http";
import Redis from "ioredis";
import { app } from "./app";

const PROD = process.env.NODE_ENV === `prod`

const TANGLE_REDIS_PORT = 6379
const TANGLE_COOKIE_NAME = `cookie-name`
const TANGLE_COOKIE_IV = `cookie-iv`
const TANGLE_COOKIE_DOMAIN = `tauri://localhost`

/**
 * * Radroots Documentation
 *
 * @created 08 17 2023
 * @notes [ ]
 *
 */
export const server = async (): Promise<Server | undefined> => {
    try {
        const httpServer = http.createServer(app);


        const redis = new Redis(TANGLE_REDIS_PORT);
        // await redis.flushall();

        app.use(
            session({
                name: TANGLE_COOKIE_NAME,
                secret: TANGLE_COOKIE_IV,
                saveUninitialized: false,
                resave: false,
                proxy: PROD,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
                    httpOnly: !PROD,
                    sameSite: !PROD,
                    secure: PROD,
                    domain: TANGLE_COOKIE_DOMAIN,
                },
                store: new RedisStore({
                    client: redis,
                    prefix: 'sesID#',
                }),
            })
        );


        return httpServer;

    } catch (error) {
        console.log(error, `error`)
        return undefined
    }
};

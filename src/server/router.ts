// Copyright 2021-2023 @radroots/focus authors & contributors
// SPDX-License-Identifier: UNLICENSED

import { Request, Response, Router } from "express";


/**
 * * Radroots Documentation
 *
 * @created 08 17 2023
 * @notes [ ]
 *
 */
const router = Router();
router.get(`/breathe`, (_: Request, res: Response) => {
    res.status(200).send();
})
router.get(`/test`, (_: Request, res: Response) => {
    res.status(200).send({
        stone: `yo!`
    });
})

export { router };


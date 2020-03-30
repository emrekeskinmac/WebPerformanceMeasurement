import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { CollectRepository } from '../../repository/CollectRepository';
import moment = require('moment');

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

interface InputSeed {
    size: number
}

@Route("seed")
@Tags("seed")
export class SeedController extends Controller {
    @Post()
    public async post(
        @Body() body: InputSeed,
    ): Promise<boolean> {
        await CollectRepository.table.collection.remove({});
        let i: number = 0;
        while (i < body.size) {
            await CollectRepository.table.create({
                /* TTFB */
                "t": getRandomInt(1000, 2000),
                /* DOM Load */
                "r": getRandomInt(3000, 7000),
                /* Load */
                "e": getRandomInt(6000, 10000),
                /* First Content Paint */
                "n": getRandomInt(800, 2500),
                /* Resources */
                "d": [],
                /* Client Id */
                "y": Math.random().toString(36).substring(2) + Date.now().toString(36),
                /* Date */
                "o": new Date().getTime(),
                /* URL */
                "l": "localhost:3001",
                "createdAt": moment().subtract(getRandomInt(0, 29), "minute").toISOString()
            });

            i++
        }
        return true
    }
}
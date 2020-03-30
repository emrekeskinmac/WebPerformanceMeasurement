import { Body, Controller, Post, Route, Request, Get, Tags } from 'tsoa';
import * as  moment from 'moment';
import * as  express from 'express';
import { CollectRepository } from '../../repository/CollectRepository';
import { GetOutputCollectDTO, PostInputCollectDTO } from './collect.model';

@Route("collect")
@Tags("collect")
export class CollectController extends Controller {
  @Post()
  public post(
    @Body() body: PostInputCollectDTO,
    @Request() request: express.Request,
  ): boolean {
    if (Object.keys(body).length > 0) {
      CollectRepository.table.create(body);
      return true
    }
    let streamData: Uint8Array[] = []
    request.on('data', (chunk: any) => {
      streamData.push(chunk);
    }).on('end', () => {
      if (streamData.length > 0) {
        let endData: string = Buffer.concat(streamData).toString();
        CollectRepository.table.create(JSON.parse(endData));
      }
    });
    return true
  }
  @Get()
  public async get(): Promise<Array<GetOutputCollectDTO>> {
    return await CollectRepository.table.aggregate([
      {
        "$match": {
          "$and": [
            { "createdAt": { "$gte": new Date(moment().subtract(30, 'minutes').toISOString()) } },
            { "createdAt": { "$lte": new Date(moment().toISOString()) } }
          ]
        }
      },
      {
        "$group": {
          "_id": { "$minute": "$createdAt" },
          "ttfb": { "$avg": "$t" },
          "dload": { "$avg": "$r" },
          "load": { "$avg": "$e" },
          "paint": { "$avg": "$n" },
          "date": { "$first": "$createdAt" }
        }
      },
    ]).sort({ "_id": 1 })
  }
}
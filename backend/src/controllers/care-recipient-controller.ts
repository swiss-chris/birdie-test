import * as express from "express";
import { Response } from 'express';
import { connection } from '../db/connection';

// TODO use proper types instead of 'any'

export const careRecipientController = express.Router();

careRecipientController.get('/recipients', (_, res) => {
  const QUERY = `select care_recipient_id 
    from birdietest.events 
    group by care_recipient_id`;
  const mapper = (row: any) => row.care_recipient_id;

  queryDatabase(QUERY, res, mapper);
});


careRecipientController.get('/recipients/:id/mood', (req, res) => {
  const QUERY = `select JSON_EXTRACT(payload, '$.mood') as mood, timestamp
    from birdietest.events 
    where care_recipient_id = '${req.params.id}'
    and event_type = 'mood_observation'
    and JSON_EXTRACT(payload, '$.mood') != 'NULL'
    order by timestamp desc`;
  const mapper = (row: any) => {
    return {
      mood: JSON.parse(row.mood),
      timestamp: row.timestamp
    }
  };

  queryDatabase(QUERY, res, mapper);
});

careRecipientController.get('/recipients/:id', (req, res) => {
  const QUERY = `select payload, event_type, timestamp
  from birdietest.events 
  where care_recipient_id = '${req.params.id}'
  order by timestamp desc
  limit 100`;
  const mapper = (row: any) => {
    const payload = JSON.parse(row.payload);
    const {
      id,
      event_type,
      visit_id,
      timestamp,
      caregiver_id,
      care_recipient_id, 
      ...remaining} = payload;

    return {...payload, 
      extra_data: remaining
    };
  };

  queryDatabase(QUERY, res, mapper);
});

function queryDatabase(QUERY: string, res: Response, mapper: any) {
  connection.query(QUERY,
    function (error: Error, rows: any) {
      if (error) {
        res.status(500).json({ error });
      }
      else {
        res.status(200).json({
          result: rows.map(mapper)
        });
      }
    }
  );
}

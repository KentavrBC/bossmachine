const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const minionsRouter = require('./minions');
const { addToDatabase, createMeeting, deleteAllFromDatabase } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

apiRouter.use(['/api/minions', '/api/ideas', '/api/meetings'], (req, res, next) => {
    if (req.baseUrl === '/api/minions') {
        req.type = 'minions';
        next();
    } else if (req.baseUrl === '/api/ideas') {
        req.type = 'ideas';
        next();
    } else if (req.baseUrl === '/api/meetings') {
        req.type = 'meetings';
        next();
    } else {
        return res.status(404).send();
    }
});

apiRouter.post('/api/ideas/', checkMillionDollarIdea, (req, res, next) => {
    const added = addToDatabase(req.type, req.body);
    res.status(201).send(added);
});

apiRouter.post('/api/meetings', (req, res, next) => {
    const meeting = createMeeting();
    addToDatabase(req.type, meeting);
    res.status(201).send(meeting);
});

apiRouter.delete('/api/meetings', (req, res, next) => {
    deleteAllFromDatabase(req.type);
    res.status(204).send();
})

apiRouter.use(['/api/minions', '/api/ideas', '/api/meetings'], minionsRouter);


module.exports = apiRouter;

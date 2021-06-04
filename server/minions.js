const minionsRouter = require('express').Router({mergeParams: true});
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const app = require('../server');
const { 
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db');

const anyParam = (req, res, next, id) => {
    const itemId = String(id);
    req.id = itemId;
    next();
};

const resolvePutRequest = (req, res, next) => {
    const item = updateInstanceInDatabase(req.type, req.body);
    if (!item) {
        res.status(404).send()
    } else {
        res.status(200).send(item);
    }
    
}

minionsRouter.param('minionId', anyParam);

minionsRouter.get('/', (req, res, next) => {
    const item = getAllFromDatabase(req.type);
    res.status(200).send(item);
});

minionsRouter.post('/', (req, res, next) => {
    const newItem = addToDatabase(req.type, req.body);
    res.status(201).send(newItem);
});

minionsRouter.get(['/:minionId', '/:ideaId'], (req, res, next) => {
    const item = getFromDatabaseById(req.type, req.id);
    if (!item) {
        res.status(404).send();
    } else {
        res.status(200).send(item);
    }
});

minionsRouter.put('/:minionId', resolvePutRequest);
minionsRouter.put('/:ideaId', checkMillionDollarIdea, resolvePutRequest);

minionsRouter.delete(['/:minionId', '/:ideasId'], (req, res, next) => {
    const deletedItem = deleteFromDatabasebyId(req.type, req.id);
    if (deletedItem === false) {
        res.status(404).send();
    } else {
        res.status(204).send();
    }
});

module.exports = minionsRouter;
const checkMillionDollarIdea = (req, res, next) => {
    if (!req.body.weeklyRevenue || !req.body.numWeeks || isNaN(req.body.weeklyRevenue) || isNaN(req.body.numWeeks) || (req.body.numWeeks * req.body.weeklyRevenue) < 1000000) {
        res.status(400).send();
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
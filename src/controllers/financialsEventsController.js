import * as financialEventsService from '../services/financialEventsService.js';

async function postFinancialEvents(req, res) {
    const {
        value,
        type ,
    } = req.body;

    const user = res.locals.user;

    try {
        if (!value || !type) {
            return res.sendStatus(400);
        }

        if (!['INCOME', 'OUTCOME'].includes(type)) {
            return res.sendStatus(400);
        }

        if (value < 0) {
            return res.sendStatus(400);
        }

        await financialEventsService.addTransaction({userId: user.id, value, type})
        
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getFinancialEvents(req, res) {
    const user = res.locals.user;

    try {
        const events = await financialEventsService.getFinancialsFromUser(user.id);

        res.send(events);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getTotalFinancialEvents(req, res) {
    const user = res.locals.user;

    try {
        const sum = await financialEventsService.getSumFromUser(user.id)

        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export {
    postFinancialEvents,
    getFinancialEvents,
    getTotalFinancialEvents,
}
import * as financialEventsRepository from '../repositories/financialEventsRepository.js';

async function addTransaction({userId, value, type}) {
    await financialEventsRepository.insert({userId, value, type});
}

async function getFinancialsFromUser(userId) {
    const events = await financialEventsRepository.get({ userId });

    return events;
}

export {
    addTransaction,
    getFinancialsFromUser,
}
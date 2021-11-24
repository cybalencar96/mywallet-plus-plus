import * as financialEventsRepository from '../repositories/financialEventsRepository.js';

async function addTransaction({userId, value, type}) {
    await financialEventsRepository.insert({userId, value, type});
}

async function getFinancialsFromUser(userId) {
    const events = await financialEventsRepository.get({ userId });

    return events;
}

async function getSumFromUser(userId) {
    const events = await financialEventsRepository.get({ userId });

    const sum = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);

    return sum;
}

export {
    addTransaction,
    getFinancialsFromUser,
    getSumFromUser,
}
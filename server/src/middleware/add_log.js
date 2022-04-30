const Log = require('../models/logs_model');

const add_log = async (id, type = 'added') => {
    const log = new Log({
        file_id: id,
        type: type,
        cluster: process.pid
    })

    await log.save();
}

module.exports = add_log;
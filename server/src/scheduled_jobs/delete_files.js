const schedule = require('node-schedule');
const File = require('../models/files_model');

const rule = new schedule.RecurrenceRule();
//rule.minute = [new schedule.Range(0, 59, 1)];

rule.dayOfWeek = [new schedule.Range(0, 6)];
rule.hour = 23;
rule.minute = 30;

const job = schedule.scheduleJob(rule, async function() {
    const files = await File.deleteMany({isDeleted: true});
});
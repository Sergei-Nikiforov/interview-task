const express = require('express');
const cors = require('cors');
require('./db/mongoose');
require('./scheduled_jobs/delete_files');
const fileRouter = require('./routers/files_router');

const port = process.env.PORT;

const app = express();

app.use(cors({
    origin: '127.0.0.1:' + port
}));
app.use(express.json());
app.use(fileRouter);

module.exports = {app, port};
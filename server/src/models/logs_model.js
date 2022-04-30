const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    file_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'File'
    },
    type: {
        type: String,
        default: 'added'
    },
    cluster: {
        type: Number
    },
}, {
    timestamps: true
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;
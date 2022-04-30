const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalname: {
        type: String
    },
    size: {
        type: Number
    },
    attachment: {
        type: Buffer,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

fileSchema.methods.toJSON = function() {
    const file = this;
    const fileObject = file.toObject();

    delete fileObject._id;
    delete fileObject.isDeleted;
    delete fileObject.attachment;
    delete fileObject.updatedAt;
    delete fileObject.__v;

    return fileObject;
}

const File = mongoose.model('File', fileSchema);
module.exports = File;
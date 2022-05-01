const express = require('express');
const File = require('../models/files_model');
const multer = require('multer');
const add_log = require('../middleware/add_log');
const router = new express.Router();

router.get('/files', async(req, res) => {
    // Get files
    const sort = {createdAt: 1};

    // if (req.query.sortBy) {
    //     const parts = req.query.sortBy.split(':');
    //     sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    // }

    try {
        const options = {
            limit: parseInt(req.query.limit) || 0,
            skip: parseInt(req.query.skip) || 0,
            sort
        }
        const files = await File.find({isDeleted: false}, null, options);
        res.send(files);
    } catch (e) {
        res.status(500).send(e);
    }
})

const upload = multer({
    limits: {
        fileSize: 500000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|xlsx|png)$/)) {
            return cb(new Error('Please upload an image!'));
        }
        cb(undefined, true);
    }
});

router.post('/add', upload.single('file'), async (req, res) => {
    // Add file
    const file = new File({
        originalname: req.file.originalname,
        size: req.file.size,
        attachment: req.file.buffer,
    });

    await file.save();
    await add_log(file.id);
    
    res.status(201).send(file);
}, (error, req, res, next) => {
    res.status(500).send({error: error.message});
})

router.patch('/delete/:id', async(req, res) => {
    // Delete file
    try {
        const file = await File.findOne({_id: req.params.id});

        if (!file) {
            return res.status(404).send();
        }
        file.isDeleted = true;
        await file.save();
        await add_log(file.id, 'deleted');

        res.send('File marked for deletion!');

    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;
import express from 'express';
const router = express.Router();
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'source/uploads/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        // cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
        cb(null, file.originalname);
    }
});

router.post('/upload', (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err: any) {
        if (!req.file) {
            return res.send('Please select an file to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded the file`);
    });
});



export = router;
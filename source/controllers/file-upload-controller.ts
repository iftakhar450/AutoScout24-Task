import { Request, Response, NextFunction } from 'express';
import _ from 'underscore';
import multer from 'multer';
let upload = multer({ dest: 'uploads/' });

const NAMESPACE = 'File upload Controller';
/**Average Listing Selling Price per Seller Type Report Function */
const fileupload = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: 'File uploaded successfully' })
}

export default {
    fileupload
};
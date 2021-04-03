import express from 'express';
import reportController from './../controllers/report-controller';
const router = express.Router();


// router.get('/test', reportController.testFunction);

/**  Average Listing Selling Price per Seller Type  Route*/
router.get('/reportOne', reportController.reportOne);

/**Percentual distribution of available cars by Make Route */
router.get('/reportTwo', reportController.reportTwo);

/**Average price of the 30% most contacted listings */
router.get('/reportThree', reportController.reportThree);

/**The Top 5 most contacted listings per Month */
router.get('/reportFour', reportController.reportFour);

/**upload files api */

export = router;
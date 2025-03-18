import express from 'express'
import upload from '../../Config/multerConfig.js';
import { getallqualityProducts, QualityProducts , DeleteById, EditQuality} from '../../Controllers/Quality/QualityProducts.js';
const QualityProductRouter=express.Router();
QualityProductRouter.post('/create', upload.single('image'), QualityProducts);
QualityProductRouter.get('/getall',getallqualityProducts);
QualityProductRouter.delete('/delete/:id',DeleteById);
QualityProductRouter.put('/Edit/:id',upload.single('image'),EditQuality);
export default  QualityProductRouter;
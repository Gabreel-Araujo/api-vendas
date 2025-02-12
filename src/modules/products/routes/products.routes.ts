import {Router} from 'express';
import ProductsControllers from '../controllers/ProductsControllers';
import { celebrate, Joi, Segments } from 'celebrate';


const productsRouter = Router();
const productsController = new ProductsControllers();

productsRouter.get('/',productsController.index);

productsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required()
        }
    })
  ,productsController.show);

productsRouter.post(
    '/',

    celebrate({
        [Segments.BODY]:{
            name:Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required()
        }
    })

    ,

    productsController.create);

productsRouter.put(
    '/:id',
      celebrate({
        [Segments.BODY]:{
            name:Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required()
        },
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required()
        }
    }),
    productsController.upadte)

productsRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().uuid().required()
        }
    }),
    productsController.delete)




export default productsRouter;

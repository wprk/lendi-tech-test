import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.create)
  .get('/', controller.findAll)
  .get('/:id', controller.findById)
  .delete('/:id', controller.deleteById)
  .put('/:id', controller.updateById);

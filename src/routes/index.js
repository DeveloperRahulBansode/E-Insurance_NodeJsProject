import express from 'express';
const router = express.Router();

import clientRoute from './client.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  
  router.use('/clients', clientRoute);

  return router;
};

export default routes;

import express from 'express';
const router = express.Router();

import clientRoute from './client.route';
import agentRoute from './agent.route';
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
  router.use('/agents', agentRoute);

  return router;
};

export default routes;

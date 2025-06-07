const express = require('express');
const router  = express.Router();
const { 
  getSubscriptions, addSubscription, 
  removeSubscriptionByEndpoint, addJob, cancelJobByEvent 
} = require('../controllers/noti');

router.post('/subscribe', async (req, res) => {
  await addSubscription(req.body);
  res.sendStatus(201);
});

router.post('/unsubscribe', async (req, res) => {
  await removeSubscriptionByEndpoint(req.body.endpoint);
  res.sendStatus(200);
});

router.post('/schedule', async (req, res) => {
  const { eventId, title, start } = req.body;
  const notifyAt = new Date(new Date(start) - 30*60*1000);
  await addJob(eventId, notifyAt, { eventId, title, url: '/calendar' });
  res.sendStatus(202);
});

router.post('/cancel', async (req, res) => {
  await cancelJobByEvent(req.body.eventId);
  res.sendStatus(200);
});

module.exports = router;
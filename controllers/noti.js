const mongoose = require('mongoose');
const Agenda = require('agenda');
const webpush = require('web-push');

// Inicializa agenda con la cadena de conexión en lugar de mongoose.connection.db
const connectionString = process.env.DB_CNN;
const agenda = new Agenda({
  db: { address: connectionString, collection: 'agendaJobs' }
});

// 2) Define modelo de Subscription:
const subSchema = new mongoose.Schema({
  endpoint: { type: String, unique: true },
  keys: { p256dh: String, auth: String }
});
const Subscription = mongoose.model('Subscription', subSchema);

// 3) Define job que envía la notificación:
agenda.define('send event notification', async job => {
  const { title, url } = job.attrs.data;
  const subs = await Subscription.find().lean();
  subs.forEach(sub => {
    webpush.sendNotification(sub, JSON.stringify({ title, body: title, url }))
      .catch(console.error);
  });
});

// 4) Arranca el scheduler:
(async function() { 
  try {
    await agenda.start();
    console.log('Agenda scheduler started');
  } catch (error) {
    console.error('Error starting agenda:', error);
  }
})();

// 5) Funciones exportadas:
async function getSubscriptions() {
  return Subscription.find().lean();
}
async function addSubscription(sub) {
  await Subscription.updateOne(
    { endpoint: sub.endpoint },
    sub,
    { upsert: true }
  );
}
async function removeSubscriptionByEndpoint(endpoint) {
  await Subscription.deleteOne({ endpoint });
}
async function addJob(eventId, date, payload) {
  // payload = { title, url }
  await agenda.schedule(date, 'send event notification', payload);
  // opcional: guardar mapping eventId → job si quieres cancelar luego
}
async function cancelJobByEvent(eventId) {
  // asume que al scheduleaste usaste data.eventId para filtrar
  await agenda.cancel({ 'data.eventId': eventId });
}

module.exports = {
  getSubscriptions,
  addSubscription,
  removeSubscriptionByEndpoint,
  addJob,
  cancelJobByEvent
};
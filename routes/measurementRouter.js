import express from 'express';
import controller from '../controllers/measurementController.js';

const app = express();


app.post('/measurement/', controller.create);
app.get('/measurement/', controller.findAll);
app.get('/measurementLast/', controller.findLast);
app.get('/measurement/:id', controller.findOne);
app.delete('/measurement/', controller.removeAll);

export { app as measurementRouter };

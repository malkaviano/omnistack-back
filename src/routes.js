const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/ong.controller');
const incidentsController = require('./controllers/incident.controller');
const sessionController = require('./controllers/session.controller');

const routes = express.Router();

routes.get('/ongs', ongController.list);
routes.post(
    '/ongs',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required().min(3),
            email: Joi.string().email(),
            whatsapp: Joi.string().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
        }).unknown()
    }),
    ongController.create
);

routes.get(
    '/incidents',
    celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required(),
        })
    }),
    incidentsController.list
);
routes.get(
    '/incidents/available',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        })
    }),
    incidentsController.available
);
routes.post('/incidents', incidentsController.create);
routes.delete(
    '/incidents/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        })
    }),
    incidentsController.delete
);

routes.post('/sessions', sessionController.create);

module.exports = routes;
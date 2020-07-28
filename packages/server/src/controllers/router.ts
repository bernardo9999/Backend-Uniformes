import * as express from 'express';
import { 
    UniformesController_initContrato_post,
    UniformesController_createContrato_post,
    UniformesController_getOneContrato_get,
    UniformesController_getAllContrato_get,
    UniformesController_getAllContratoId_get,
    UniformesController_getHistoryContrato_get,
    UniformesController_deleteContrato_post,
    UniformesController_createLote_post,
    UniformesController_updateLote_post,
    UniformesController_getAllLote_get,
    UniformesController_getAllLoteId_get,
    UniformesController_getOneLote_post,
    UniformesController_getHistoryTransaction_post,
    UniformesController_createUniforme_post,
    UniformesController_updateUniforme_post,
    UniformesController_getOneParticipant_get,
    UniformesController_registerParticipant_post,
    UniformesController_changeParticipantIdentity_post } from './controllers'
export default express.Router()
.post('/uniformes/initContrato', UniformesController_initContrato_post)
.post('/uniformes/createContrato', UniformesController_createContrato_post)
.get('/uniformes/getOneContrato/:id', UniformesController_getOneContrato_get)
.get('/uniformes/getAllContrato', UniformesController_getAllContrato_get)
.get('/uniformes/getAllContratoId', UniformesController_getAllContratoId_get)
.get('/uniformes/getHistoryContrato/:id', UniformesController_getHistoryContrato_get)
.post('/uniformes/deleteContrato', UniformesController_deleteContrato_post)
.post('/uniformes/createLote', UniformesController_createLote_post)
.post('/uniformes/updateLote', UniformesController_updateLote_post)
.get('/uniformes/getAllLote/:id', UniformesController_getAllLote_get)
.get('/uniformes/getAllLoteId/:id', UniformesController_getAllLoteId_get)
.post('/uniformes/getOneLote', UniformesController_getOneLote_post)
.post('/uniformes/getHistoryTransaction', UniformesController_getHistoryTransaction_post)
.post('/uniformes/createUniforme', UniformesController_createUniforme_post)
.post('/uniformes/updateUniforme', UniformesController_updateUniforme_post)
.get('/uniformes/getOneParticipant/:id', UniformesController_getOneParticipant_get)
.post('/uniformes/registerParticipant', UniformesController_registerParticipant_post)
.post('/uniformes/changeParticipantIdentity', UniformesController_changeParticipantIdentity_post)

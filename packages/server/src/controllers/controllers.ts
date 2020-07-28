import { Request, Response } from 'express';
import { UniformesControllerBackEnd } from '../convector';


export async function UniformesController_initContrato_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .initContrato());
            
    } catch(ex) {
        console.log('Error post UniformesController_initContrato', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_createContrato_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .createContrato(params.contrato));
            
    } catch(ex) {
        console.log('Error post UniformesController_createContrato', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_getOneContrato_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await UniformesControllerBackEnd
            .getOneContrato(params.id));
        
    } catch(ex) {
        console.log('Error get UniformesController_getOneContrato', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_getAllContrato_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await UniformesControllerBackEnd
            .getAllContrato());
        
    } catch(ex) {
        console.log('Error get UniformesController_getAllContrato', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_getAllContratoId_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await UniformesControllerBackEnd
            .getAllContratoId());
        
    } catch(ex) {
        console.log('Error get UniformesController_getAllContratoId', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_getHistoryContrato_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await UniformesControllerBackEnd
            .getHistoryContrato(params.id));
        
    } catch(ex) {
        console.log('Error get UniformesController_getHistoryContrato', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_deleteContrato_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .deleteContrato(params.id));
            
    } catch(ex) {
        console.log('Error post UniformesController_deleteContrato', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_createLote_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .createLote(params.id,params.data));
            
    } catch(ex) {
        console.log('Error post UniformesController_createLote', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_updateLote_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .updateLote(params.id,params.data));
            
    } catch(ex) {
        console.log('Error post UniformesController_updateLote', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_getAllLote_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await UniformesControllerBackEnd
            .getAllLote(params.id));
        
    } catch(ex) {
        console.log('Error get UniformesController_getAllLote', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_getAllLoteId_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await UniformesControllerBackEnd
            .getAllLoteId(params.id));
        
    } catch(ex) {
        console.log('Error get UniformesController_getAllLoteId', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_getOneLote_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .getOneLote(params.data));
            
    } catch(ex) {
        console.log('Error post UniformesController_getOneLote', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_getHistoryTransaction_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .getHistoryTransaction(params.data));
            
    } catch(ex) {
        console.log('Error post UniformesController_getHistoryTransaction', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_createUniforme_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .createUniforme(params.id,params.lote_id,params.uniforme));
            
    } catch(ex) {
        console.log('Error post UniformesController_createUniforme', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_updateUniforme_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .updateUniforme(params.id,params.lote_id,params.uniforme));
            
    } catch(ex) {
        console.log('Error post UniformesController_updateUniforme', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_getOneParticipant_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await UniformesControllerBackEnd
            .getOneParticipant(params.id));
        
    } catch(ex) {
        console.log('Error get UniformesController_getOneParticipant', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_registerParticipant_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .registerParticipant(params.id,params.name));
            
    } catch(ex) {
        console.log('Error post UniformesController_registerParticipant', ex.stack);
        res.status(500).send(ex);
    }
}
export async function UniformesController_changeParticipantIdentity_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await UniformesControllerBackEnd
                .changeParticipantIdentity(params.id,params.newIdentity));
            
    } catch(ex) {
        console.log('Error post UniformesController_changeParticipantIdentity', ex.stack);
        res.status(500).send(ex);
    }
}
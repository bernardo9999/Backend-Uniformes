import * as yup from "yup";
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  History
} from '@worldsibu/convector-core';

import { Contrato, Uniforme, Lote } from './uniformes.model';
import { Participant } from './participant.model';

@Controller('uniformes')

export class UniformesController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async initContrato() {
    let mockDataContrato = [
      new Contrato({
        id: "1",
        lote: [],
      })]
      ;
    await Promise.all(mockDataContrato.map(contrato => contrato.save()));
  }

  // Create
  //-------

  @Invokable()
  public async createContrato(
    @Param(Contrato)
    contrato: Contrato
  ) {
    await contrato.save();
    return contrato.id
  }

  // Read
  //-------

  @Invokable()
  public async getOneContrato(@Param(yup.string()) id: string) {
    let contrato = await Contrato.getOne(id);
    if (!contrato) {
      throw new Error("Contrato nao existe!");
    }
    return contrato.id;
  }

  @Invokable()
  public async getAllContrato(): Promise<Contrato[]> {
    let contrato = await Contrato.getAll();
    return contrato;
  }

  @Invokable()
  public async getAllContratoId(): Promise<any[]> {
    let all_contrato_id = [];
    let contrato = await Contrato.getAll();
    if (!contrato) {
      throw new Error("Contrato nao existe!");
    }
    for (let i in contrato) {
      if (!contrato[i]) {
        throw new Error("Lote nao existe!");
      }
      all_contrato_id.push(contrato[i].id)
    }
    return all_contrato_id
  }

  @Invokable()
  public async getHistoryContrato(@Param(yup.string()) id: string): Promise<History<Contrato>[]> {
    let contrato = await Contrato.getOne(id);
    if (!contrato) {
      throw new Error("Contrato nao existe!");
    }
    return await contrato.history();
  }

  // Delete
  //-------
  @Invokable()
  public async deleteContrato(@Param(yup.string()) id: string) {
    let contrato = await Contrato.getOne(id);
    if (!contrato) {
      throw new Error("Carro nao existe!");
    }
    await contrato.delete(contrato.id);
  }

  //-------------------------- LOTE --------------------------

  // Create
  //-------

  @Invokable()
  public async createLote(@Param(yup.string()) id: string, @Param(yup.object()) data: Lote) {
    let contrato = await Contrato.getOne(id);
    if (!contrato) {
      throw new Error("Contrato nao existe!");
    }
    for (let i in contrato.lote) {
      if (contrato.lote[i].lote_id === data.lote_id) {
        throw new Error("Lote existe!");
      }
    }
    contrato.lote.push(data);
    await contrato.save();
    for (let i in contrato.lote) {
      const i = contrato.lote.length - 1
      return contrato.lote[i]
    }
  }

  // Read
  //-------

  @Invokable()
  public async getAllLote(@Param(yup.string()) id: string) {
    let all_lote = [];
    let contrato = await Contrato.getOne(id);
    if (!contrato) {
      throw new Error("Contrato nao existe!");
    }
    for (let i in contrato.lote) {
      if (!contrato.lote[i]) {
        throw new Error("Lote nao existe!");
      }
      all_lote.push(contrato.lote[i].lote_id)
    }
    return all_lote
  }

  @Invokable()
  public async getAllLoteId(@Param(yup.string()) id: string) {
    let all_lote_id = [];
    let contrato = await Contrato.getOne(id);
    if (!contrato) {
      throw new Error("Contrato nao existe!");
    }
    for (let i in contrato.lote) {
      if (!contrato.lote[i]) {
        throw new Error("Lote nao existe!");
      }
      all_lote_id.push(contrato.lote[i].lote_id)
    }
    return all_lote_id
  }

  @Invokable()
  public async getOneLote(@Param(yup.object()) data: any) {
    let contrato = await Contrato.getOne(data.id);
    if (!contrato) {
      throw new Error("Contrato nao existe!");
    }
    for (let i in contrato.lote) {
      if (!contrato.lote[i]) {
        throw new Error("Lote nao existe!");
      }
      if (contrato.lote[i].lote_id === data.lote_id) {
        return contrato.lote[i]
      }
    }
  }

  @Invokable()
  public async getHistoryTransaction(@Param(yup.object()) data: any) {
    let transaction = {}
    let contrato = await Contrato.getOne(data.id);
    let history: any[] = await contrato.history();

    for (let i = history.length - 1; i >= 0; i--) {
      for (let j = history[i].value.lote.length - 1; j >= 0; j--) {
        if (history[i].value.lote[j].lote_id === data.value.lote.lote_id && history[i].value.lote[j].asset_owner === data.value.lote.asset_owner) {
          let timestamp = new Date(this.toDate(history[i].timestamp.low))
          let participant = await Participant.getOne(history[i].value.lote[j].asset_owner)
          transaction = {txId: history[i].txId, timestamp: timestamp.toJSON(), asset_owner: history[i].value.lote[j].asset_owner, fingerprint: participant.identities[0].fingerprint, lote_id: history[i].value.lote[j].lote_id}
          return transaction
        }
      }
    }
  }



  // Update
  //-------

  @Invokable()
  public async updateLote(@Param(yup.string()) id: string, @Param(yup.object()) data: Lote) {
    let contrato = await Contrato.getOne(id);
    if (!contrato) {
      throw new Error("Contrato nao existe!");
    }
    function getIndex() {
      for (let index in contrato.lote) {
        if (contrato.lote[index].lote_id === data.lote_id) {
          return index
        }
      }
    }
    async function updateData() {
      let index = getIndex();
      if (data.asset_owner === "Compras") {
        contrato.lote[index].status_compras = "Pedido"
        contrato.lote[index].data_inicio_compras = data.data_inicio_compras
        contrato.lote[index].quantidade_compras = data.quantidade_compras
        contrato.lote[index].asset_owner = data.asset_owner
        await contrato.save()
        return contrato.lote[index]
      }
      if (data.asset_owner === "Fabricante") {
        contrato.lote[index].status_fabricante = data.status_fabricante
        contrato.lote[index].data_inicio_fabricante = data.data_inicio_fabricante
        contrato.lote[index].data_estimada_fabricante = data.data_estimada_fabricante
        contrato.lote[index].data_fim_fabricante = data.data_fim_fabricante
        contrato.lote[index].qualidade_fabricante = data.qualidade_fabricante
        contrato.lote[index].valida_quantidade_fabricante = data.valida_quantidade_fabricante
        contrato.lote[index].asset_owner = data.asset_owner
        await contrato.save()
        return contrato.lote[index]
      }
      if (data.asset_owner === "Transportadora") {
        contrato.lote[index].status_transportadora = data.status_transportadora
        contrato.lote[index].data_inicio_transportadora = data.data_inicio_transportadora
        contrato.lote[index].data_estimada_transportadora = data.data_estimada_transportadora
        contrato.lote[index].data_fim_transportadora = data.data_fim_transportadora
        contrato.lote[index].asset_owner = data.asset_owner
        await contrato.save()
        return contrato.lote[index]
      }
      if (data.asset_owner === "CD") {
        contrato.lote[index].status_cd = data.status_cd
        contrato.lote[index].valida_qualidade_cd = data.valida_qualidade_cd
        contrato.lote[index].data_inicio_cd = data.data_inicio_cd
        contrato.lote[index].data_estimada_cd = data.data_estimada_cd
        contrato.lote[index].data_fim_cd = data.data_fim_cd
        contrato.lote[index].asset_owner = data.asset_owner
        await contrato.save()
        return contrato.lote[index]
      }
      if (data.asset_owner === "Fornecedor") {
        contrato.lote[index].status_fornecedor = data.status_fornecedor
        contrato.lote[index].data_inicio_fornecedor = data.data_inicio_fornecedor
        contrato.lote[index].uniforme = []
        contrato.lote[index].asset_owner = data.asset_owner
        await contrato.save()
        return contrato.lote[index]
      }
    }
    updateData()
  }
  //-------------------------- UNIFORME --------------------------

  // Create
  //-------

  @Invokable()
  public async createUniforme(@Param(yup.string()) id: string, @Param(yup.string()) lote_id: string, @Param(yup.object()) uniforme: Uniforme) {
    let contrato = await Contrato.getOne(id);
    if (!contrato) {
      throw new Error("Contrato nao existe!");
    }
    for (let i = 0; i < contrato.lote.length; i++) {
      console.log(contrato.lote[i].asset_owner)
      if (contrato.lote[i].asset_owner !== "Fornecedor") {
        throw new Error(`${contrato.lote[i].asset_owner} nao pode inserir Uniformes!`);
      }
      if (contrato.lote[i].lote_id === lote_id) {
        for (let j = 0; j < contrato.lote[i].uniforme.length; j++) {
          if (contrato.lote[i].uniforme[j].rfid === uniforme.rfid) {
            throw new Error(`RFID ${contrato.lote[i].uniforme[j].rfid} ja existente!`);
          }
        }
        contrato.lote[i].uniforme.push(uniforme);
        await contrato.save();
        return contrato.lote[i].uniforme
      }
    }
  }

  // Update
  //-------

  @Invokable()
  public async updateUniforme(@Param(yup.string()) id: string, @Param(yup.string()) lote_id: string, @Param(yup.object()) uniforme: Uniforme) {
    let contrato = await Contrato.getOne(id);
    if (!contrato.id) {
      throw new Error("Contrato nao existe!");
    }
    async function updateData() {
      let indexL = getIndex();
      // if (contrato.lote[indexL].asset_owner !== "Fornecedor") {
      //   throw new Error(`${contrato.lote[indexL].asset_owner} nao pode atualizar Uniformes!`);
      // }
      for (let indexU in contrato.lote[indexL].uniforme)
        if (contrato.lote[indexL].uniforme[indexU].rfid === uniforme.rfid) {
          contrato.lote[indexL].uniforme[indexU].status = uniforme.status
          contrato.lote[indexL].uniforme[indexU].matricula = uniforme.matricula
          contrato.lote[indexL].uniforme[indexU].area = uniforme.area
          contrato.lote[indexL].uniforme[indexU].funcionario = uniforme.funcionario
          contrato.lote[indexL].uniforme[indexU].data = uniforme.data
          console.log(contrato.lote[indexL].uniforme[indexU].funcionario, indexL, indexU)
          await contrato.save(contrato.lote[indexL].uniforme[indexU])
          return contrato.lote[indexL].uniforme[indexU]
        }
      // contrato.lote[indexL].uniforme[indexU].rfid.patchValue(uniforme.rfid)
      // contrato.lote[indexL].uniforme[indexU].status.patchValue(uniforme.status)
      // contrato.lote[indexL].uniforme[indexU].funcionario.patchValue(uniforme.funcionario)
      // contrato.lote[indexL].uniforme[indexU].matricula.patchValue(uniforme.matricula)
      // contrato.lote[indexL].uniforme[indexU].area.patchValue(uniforme.area)
      // contrato.lote[indexL].uniforme[indexU].data.patchValue(new Date(uniforme.data))
      // await contrato.save();
      // return contrato.lote[indexL].uniforme[indexU]

    }
    updateData()

    function getIndex() {
      for (let indexL in contrato.lote) {
        if (contrato.lote[indexL].lote_id === lote_id)
          return indexL
      }
    }
  }
  //-------------------------- PARTICIPANTES --------------------------

  @Invokable()
  public async registerParticipant(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string

  ) {
    // Retrieve to see if exists
    const existing = await Participant.getOne(id);

    if (!existing || !existing.id) {
      let participant = new Participant();
      participant.id = id;
      participant.name = name || id;
      participant.msp = this.tx.identity.getMSPID();
      // Create a new identity
      participant.identities = [{
        fingerprint: this.sender,
        status: true
      }];
      console.log(JSON.stringify(participant));
      await participant.save();
    } else {
      throw new Error('Identity exists already, please call changeIdentity fn for updates');
    }
  }
  @Invokable()
  public async changeParticipantIdentity(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    newIdentity: string
  ) {
    // Check permissions
    let isAdmin = this.tx.identity.getAttributeValue('admin');
    console.log(this.tx.identity);
    console.log(isAdmin);
    let requesterMSP = this.tx.identity.getMSPID();

    // Retrieve to see if exists
    const existing = await Participant.getOne(id);
    console.log('Existing participant:');
    console.log(existing);
    if (!existing || !existing.id) {
      throw new Error('No identity exists with that ID');
    }

    console.log(`existing.msp=${existing.msp} requesterMSP=${requesterMSP}`);
    if (existing.msp != requesterMSP) {
      throw new Error('Unathorized. MSPs do not match');
    }

    console.log(`isAdmin=${isAdmin}`);
    if (!isAdmin) {
      throw new Error('Unathorized. Requester identity is not an admin');
    }

    // Disable previous identities!
    existing.identities = existing.identities.map(identity => {
      identity.status = false;
      return identity;
    });

    // Set the enrolling identity 
    existing.identities.push({
      fingerprint: newIdentity,
      status: true
    });
    await existing.save();
  }
  @Invokable()
  public async getOneParticipant(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Participant.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No identity exists with that ID ${id}`);
    }
    return existing;
  }

  toDate(timestamp) {
    const milliseconds = (timestamp) * 1000;
    return new Date(milliseconds);
  }

}
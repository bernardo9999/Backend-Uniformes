import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';


export class Uniforme extends ConvectorModel<Uniforme>{
  @ReadOnly()
  public readonly type = 'io.worldsibu.uniforme';

  @Validate(yup.string())
  @Required()
  public rfid: string;

  @Validate(yup.string())
  @Required()
  public status: string;

  @Validate(yup.string())
  @Required()
  public funcionario: string;

  @Validate(yup.string())
  @Required()
  public matricula: string;

  @Validate(yup.string())
  @Required()
  public area: string;

  @Validate(yup.string())
  @Required()
  public data: string;
}

export class Lote extends ConvectorModel<Lote>{
  @ReadOnly()
  public readonly type = 'io.worldsibu.lote';

  @Validate(yup.string())
  @Required()
  public lote_id: string;

  @Validate(yup.string())
  @Required()
  public status_compras: string;

  @Validate(yup.string())
  @Required()
  public status_fabricante: string;

  @Validate(yup.string())
  @Required()
  public status_transportadora: string;
  
  @Validate(yup.string())
  @Required()
  public status_cd: string;
  
  @Validate(yup.string())
  @Required()
  public status_fornecedor: string;
  
  @Validate(yup.number())
  @Required()
  public quantidade_compras: number;
  
  @Validate(yup.boolean())
  @Required()
  public valida_quantidade_fabricante: boolean;
  
  @Validate(yup.string())
  @Required()
  public qualidade_fabricante: string;

  @Validate(yup.boolean())
  @Required()
  public valida_qualidade_cd: boolean;
  
  @Validate(yup.string())
  @Required()
  public data_inicio_compras: string;
  
  @Validate(yup.string())
  @Required()
  public data_inicio_fabricante: string;
  
  @Validate(yup.string())
  @Required()
  public data_inicio_transportadora: string;

  @Validate(yup.string())
  @Required()
  public data_inicio_cd: string;

  @Validate(yup.string())
  @Required()
  public data_inicio_fornecedor: string;

  @Validate(yup.string().nullable())
  @Required()
  public data_fim_fabricante: string | null;
  
  @Validate(yup.string().nullable())
  @Required()
  public data_fim_transportadora: string | null;

  @Validate(yup.string().nullable())
  @Required()
  public data_fim_cd: string | null;
    
  @Validate(yup.string())
  @Required()
  public data_estimada_fabricante: string;

  @Validate(yup.string())
  @Required()
  public data_estimada_transportadora: string;
  
  @Validate(yup.string())
  @Required()
  public data_estimada_cd: string;

  @Validate(yup.string())
  @Required()
  public asset_owner: string;

  @Validate(yup.array(Uniforme.schema()))
  public uniforme: Array<FlatConvectorModel<Uniforme>>;

}

export class Contrato extends ConvectorModel<Contrato> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.uniformes';

  @Required()
  @Validate(yup.string())
  public id: string;

  @Validate(yup.array(Lote.schema()))
  public lote: Array<FlatConvectorModel<Lote>>;
}

// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Uniformes, UniformesController } from '../src';

describe('Uniformes', () => {
  let adapter: MockControllerAdapter;
  let uniformesCtrl: ConvectorControllerClient<UniformesController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    uniformesCtrl = ClientFactory(UniformesController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'UniformesController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Uniformes({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await uniformesCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Uniformes>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});
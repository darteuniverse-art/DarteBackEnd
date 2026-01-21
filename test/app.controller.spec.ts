import { Test } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController', () => {
  it('returns health status', async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    const appController = moduleRef.get(AppController);

    expect(appController.getHealth()).toEqual({ status: 'ok' });
  });
});

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './shared/controllers/base.controller';

@Controller()
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    return this.ok(this.appService.getHealth());
  }
}

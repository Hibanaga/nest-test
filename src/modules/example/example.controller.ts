import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  AppWelcome() {
    return this.exampleService.getHello();
  }
}

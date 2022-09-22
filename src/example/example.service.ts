import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  getHello() {
    return `Hello Server new version and new`;
  }
}

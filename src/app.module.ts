import { Module } from '@nestjs/common';
import { ExampleModule } from './example/example.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [ExampleModule, AuthModule, UserModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ExampleModule } from './example/example.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './services/db/db.service';
import { PubsubService } from './services/pubsub/pubsub.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DbService, PubsubService],
})
export class AppModule {}

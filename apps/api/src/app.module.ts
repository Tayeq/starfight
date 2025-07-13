import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PeopleModule } from './people/people.module';
import { StarshipsModule } from './starships/starships.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    PeopleModule,
    StarshipsModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { SprintModule } from './sprint/sprint.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { MessagesModule } from './messages/messages.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot(),
     TypeOrmModule.forRoot({
    type: 'postgres',
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // database: process.env.DB_NAME,
    // username: process.env.DB_USER ,
    // password: process.env.DB_PASSWORD,
    url:process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
     ssl: {
     rejectUnauthorized: false,
     },
  }),
     AuthModule,
     ProjectsModule,
     TasksModule,
     SprintModule,
     DiscussionsModule,
     MessagesModule,
     NotesModule,
     ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

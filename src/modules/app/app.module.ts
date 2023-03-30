import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

// locals
import '../../database/typeorm/polyfill';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { UserModule } from '../user/user.module';
import { getEnvPath } from '../../common/helper/env.helper';
import { TypeOrmConfigService } from '../../database/typeorm.service';
import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { IdExists } from '../../common/lib/decorator/exist.decorator';
import { Unique } from '../../common/lib/decorator/unique.decorator';
import { RoleModule } from '../role/role.module';

const envFilePath: string = getEnvPath(`${__dirname}/../../common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UserModule,
    AdminModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService, IdExists, Unique],
  exports: [],
})
export class AppModule {}

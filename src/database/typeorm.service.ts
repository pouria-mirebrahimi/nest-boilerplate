import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
// locals
import { jsonConfig } from '../common/helper/config.helper';
import { DataSource } from 'typeorm';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const Database: object = jsonConfig(
      this.config.get<string>('NODE_ENV'),
      this.config.get<string>('DATABASE'),
    );

    const typeOrmModuleOptions: TypeOrmModuleOptions = {
      type: Database['type'], // it can be <postgres> or <mssql>
      host: Database['host'],
      port: +Database['port'],
      database: Database['name'],
      username: Database['username'],
      password: Database['password'],
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never TRUE this in production!
      extra: {
        trustServerCertificate: true,
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const AppDataSource = new DataSource(
      typeOrmModuleOptions as SqlServerConnectionOptions,
    );

    return typeOrmModuleOptions;
  }
}

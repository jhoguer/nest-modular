import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    console.log(process.env.NODE_ENV);
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    console.log(apiKey, dbName);
    return `Hello World! ${process.env.NODE_ENV} ${apiKey} ${dbName} `;
  }
}

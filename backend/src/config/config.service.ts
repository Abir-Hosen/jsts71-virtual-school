import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const datasource: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'abir',
    password: '3323',
    database: 'assignment',
    autoLoadEntities: true,
    synchronize: true,
};

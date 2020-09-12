import { MigrationInterface, QueryRunner } from 'typeorm';
import { User, Role } from '../modules/user';
import { CryptoHelper, AppConfigKey, AppHelper } from '@solness/core';

export class DefaultSetup1567498401541 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    const password = CryptoHelper.hash(
      AppHelper.getConfig(AppConfigKey.DefaultUserPassword),
    );

    await queryRunner.manager.insert<User>('user', {
      enabled: true,
      createdUserId: 0,
      createdDatetime: new Date(),
      email: AppHelper.getConfig(AppConfigKey.DefaultUsername),
      password,
      firstName: 'Admin',
      lastName: 'User',
      role: Role.Admin,
    });
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager.delete<User>('user', {
      email: AppHelper.getConfig(AppConfigKey.DefaultUsername),
    });
  }
}

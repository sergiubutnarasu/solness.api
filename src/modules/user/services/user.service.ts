import { Injectable } from '@nestjs/common';
import {
  AppConfigKey,
  AppHelper,
  BaseService,
  CryptoHelper,
  EmailHelper,
  MailDataRequired,
  StringHelper,
  UserContext,
} from '@solness/core';
import { SelectQueryBuilder } from 'typeorm';
import { User } from '../objects';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService extends BaseService<User> {
  protected addAccessCondition(
    _user: UserContext,
    query: SelectQueryBuilder<User>,
  ): SelectQueryBuilder<User> {
    return query;
  }

  constructor(protected readonly repo: UserRepository) {
    super(repo);
  }

  public async create(user: UserContext, model: User): Promise<User> {
    const password = StringHelper.generateString(6, 12);
    model.password = CryptoHelper.hash(password);
    const result = await super.create(user, model);

    await this.sendPasswordEmail(model, password);
    return result;
  }

  private async sendPasswordEmail(model: User, password: string) {
    const mail: MailDataRequired = {
      subject: 'Core account',
      to: model.email,
      from: undefined,
      text: `${model.email} - ${password}`,
    };

    await EmailHelper.sendEmail(mail);
  }

  public async changePassword(
    userId: number,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.repo.findOne(userId);

    if (user) {
      user.password = CryptoHelper.hash(newPassword);
      this.repo.save(user);
      return true;
    }

    return false;
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.findOne({
      email: email,
      enabled: true,
    });
  }

  public async getUserAuthPayload(userId: number): Promise<UserContext> {
    const data = await this.repo.findOne(userId);

    return {
      email: data.email,
      id: data.id,
      role: parseInt(data.role),
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    };
  }
}

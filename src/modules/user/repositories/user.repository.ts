import { BaseRepository } from '@solness/core';
import { EntityRepository } from 'typeorm';
import { User } from '../objects';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}

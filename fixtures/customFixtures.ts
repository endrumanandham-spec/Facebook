import { test as base } from '@playwright/test';
import users from '../data/users.json';
import { ApiClient } from '../utils/apiClient';

export const test = base.extend<{
  user: { username: string; password: string };
  api: ApiClient;
}>({
  user: async ({}, use) => {
    await use(users[0]);
  },
  api: async ({}, use) => {
    const envConfig = require(`../config/${process.env.TEST_ENV || "dev"}.env.ts`).default;
    await use(new ApiClient(envConfig.baseURL));
  },
});

export const expect = test.expect;

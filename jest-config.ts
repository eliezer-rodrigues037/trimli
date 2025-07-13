/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tsConfig = require('./tsconfig.json');

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testEnvironment: 'node',
  testRegex: 'spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
      prefix: '<rootDir>/../..',
    }),
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)': '<rootDir>/test/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  globals: {
    PORT: 3000,
    ACCESS_TOKEN:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNTNlYWFkMi0wZDI5LTQ0ZDgtOTkzNy00ODAzYzE4YWMwMzMiLCJlbWFpbCI6ImJvYkBkZXYuY29tIiwiaWF0IjoxNzUyNDM4NzAxLCJleHAiOjQ5MDgxOTg3MDF9.sylU5ELTXvOyxumYi4qpjN8SOVriJov8MTHHIJW5ZTQ',
    EXPIRED_ACCESS_TOKEN: '',
    INVALID_ACCESS_TOKEN: '',
  },
};

export default jestConfig;

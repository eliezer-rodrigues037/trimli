import { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testEnvironment: 'node',
  testRegex: '.(spec|e2e-spec).ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
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

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  // moduleFileExtensions: ['js', 'json', 'ts'],
  // rootDir: '.',
  // testRegex: '.e2e-spec.ts$',
  // transform: {
  //   '^.+\\.(t|j)s$': 'ts-jest',
  // },
  // other configurations...
};

export default config;

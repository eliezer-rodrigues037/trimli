import 'jest';

declare module '@jest/types' {
  namespace Config {
    interface ConfigGlobals {
      PORT: number;
      ACCESS_TOKEN: string;
      EXPIRED_ACCESS_TOKEN: string;
      INVALID_ACCESS_TOKEN: string;
    }
  }
}

declare global {
  const PORT: number;
  const ACCESS_TOKEN: string;
  const EXPIRED_ACCESS_TOKEN: string;
  const INVALID_ACCESS_TOKEN: string;
}

export {};

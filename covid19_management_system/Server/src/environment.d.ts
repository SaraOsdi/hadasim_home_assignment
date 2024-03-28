declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      USER: string;
      PASS: string;
      DB: string;
      PORT: number;
      ACCESS_TOKEN_SECRET: Secret;
    }
  }
}

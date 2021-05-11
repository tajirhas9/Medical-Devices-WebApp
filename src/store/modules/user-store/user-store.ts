import { Module, VuexModule } from "vuex-module-decorators";

export interface User {
  id: number;
  email: string;
  token: string;
  tokenExpirationTime: string;
}

@Module
export default class UserModule extends VuexModule {
  // State
  user?: User = undefined;

  get userExists(): boolean {
    return this.user !== undefined;
  }
}

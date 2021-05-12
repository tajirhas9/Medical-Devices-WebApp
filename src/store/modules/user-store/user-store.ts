import { API_MAINPOINT } from "@/API";
import axios from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface IUser {
  id: number;
  email: string;
  token: string;
  tokenExpirationTime: string;
}

// An interface to map response.data coming from login `post` api
interface ILoginSuccessResponse {
  user: {
    id: number;
    email: string;
  };
  access_token: string;
  expires_in: string;
}

/**
 *
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 * %                                    %
 * %             User Module            %
 * %                                    %
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 */

@Module
export default class UserModule extends VuexModule {
  // State
  user?: IUser = undefined;

  /**
   *
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   * %                                    %
   * %             Getters                %
   * %                                    %
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   */

  // Getter
  get userExists(): boolean {
    return this.user !== undefined;
  }

  /**
   *
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   * %                                    %
   * %             Mutations              %
   * %                                    %
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   */

  @Mutation
  updateUserInfo(userInfo: IUser | undefined) {
    this.user = userInfo;
    if (userInfo !== undefined) localStorage.user = userInfo;
  }

  /**
   *
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   * %                                    %
   * %             Actions                %
   * %                                    %
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   */

  /**
   *
   * @param payload 1. email, 2. password
   * @returns a commit to updateUserInfo mutation on post success
   */
  // TODO: token expiration not handled
  @Action({ commit: "updateUserInfo" })
  async loginAction(payload: { email: string; password: string }) {
    try {
      const response = await axios.post(
        API_MAINPOINT + "login",
        JSON.stringify(payload),
        { headers: { "Content-Type": "application/json" } }
      );
      const responseData: ILoginSuccessResponse = response.data;
      // maps the response data to IUser interface
      const userInfo: IUser = {
        id: responseData.user.id,
        email: responseData.user.email,
        token: responseData.access_token,
        tokenExpirationTime: responseData.expires_in,
      };
      return userInfo;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   *
   * @returns a commit to updateUserInfo mutation
   * if user is found in localStorage
   *    -> that user is returned
   * else
   *    -> undefined
   */
  @Action({ commit: "updateUserInfo" })
  retrieveLocalUser() {
    if (localStorage.user) return localStorage.user;
    return undefined;
  }
}

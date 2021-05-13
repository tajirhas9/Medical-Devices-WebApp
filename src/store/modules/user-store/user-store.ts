import { API_MAINPOINT } from "@/networking";
import axios from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { UserService } from "../../../networking/index";

export abstract class AUser {
  abstract id: number;
  abstract email: string;
  abstract token: string;
  abstract tokenExpirationTime: string;
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
  user?: AUser = undefined;

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
    console.log("userExists()====user: " + JSON.stringify(this.user));
    return this.user !== undefined;
  }

  get userToken(): string {
    console.log("userToken()====user: " + this.user?.token);
    if (this.user !== undefined) {
      return this.user.token;
    }
    return "";
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
  updateUserInfo(userInfo: AUser | undefined) {
    this.user = userInfo;
    if (userInfo === undefined) localStorage.removeItem("user");
    else localStorage.user = JSON.stringify(userInfo);
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
      // login
      // if success, commit the new user to updateUserInfo
      const user: AUser = await UserService.login(payload);
      console.log("access token: " + user.token);
      return user;
    } catch (e) {
      console.log("Failed to login" + e);
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
    if (localStorage.user) {
      console.log("User info in localstorage: " + localStorage.user);
      try {
        const localUser: AUser = JSON.parse(localStorage.user);
        console.log("local userId: " + localUser.id);
        return localUser;
      } catch (e) {
        console.error(e);
      }
    }
    return undefined;
  }
}

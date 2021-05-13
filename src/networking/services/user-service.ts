import { API_MAINPOINT } from "../index";
import axios from "axios";
import { AUser } from "@/store/modules/user-store";
import { NotAuthorizedError } from "@/errors";

// An interface to map response.data coming from login `post` api
interface ILoginSuccessResponse {
  user: {
    id: number;
    email: string;
  };
  access_token: string;
  expires_in: string;
}

export class UserService {
  // POST Login
  static async login(payload: { email: string; password: string }) {
    try {
      const response = await axios.post(
        API_MAINPOINT + "login",
        JSON.stringify(payload),
        { headers: { "Content-Type": "application/json" } }
      );
      const responseData: ILoginSuccessResponse = response.data;
      // maps the response data to IUser interface
      const userInfo: AUser = {
        id: responseData.user.id,
        email: responseData.user.email,
        token: responseData.access_token,
        tokenExpirationTime: responseData.expires_in,
      };
      console.log("Access token: " + responseData.access_token);
      return userInfo;
    } catch (e) {
      throw new NotAuthorizedError();
    }
  }
}

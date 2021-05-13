import { API_MAINPOINT } from "../index";
import axios from "axios";
import { AModelType, AModelData } from "@/store/modules/device-store";
import { BadRequestError, NotAuthorizedError } from "@/errors";

abstract class AModelTypeResponse extends Array<AModelType> {}

abstract class AModelDataResponse extends Array<AModelData> {}

export class DeviceService {
  // GET/:  /overview/modeltype
  static async getModelType(token: string) {
    try {
      const response = await axios.get(API_MAINPOINT + "overview/modeltype", {
        headers: {
          authorization: token,
        },
      });
      const responseData: AModelTypeResponse = response.data;
      return responseData;
    } catch (e) {
      console.error(e);
      if (e.response.status == 401) throw new NotAuthorizedError();
      throw e;
    }
  }

  // GET/:  /overview/modeldata/{brandname}/{modelName}
  static async getModelData(
    token: string,
    brandName: string,
    modelName: string
  ) {
    try {
      const url =
        API_MAINPOINT + "overview/modeldata/" + brandName + "/" + modelName;
      console.log("GET/ : " + url);
      const response = await axios.get(url, {
        headers: {
          authorization: token,
        },
      });
      const responseData: AModelDataResponse = response.data;
      return responseData;
    } catch (e) {
      console.error(e);
      if (e.response.status == 401) throw new NotAuthorizedError();
      throw e;
    }
  }

  static async getLastType(token: string): Promise<number> {
    try {
      const url = API_MAINPOINT + "devicetype?limit=40&page=1";
      console.log("GET/ : " + url);
      const response = await axios.get(url, {
        headers: {
          authorization: token,
        },
      });
      const responseData = response.data;
      console.log("last type-id: " + responseData[1]);
      return responseData[1] + 1;
    } catch (e) {
      console.error(e);
      if (e.response.status == 401) throw new NotAuthorizedError();
      throw e;
    }
  }

  static async addNewDevice(
    token: string,
    BrandId: string,
    Name: string,
    TypeId: number,
    Comment: string
  ) {
    try {
      const payload = JSON.stringify({
        BrandId: BrandId,
        Name: Name,
        TypeId: TypeId,
        Comment: Comment,
      });
      const url = API_MAINPOINT + "devicemodel";
      console.log(url);
      console.log(payload);
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      console.log(JSON.stringify(response.status));
      return true;
    } catch (e) {
      console.log("Failed to create new device.." + JSON.stringify(e));
      throw new BadRequestError();
    }
  }
}

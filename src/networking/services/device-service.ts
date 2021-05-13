import { API_MAINPOINT } from "../index";
import axios from "axios";
import { AModelType, AModelData } from "../../store/modules/device-store";

abstract class IModelTypeResponse extends Array<AModelType> {}

abstract class IModelDataResponse extends Array<AModelData> {}

export class DeviceService {
  // GET/:  /overview/modeltype
  static async getModelType(token: string) {
    try {
      const response = await axios.get(API_MAINPOINT + "overview/modeltype", {
        headers: {
          authorization: token,
        },
      });
      const responseData: IModelTypeResponse = response.data;
      return responseData;
    } catch (e) {
      console.error(e);
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
      const responseData: IModelDataResponse = response.data;
      return responseData;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

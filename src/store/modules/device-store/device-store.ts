import { DeviceService } from "@/networking";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export abstract class AModelData {
  abstract Id: number;
  abstract DataType: string;
  abstract Brand: string;
  abstract Model: string;
  abstract Name: string;
  abstract DisplayName: string;
  abstract Description: string;
  abstract Status: string | null;
  abstract GroupId: string | null;
  abstract ProtocolOrder: number;
}
export abstract class AModelType {
  abstract Id: number;
  abstract BrandId: string;
  abstract Name: string;
  abstract TypeId: number;
  abstract Comment: string | null;
  abstract Description: string | null;
}

abstract class AModel {
  abstract type: AModelType;
  abstract data: Array<AModelData>;
}

abstract class AModels {
  abstract Models: Array<AModel>;
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
export default class DeviceModule extends VuexModule {
  // State
  modeTypes?: Array<AModelType> = undefined;
  modelData?: Array<AModelData> = undefined;
  /**
   *
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   * %                                    %
   * %             Getters                %
   * %                                    %
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   */
  get modelTypes(): Array<AModelType> {
    if (this.modeTypes === undefined) return [];
    return this.modeTypes;
  }
  get modelDataList(): Array<AModelData> {
    if (this.modelData === undefined) return [];
    return this.modelData;
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
  updateModelTypeList(newDevices: Array<AModelType> | undefined) {
    this.modeTypes = newDevices;
  }

  @Mutation
  updateModelDataList(newDataList: Array<AModelData> | undefined) {
    this.modelData = newDataList;
  }
  /**
   *
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   * %                                    %
   * %             Actions                %
   * %                                    %
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   */
  @Action({ commit: "updateModelTypeList" })
  async getAllModelTypes(token: string) {
    try {
      const modelTypes: Array<AModelType> = await DeviceService.getModelType(
        token
      );
      return modelTypes;
    } catch (e) {
      console.error(e);
    }
  }

  @Action({ commit: "updateModelDataList" })
  async getModelData(payload: {
    token: string;
    brandName: string;
    modelName: string;
  }) {
    try {
      const modelData: Array<AModelData> = await DeviceService.getModelData(
        payload.token,
        payload.brandName,
        payload.modelName
      );
      return modelData;
    } catch (e) {
      console.error(e);
    }
  }

  @Action({})
  async addNewDevice(payload: {
    token: string;
    BrandId: string;
    Name: string;
    Comment: string;
  }) {
    try {
      const newTypeId = await DeviceService.getLastType(payload.token);
      const response = await DeviceService.addNewDevice(
        payload.token,
        payload.BrandId,
        payload.Name,
        newTypeId,
        payload.Comment
      );
    } catch (e) {
      console.log(e);
    }
  }
}

import Vue from "vue";
import Vuex from "vuex";
import UserModule from "./modules/user-store";
import DeviceModule from "./modules/device-store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: UserModule,
    device: DeviceModule,
  },
});

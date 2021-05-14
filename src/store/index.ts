import Vue from "vue";
import Vuex from "vuex";
import UserModule from "./modules/user-store";
import DeviceModule from "./modules/device-store";

Vue.use(Vuex);

/**
 * user module is used for authentication and user info
 * device module is used for REST operation on devices
 */

export default new Vuex.Store({
  modules: {
    user: UserModule,
    device: DeviceModule,
  },
});

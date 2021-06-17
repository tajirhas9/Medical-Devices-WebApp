import Home from "@/views/Home.vue";
import Vuex from "vuex";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);

const $router = {
  push: jest.fn(),
};

jest.mock("axios", () => ({
  post: (_url, _body) => {
    console.log("mock axios post");
    switch (_url) {
      case "http://163.47.115.230:30000/api/login":
        return new Promise((resolve) => {
          const response = {
            status: 200,
            data: {
              user: {
                id: 6,
                email: "Mozell.Jacobi@yahoo.com",
              },
              access_token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImVtYWlsIjoiTW96ZWxsLkphY29iaUB5YWhvby5jb20iLCJpYXQiOjE2MjM5MjAwNjIsImV4cCI6MTYyNDAwNjQ2Mn0.nB9qNg9Bqmqaw7oytEzBoAzWdNZIgEohmtVx1OPJ4TY",
              expires_in: "24h",
            },
          };
          resolve(response);
        });
    }
  },
}));

describe("Login Test", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        user: {
          state: {
            user: undefined,
          },
          mutations: {
            updateUserInfo(state, value) {
              state.user = value;
            },
          },
          actions: {
            loginAction({ commit }, payload) {
              commit("updateUserInfo", payload);
            },
            retrieveLocalUser({ commit }) {},
          },
          getters: {
            userExists(state) {
              return state.user !== undefined;
            },
          },
        },
      },
    });

    wrapper = shallowMount(Home, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });
  });
  afterAll(() => {
    wrapper.destroy();
  });

  it("should render view", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("should render necessary input fields", () => {
    // Email
    expect(wrapper.find("[test-id='email-label']").text()).toBe("Email");
    expect(wrapper.find("[test-id='email-input']").exists()).toBe(true);

    // Password
    expect(wrapper.find("[test-id='password-label']").text()).toBe("Password");
    expect(wrapper.find("[test-id='password-input']").exists()).toBe(true);

    // Button
    expect(wrapper.find("[test-id='login-button']").text()).toBe("Login");
  });

  it("should login successfully", async () => {
    expect(wrapper.vm.$store.getters.userExists).toBeFalsy();
    const loginButton = wrapper.find("[test-id='login-button']");
    await loginButton.trigger("click");
    expect(wrapper.vm.$store.getters.userExists).toBeTruthy();
    expect(wrapper.vm.showError).toBeFalsy();
  });
});

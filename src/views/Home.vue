<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row class="overflow-auto">
        <NavBar :showLogout="false" />

        <!--

          Holds the login form

        -->
        <b-row style="margin-top: 50px" class="d-flex justify-content-center">
          <!--Heading-->
          <b-row>
            <h3>Login to continue</h3>
          </b-row>
          <!--
            Warning for failed login
          -->
          <b-row v-if="showError">
            <b-alert show variant="danger">Wrong email or password</b-alert>
          </b-row>

          <!--
            Form
          -->
          <b-row
            class="text-center"
            style="padding-bottom: 30px; padding-top: 30px"
          >
            <b-col></b-col>
            <!--
              email
              -->
            <b-col cols="8"
              ><b-row>
                <b-col> <label for="email">Email</label></b-col>
                <b-col>
                  <b-form-input
                    id="email"
                    v-model="email"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    trim
                  ></b-form-input
                ></b-col> </b-row
            ></b-col>
            <b-col></b-col>
          </b-row>
          <b-row class="text-center" style="padding-bottom: 30px">
            <b-col></b-col>
            <!--
              password
            -->
            <b-col cols="8"
              ><b-row>
                <b-col>
                  <label for="password">Password</label>
                </b-col>
                <b-col>
                  <b-form-input
                    id="password"
                    v-model="password"
                    type="password"
                    name="password"
                    trim
                  ></b-form-input
                ></b-col> </b-row
            ></b-col>
            <b-col></b-col>
          </b-row>

          <b-row class="text-center">
            <b-col cols="5"></b-col>
            <b-col cols="3">
              <b-button variant="primary" class="mt-3" block @click="login"
                >Login</b-button
              ></b-col
            >
            <b-col></b-col>
          </b-row>
        </b-row>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NavBar from "@/components/nav-bar.vue";

@Component({
  components: {
    NavBar,
  },
})
export default class Home extends Vue {
  email = "";
  password = "";
  error = false; // true if login fails

  get showError() {
    return this.error;
  }

  set showError(value) {
    this.error = value;
  }

  async login(): Promise<void> {
    /**
     * Dispatches action to login.
     */
    this.showError = false;
    await this.$store.dispatch("loginAction", {
      email: this.email,
      password: this.password,
    });
    if (this.$store.getters.userExists) {
      /**
       * Redirect on login success
       */
      this.$router.push("/show-devices");
    } else {
      /**
       * Show error msg on login fail
       */
      this.showError = true;
    }
  }

  beforeMount() {
    this.showError = false;
    //Checking if local user exists...
    this.$store.dispatch("retrieveLocalUser").then(() => {
      // redirect if exists
      if (this.$store.getters.userExists) {
        this.$router.push("/show-devices");
      }
    });
  }
}
</script>

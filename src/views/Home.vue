<template>
  <div class="home">
    <form
      id="app"
      @submit="login"
      
    >

      <p>
        <label for="email">´Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
        >
      </p>

      <p>
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
        >
      </p>

      <p>
        <input
          type="submit"
          value="Submit"
        >
      </p>

    </form>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserModule from '@/store/modules/user-store'

@Component({
  components: {
  },
})
export default class Home extends Vue {
  email = "";
  password = "";
  userStore: UserModule = this.$store.state.user;
  userExists: boolean = this.$store.getters.userExists;

  login(): void {
    console.log("email: " + this.email);
    console.log("passord: " + this.password);
  }
}
</script>

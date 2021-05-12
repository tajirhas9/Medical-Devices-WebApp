<template>
  <div class="home">
    <p>User Logged in: {{this.$store.getters.userExists}}</p>
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
        <button @click="login">Login</button>
      </p>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Home extends Vue {
  email = "";
  password = "";

  async login(): Promise<void> {
    await this.$store.dispatch('loginAction', {email: this.email, password: this.password})
    if(this.$store.getters.userExists) {
      this.$router.push('/about')
    }
  }

  beforeMount() {
    //Checking if local user exists...
    this.$store.dispatch('retrieveLocalUser').then(()=> {
      // redirect if exists
      if(this.$store.getters.userExists) {
        this.$router.push('/about')
      }
    })
    
  }
}
</script>

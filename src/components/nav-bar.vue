<template>
  <b-navbar toggleable type="dark" variant="dark" fixed="top">
    <b-navbar-brand href="#">MediSite</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item href="#" class="text-end" @click="logout" v-if="showLogout"
        >Log Out</b-nav-item
      >
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  @Prop() private showLogout!: boolean;
  logout() {
    this.$store.dispatch("logoutAction").then(() => this.$router.push("/"));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

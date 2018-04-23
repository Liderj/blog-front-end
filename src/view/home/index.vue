<template>
  <v-container fluid fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center justify-center>
        <img src="@/assets/logo.png">
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      page: 0,
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(
      page = this.page,
      category = this.$route.query.category || null,
      search = this.$route.query.category
    ) {
      this.page++;
    }
  },
  watch: {
    $route(to, from) {
      this.page = 0;
      this.getList();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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

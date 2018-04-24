<template>
  <v-app>
    <v-navigation-drawer class="hidden-sm-and-up" fixed app v-model="drawer" style="width:120px">
      <v-list dense>
        <v-list-tile :value="category ==item.id" v-for="(item, i) in items" :key="i" @click="selectCategory(item.id,search)">
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name" class="text-xs-center"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue darken-3" class="pl-0 " dark app fixed>
      <div class="container pl-0 pt-0 pb-0 pr-0">
        <v-layout align-center>
          <v-toolbar-title class="ml-0">
            <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down">
              <img src="@/assets/logo.png" style="width:20px"> V博
            </span>
          </v-toolbar-title>
          <v-flex class="pl-2 hidden-sm-and-down">
            <v-layout>
              <div v-for="(item, i) in items" @click="selectCategory(item.id,search)" :key="i" class="pl-4 nav" :style="{color:category ==item.id?'#42A5F5':''}">
                {{item.name}}
              </div>
            </v-layout>

          </v-flex>
          <v-flex class="pl-1">
            <v-text-field clearable flat solo-inverted prepend-icon="search" label="搜索微博或文章" v-model="search" :prepend-icon-cb="selectCategory(category,search)"></v-text-field>
          </v-flex>
          <v-btn icon align-end>
            <v-icon>face</v-icon>
          </v-btn>
        </v-layout>
      </div>
    </v-toolbar>
    <div class="container">
      <router-view></router-view>
      <v-speed-dial class="hidden-sm-and-up" v-model="fab" :bottom="true" :right="true" direction="top">
        <v-btn slot="activator" color="blue darken-2" dark fab hover v-model="fab">
          <v-icon>widgets</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn fab dark small color="green">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo">
          <v-icon>add</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>
    <v-footer :fixed="fixed" app>
      <v-layout row justify-center>
        <span>&copy; 2018 张雄风</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      fixed: false,
      category: null,
      showTop: true,
      search: null,
      fab: false,
      items: [
        {
          id: null,
          name: "全部分类"
        }
      ],
      title: "V博"
    };
  },
  name: "App",
  created() {
    this.getCategory();
  },
  methods: {
    selectCategory(id, search = this.search) {
      this.category = id;
      id
        ? this.$router.push("/?category=" + id + "&search=" + search)
        : this.$router.push("/?search=" + search);
    },
    getCategory() {
      this.axios.get("/api/front-end/category").then(res => {
        if (res.code == 200) {
          this.items = this.items.concat(res.data.filter(v => v.id != 2));
          this.items.push(res.data.filter(v => v.id == 2)[0]);
        }
      });
    }
  }
};
</script>
<style scoped>
.container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  padding: 0;
}
.nav {
  cursor: pointer;
}
.speed-dial {
  position: absolute;
  bottom: 40px;
}
</style>

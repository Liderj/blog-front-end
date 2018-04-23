<template>
  <v-app>
    <v-navigation-drawer
     class="hidden-sm-and-up"
      fixed
      app
      v-model="drawer"
      style="width:120px"
    >
    <v-list dense >
        <v-list-tile
          :value="category ==item.id"
          v-for="(item, i) in items"
          :key="i"
          @click="selectCategory(item.id,search)"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name" class="text-xs-center"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar v-if="showTop"  color="blue darken-3" class="pl-0 " 
      dark
      app
      fixed>
        <v-layout row wrap>
          <v-flex md8 offset-md2  xs12>
              <v-layout align-center>
                <v-toolbar-title  class="ml-0 pl-2">
                  <v-toolbar-side-icon  class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                  <span class="hidden-sm-and-down">
                    <img src="@/assets/logo.png" style="width:20px">
                    V博
                    </span>
                </v-toolbar-title>
                <v-flex class="pl-2 hidden-sm-and-down">
                  <v-layout >
                    <div v-for="(item, i) in items"  @click="selectCategory(item.id,search)" :key="i" class="pl-4 nav" :style="{color:category ==item.id?'#42A5F5':''}">
                      {{item.name}}
                    </div>
                  </v-layout>
                 
                </v-flex>                
                <v-flex  class="pl-1">
                  <v-text-field
                    clearable
                    flat
                    solo-inverted
                    prepend-icon="search"
                    label="搜索微博或文章"
                    v-model="search"
                   :prepend-icon-cb="selectCategory(category,search)"
                  ></v-text-field>
                </v-flex>
                <v-btn icon  align-end>
                  <v-icon>face</v-icon>
                </v-btn>
              </v-layout>
          </v-flex>
        </v-layout>
    </v-toolbar>
    <!-- <v-content > -->
       <v-container fluid fill-height>
           <v-layout row wrap>
            <v-flex md8 offset-md2  xs12>
              <router-view></router-view>
            </v-flex>
           </v-layout>
    </v-container>
    <!-- </v-content> -->
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
.nav {
  cursor: pointer;
}
</style>

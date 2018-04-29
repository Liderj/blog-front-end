<template>
  <v-app>
    <v-navigation-drawer class="hidden-sm-and-up" fixed app v-model="drawer" style="width:120px">
      <v-list dense>
        <v-list-tile :value="$route.query.category ==item.id" v-for="(item, i) in items" :key="i" @click="selectCategory(item.id)">
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name" class="text-xs-center"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar v-if="$store.state.showTop" color="blue darken-3" class="pl-0 " dark app fixed>
      <div class="container pl-0 pt-0 pb-0 pr-0">
        <v-layout align-center>
          <v-toolbar-title class="ml-0">
            <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down">
              <img src="@/assets/logo.png" style="width:20px"> V博
            </span>
          </v-toolbar-title>
          <v-flex class="pl-2 hidden-md-and-down">
            <v-layout>
              <div v-for="(item, i) in items" @click="selectCategory(item.id)" :key="i" class="pl-4 nav" :style="{color:$route.query.category ==item.id?'#42A5F5':''}">
                {{item.name}}
              </div>
            </v-layout>

          </v-flex>
          <v-flex class="pl-1">
            <v-text-field  flat solo-inverted append-icon="search" label="搜索微博或文章" v-model="search" :append-icon-cb="searchPost"></v-text-field>
          </v-flex>
           <v-btn icon class="pl-1" @click="$router.push('/login')" v-if="!$store.state.user"> 登录</v-btn>
           <v-menu v-else offset-y>
              <v-btn icon slot="activator">
                <v-icon v-if="!$store.state.user.avatar">face</v-icon>
                 <v-avatar
                    v-else
                    size="30"
                    class="grey lighten-4"
                  >
                    <img :src="$store.state.user.avatar" alt="avatar">
                  </v-avatar>
                </v-btn>
              <v-list >
                <v-list-tile v-for="(item,i) in actions" :key="i">
                  <v-list-tile-title> <router-link :to="item.url" class="link"> {{ item.name }}</router-link></v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
        </v-layout>
      </div>
    </v-toolbar>
    <div class="container" :style="contentPadding">
      <v-progress-circular class="loading" v-if="$store.state.loading" indeterminate color="primary"></v-progress-circular>
      <router-view></router-view>
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
      actions: [
        {
          url: "",
          name: "发布微博"
        },
        {
          url: "",
          name: "发布文章"
        },
        {
          url: "",
          name: "我的主页"
        },
        {
          url: "",
          name: "修改资料"
        },
        {
          url: "",
          name: "修改密码"
        }
      ],
      title: "V博"
    };
  },
  name: "App",
  created() {
    console.log(this.$store);
    this.getCategory();
  },
  computed: {
    contentPadding() {
      let a = {
        paddingBottom: "36px",
        paddingTop: "80px"
      };
      if (document.body.clientWidth < 960) {
        a.paddingTop = "65px";
        a.paddingLeft = "10px";
        a.paddingRight = "10px";
      }
      return a;
    }
  },
  methods: {
    selectCategory(id) {
      this.category = id;
      id ? this.$router.push("/?category=" + id) : this.$router.push("/");
    },
    getCategory() {
      this.axios.get("/api/front-end/category").then(res => {
        if (res.code == 200) {
          this.items = this.items.concat(res.data.filter(v => v.id != 2));
          this.items.push(res.data.filter(v => v.id == 2)[0]);
        }
      });
    },
    searchPost() {
      if (!this.search) {
        return false;
      }
      this.category
        ? this.$router.push(
            "/?category=" + this.category + "&search=" + this.search
          )
        : this.$router.push("/?search=" + this.search);
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
.link {
  color: #000;
  text-decoration: none;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

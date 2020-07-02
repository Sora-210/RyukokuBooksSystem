<template>
  <v-app>
    <v-navigation-drawer
      id="nav"
      v-model="navDrawer"
      app
    >
    <v-list>
      <div v-for="nav in this.navList" :key="nav.item">
        <NavItem
          :name="nav.name"
          :url="nav.url"
          :icon="nav.icon"
        >
        </NavItem>
      </div>
      <v-divider>
      </v-divider>
      <router-link to="/admin/lending">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>fas fa-users-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            貸出管理
          </v-list-item-title>
        </v-list-item>
      </router-link>
      <!-- <router-link to="/ncd">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>fas fa-tags</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            NCD管理
          </v-list-item-title>
        </v-list-item>
      </router-link> -->
      <router-link to="/admin/collections">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>fas fa-book</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            蔵書管理
          </v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/admin/requests">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>fas fa-envelope-open-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            リクエスト管理
          </v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/statistics">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>fas fa-chart-pie</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            統計
          </v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/setting">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>fas fa-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            設定
          </v-list-item-title>
        </v-list-item>
      </router-link>
      <v-divider>
      </v-divider>
      <v-list-item>
        <v-btn
          color="success"
        >
          管理者Login<v-icon>fas fa-sign-in-alt</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="primary"
      app
      dark
    >
      <v-app-bar-nav-icon
        @click="navDrawer = !navDrawer"
      >
        <v-icon>
          fas fa-bars
        </v-icon>
      </v-app-bar-nav-icon>
      <router-link
        to="/">
        <v-toolbar-title>
          RyukokuBooksSystem
        </v-toolbar-title>
      </router-link>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer
      color="primary"
      dark
      app
    >
      @2020 岡山龍谷高等学校図書委員会
    </v-footer>
  </v-app>
</template>

<script>
import NavItem from "./components/NavItem.vue";

export default {
  name: 'App',
  components: {
    NavItem
  },
  data: () => ({
    navDrawer : true,
    navList: [
      {
        name:"Home",
        url:"/",
        icon:"fas fa-home"
      },
      {
        name:"検索",
        url:"/search",
        icon:"fas fa-search"
      },
      {
        name:"QR",
        url:"/qrcodereader",
        icon:"fas fa-qrcode"
      },
      {
        name:"リクエスト",
        url:"/request",
        icon:"fas fa-envelope"
      }
    ]
  }),
};
</script>

<style>
.v-toolbar__title {
  color:white;
}
a {
  text-decoration: none;
}
</style>
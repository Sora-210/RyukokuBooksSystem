<template>
  <v-app>
    <v-navigation-drawer
      id="nav"
      v-model="navDrawer"
      app
    >
    <v-list>
      <router-link to="/">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>fas fa-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            Home
          </v-list-item-title>
        </v-list-item>
      </router-link>
      <!-- <router-link to="/search">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>fas fa-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            検索
          </v-list-item-title>
        </v-list-item>
      </router-link> -->
      <router-link to="/request">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>fas fa-envelope-open-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            リクエスト
          </v-list-item-title>
        </v-list-item>
      </router-link>
      <v-divider>
      </v-divider>
      <router-link to="/admin">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>fas fa-users-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            管理ページ
          </v-list-item-title>
        </v-list-item>
      </router-link>
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
      @2020 sora210.dev 
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    navDrawer : true
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
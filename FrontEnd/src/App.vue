<template>
  <v-app>
    <v-navigation-drawer id="nav" v-model="isNavDrawer" app>
    <v-list>
      <div v-for="navItem in this.navList" :key="navItem.item">
        <NavItem :name="navItem.name" :url="navItem.url" :icon="navItem.icon">
        </NavItem>
      </div>
      <v-divider>
      </v-divider>
      <div v-if="token">
        <div v-for="adminNavItem in this.adminNavList" :key="adminNavItem.item">
          <NavItem :name="adminNavItem.name" :url="adminNavItem.url" :icon="adminNavItem.icon">
          </NavItem>
        </div>
      </div>
      <v-divider>
      </v-divider>
      <v-list-item>
        <v-btn v-if="!token" color="success" @click="login">
          管理者Login<v-icon>fas fa-sign-in-alt</v-icon>
        </v-btn>
        <v-btn v-else color="red" dark @click="logout">
          Logout<v-icon>fas fa-sign-in-alt</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" app dark>
      <v-app-bar-nav-icon @click="isNavDrawer = true">
        <v-icon>fas fa-bars</v-icon>
      </v-app-bar-nav-icon>
      <router-link to="/">
        <v-toolbar-title>
          RyukokuBooksSystem
        </v-toolbar-title>
      </router-link>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view @error="onErrorDialog" @success="onSuccessDialog"></router-view>
      </v-container>
    </v-main>
    <v-footer color="primary" dark app>
      @2020 岡山龍谷高等学校図書委員会
    </v-footer>
    <v-dialog v-model="errorDialog.status" width="70%">
      <v-card>
        <v-card-title id="errorTitle">
          <v-icon color=red>fas fa-exclamation-circle</v-icon>ERROR
        </v-card-title>
        <v-card-text>
          {{ errorDialog.message}}
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="successDialog.status" width="70%">
      <v-card>
        <v-card-title id="successTitle">
          <v-icon color=success>fas fa-exclamation-circle</v-icon>SUCCESS
        </v-card-title>
        <v-card-text>
          {{ successDialog.message}}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import NavItem from "./components/NavItem.vue";
export default {
  name: 'App',
  components: {
    NavItem
  },
  computed: {
    token: function() {
      return this.$store.getters.token
    }
  },
  methods: {
    login: function() {
      this.$router.push('/login')
    },
    logout: function() {
      this.$store.commit('removeToken')
      this.onSuccessDialog('ログアウトしました')
      this.$router.push('/')
    },
    onSuccessDialog: function(message) {
      this.successDialog.status = true
      this.successDialog.message = message
    },
    onErrorDialog: function(message) {
      this.errorDialog.status = true
      this.errorDialog.message = message
    }
  },
  data: () => ({
    successDialog:{
      status:false,
      message:"処理が完了しました"
    },
    errorDialog:{
      status:false,
      message:"エラーが発生しました"
    },
    isNavDrawer:true,
    isTest:true,
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
    ],
    adminNavList: [
      {
        name:"貸出管理",
        url:"/admin/rentals",
        icon:"fas fa-users-cog"
      },
      {
        name:"蔵書管理",
        url:"/admin/collections",
        icon:"fas fa-book"
      },
      {
        name:"リクエスト管理",
        url:"/admin/requests",
        icon:"fas fa-envelope-open-text"
      },
      {
        name:"設定",
        url:"/admin/setting",
        icon:"fas fa-cog"
      },
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
<style scoped>
#errorTitle {
  color:red;
}
#successTitle {
  color:green;
}
</style>
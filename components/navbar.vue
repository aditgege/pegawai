<template>
  <div>
    <b-navbar type="dark" variant="dark" toggleable>
      <div class="container">
        <b-navbar-toggle target="nav_dropdown_collapse"  @click="showSidebar = !showSidebar"></b-navbar-toggle>
        <div class="mr-auto ml-3"> <p style="color:white; margin:0px; font-weight:bold">{{ nama }}</p></div>
      </div>
    </b-navbar>
    <div class="black-box" :class="{ active:showSidebar}" @click="showSidebar = false" ></div>
    <div class="sidebar" :class="{ active:showSidebar}">
      <div class="btn-close" ><i class="el-icon-close"  @click="showSidebar = !showSidebar"></i></div>
        <div class="col-12 menu">
          <template v-if="authenticated">
            <li class="nav-item" v-for="menu in menus" :key="menu.index" @click="showSidebar = !showSidebar">
              <nuxt-link class="nav-link" :to="menu.link"><i :class="menu.icon"></i>{{ menu.nmmenu}}</nuxt-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="signOut"><i class="el-icon-circle-close-outline"></i>Logout</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Login</nuxt-link>
            </li>
            <!-- <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">Register</nuxt-link>
            </li> -->
          </template>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      nama:this.$auth.user.nmpegawai,
      showSidebar:false,
      menus:[
        { nmmenu:'Kerjaan', link:'/' , icon:'el-icon-bell'},
        { nmmenu:'Pembelian', link:'/pembelian' , icon:'el-icon-bell'},
        { nmmenu:'Profile', link:'/profile' ,icon:'el-icon-mobile-phone'},
      ]
    }
  },
    methods: {
        signOut() {
            this.$auth.logout();
            this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/login');
        }
    }
}
</script>
<style scoped>
    .navbar{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background-color:black;
        z-index: 2;
    }
    .sidebar.active{
        box-shadow: 2px 10px 12px rgba(0,0,0,.3);
        background-color:#343a40 !important;
        width: 200px;
        position: fixed;
        height: calc(100% - 56px);
        z-index: 9;
        left: 0;
        top:auto;
        transition: .5s;
        overflow-x:hidden

    }
    .sidebar{
        top:auto;
        width: 200px;
        position: fixed;
        left: -250px;
        transition: .5s;
        height: calc(100% - 56px);
        z-index: 9;
    }
    .sidebar li{
        list-style: none;
        color: white;
        text-decoration: none;
        margin-top: 15px;
        font-size: 17px;
        
    }
    .sidebar i{
      margin-right: 15px;
    }
    a{
      color: white;
    }
    a:hover{
      color: #2ecc71;
    }
    .black-box.active{
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 8;
      background-color: black;
      opacity: .5;
      transition: .5s;
    }
    .black-box{
      width: 100%;
      height: 100%;
      background: #000;
      background-color: #000;
      position: fixed;
      opacity: 0;
      z-index: -1;
      top: 0;
      left: 0;
    }
    .btn-close{
      float: right;
      color:white;
      font-weight: bold;
      margin:10px;
      font-size:20px;
    }
    .menu{
      display: block;
      margin-top: 100px;
    }
    
</style>

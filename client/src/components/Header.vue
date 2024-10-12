<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <li><router-link :to="{ name: 'blogs' }">Product</router-link></li>
 
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        <!-- <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div> -->
        <li class="right">
   
 
 
 <!-- ใช้ router-link สำหรับ Logout แต่เพิ่ม @click เพื่อเรียกใช้ฟังก์ชัน logout -->
 <router-link :to="{ name: 'login' }" @click.native="logout">Logout</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
 
<script>
export default {
  methods: {
    isLogin() {
      const status = this.$store.getters.isUserLoggedIn;
    },
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setBlog', null);
    }
  },
};
</script>
 
 
<style scoped>
.nv-navbar {
  background: linear-gradient(135deg, #f6d365, #fda085);
  width: 100%;
  padding: 15px 0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
 
.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
 
.nv-navbar .nav li {
  margin: 0 10px;
}
 
.nv-navbar .nav li.right {
  margin-left: auto; /* จัดปุ่ม Logout/Login ให้อยู่ทางขวา */
}
 
.nv-navbar .nav li a,
.nv-navbar .btn-logout {
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}
 
.nv-navbar .nav li a:hover,
.nv-navbar .btn-logout:hover {
  background-color: rgba(255, 255, 255, 0.3);
  color: #222;
}
 
.nv-navbar .nav li a.router-link-active {
  background-color: #f9a826;
  color: white;
}
 
.btn-logout {
  background-color: #f9a826;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
 
.btn-logout:hover {
  background-color: #d4881f;
}
 
</style>
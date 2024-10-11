<template>
  <div class="login-container">
    <h1>User Login</h1>
    <form v-on:submit.prevent="onLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          required
        />
      </div>
      <button type="submit" class="btn">Login</button>
      <div class="error" v-if="error">{{ error }}</div>
    </form>
    <!-- เพิ่มปุ่มเพื่อไปยังหน้าสร้างผู้ใช้ใหม่ -->
    <button @click="navigateToAddUser" class="btn-add-user">Register</button>
  </div>
</template>
 
<script>
import AuthenService from "../services/AuthenService";
 
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });
 
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
 
        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
    // Method สำหรับเปลี่ยนเส้นทางไปยังหน้าสร้างผู้ใช้ใหม่
    navigateToAddUser() {
     
      this.$router.push('/user/create');
    },methods:{
   
   
      methods:{
    async createUser(){
      try{
        await UsersService.post(this.user);
        this.$router.push('/user/create');
      }catch(err){
        console.log(err);
      }
     
    }
  }
  }
  }
};
</script>
 
<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
 
h1 {
  margin-bottom: 20px;
  color: #333;
}
 
.login-form .form-group {
  margin-bottom: 15px;
  text-align: left;
}
 
.login-form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
 
.login-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
 
.login-form input:focus {
  border-color: #3498db;
  outline: none;
}
 
.btn,
.btn-add-user {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}
 
.btn:hover,
.btn-add-user:hover {
  background-color: #2980b9;
}
 
.error {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
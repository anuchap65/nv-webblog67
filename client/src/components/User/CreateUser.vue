<template>
  <div class="form-container">
    <h1>Create User</h1>
    <form v-on:submit.prevent="createUser" class="user-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="user.name" placeholder="Enter your first name" required>
      </div>
      <div class="form-group">
        <label for="lastname">Last Name:</label>
        <input type="text" id="lastname" v-model="user.lastname" placeholder="Enter your last name" required>
      </div>
      <div class="form-group"> 
        <label for="email">Email:</label> 
        <input type="email" id="email" v-model="user.email" placeholder="Enter your email address" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" placeholder="Enter your password" required>
      </div>
      <div class="form-group">
        <button type="submit" class="submit-btn">Create User</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    };
  },
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        this.$router.push('/login');
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
  font-family: 'Arial', sans-serif;
}

.user-form .form-group {
  margin-bottom: 1rem;
}

.user-form label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
}

.user-form input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.user-form input:focus {
  border-color: #007BFF;
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #007BFF;
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.submit-btn:focus {
  outline: none;
}

@media (max-width: 600px) {
  .form-container {
    padding: 1rem;
  }
  
  .user-form input {
    padding: 0.5rem;
  }
  
  .submit-btn {
    padding: 0.5rem;
  }
}
</style>

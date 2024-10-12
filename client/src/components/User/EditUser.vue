<template>
  <div class="edit-user-container">
    <h1>Edit User</h1>
    <form v-on:submit.prevent="editUser" class="edit-user-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="user.name" id="name" class="input-field" />
      </div>
      <div class="form-group">
        <label for="lastname">Lastname:</label>
        <input type="text" v-model="user.lastname" id="lastname" class="input-field" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" v-model="user.email" id="email" class="input-field" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" id="password" class="input-field" />
      </div>
      <div class="form-group">
        <button type="submit" class="submit-btn">Edit User</button>
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
        status: 'active',
      },
    };
  },
  async created() {
    try {
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async editUser() {
      try {
        await UsersService.put(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.edit-user-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.edit-user-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #007BFF;
  outline: none;
}

.submit-btn {
  background-color: #28a745;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #218838;
}

@media (max-width: 600px) {
  .edit-user-container {
    padding: 1rem;
  }
}
</style>

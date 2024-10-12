<template>
  <div class="users-container">
    <h1>All Users</h1>
    <div class="action-btn">
      <button v-on:click="navigateTo('/user/create')" class="btn create-btn">สร้างผู้ใช้</button>
    </div>
    <hr>
    <div v-if="users.length">
      <div class="summary"><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div>
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div><b>id:</b> {{ user.id }}</div>
        <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
        <div><b>อีเมล:</b> {{ user.email }}</div>
        <div><b>status:</b> {{ user.status }}</div>
        <div><b>type:</b> {{ user.type }}</div>
        <div class="actions">
          <button v-on:click="navigateTo('/user/'+user.id)" class="btn info-btn">ดูข้อมูล</button>
          <button v-on:click="navigateTo('/user/edit/'+user.id)" class="btn edit-btn">แก้ไขข้อมูล</button>
          <button v-on:click="deleteUser(user)" class="btn delete-btn">ลบข้อมูล</button>
        </div>
        <hr>
      </div>
    </div>
    <div v-else>
      <p>ไม่มีผู้ใช้งานในระบบ</p>
    </div>
    <div class="action-btn">
      <button v-on:click="logout" class="btn logout-btn">Logout</button>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data(){
    return {
      users: []
    }
  },
  async created() {
    try{
      this.users = (await UsersService.index()).data;
    }catch(err){
      console.log(err);
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'login' });
    },
    navigateTo(route){
      this.$router.push(route);
    },
    async deleteUser(user){
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if(result){
        try{
          await UsersService.delete(user);
          this.refreshData();
        }catch(err){
          console.log(err);
        }
      }
    },
    async refreshData(){
      try{
        this.users = (await UsersService.index()).data;
      }catch(err){
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.users-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.action-btn {
  text-align: right;
  margin-bottom: 1rem;
}

.user-card {
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-btn {
  background-color: #007BFF;
  color: white;
}

.info-btn {
  background-color: #17a2b8;
  color: white;
}

.edit-btn {
  background-color: #ffc107;
  color: black;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.logout-btn {
  background-color: #6c757d;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}

@media (max-width: 600px) {
  .users-container {
    padding: 1rem;
  }
  
  .user-card {
    padding: 0.5rem;
  }

  .actions {
    flex-direction: column;
  }
  
  .actions .btn {
    margin-bottom: 0.5rem;
  }
}
</style>

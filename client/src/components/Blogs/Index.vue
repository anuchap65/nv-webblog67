<template>
    <div class="container">
        <h2>สินค้าหายากทั้งหมด   ( {{ blogs.length }} )</h2>
 
        <!-- <p><button class="btn primary" v-on:click="logout">Logout</button></p> -->
        <p><button class="btn success" v-on:click="navigateTo('/blog/create')">เพิ่มสินค้า</button></p>
 
        <div v-for="blog in blogs" v-bind:key="blog.id" class="blog-card">
            <h3><strong>ชื่อสินค้า:</strong> {{ blog.title }}</h3>
 
            <!-- แสดงรูปภาพ Thumbnail -->
            <transition name="fade">
                <div class="thumbnail-pic" v-if="blog.thumbnail && blog.thumbnail !== 'null'">
                    <img :src="BASE_URL + blog.thumbnail" alt="Thumbnail" />
                </div>
            </transition>
 
            <p><strong>รายละเอียด:</strong> {{ blog.content }}</p>
            <p><strong>ราคา:</strong> {{ blog.category }}</p>
            <p><strong>จำนวน:</strong> {{ blog.status }}</p>
 
            <p class="actions">
                <button class="btn warning" v-on:click="navigateTo('/blog/edit/' + blog.id)">แก้ไขสินค้า</button>
                <button class="btn danger" v-on:click="deleteBlog(blog)">ลบสินค้า</button>
            </p>
            <hr>
        </div>
    </div>
</template>
 
<script>
import BlogsService from '@/services/BlogsService'
export default {
    data () {
        return {
            blogs: [],
            BASE_URL: 'http://localhost:8081/assets/uploads/' // ตั้งค่า BASE_URL ให้ถูกต้อง
        }
    },
    async created () {
        this.blogs = (await BlogsService.index()).data
    },
    methods: {
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setBlog', null)
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo (route) {
            this.$router.push(route)
        },
        async deleteBlog (blog) {
            let result = confirm("ต้องการลบสินค้านี้หรือไม่?")
            if (result) {
                try {
                    await BlogsService.delete(blog)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.blogs = (await BlogsService.index()).data
        }
    }
}
</script>
 
<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
 
h2, h4 {
    text-align: center;
    color: #333;
}
 
.blog-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
 
.blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
 
.thumbnail-pic img {
    width: 100%;
    max-width: 200px;
    height: auto;
    margin-bottom: 10px;
    border-radius: 4px;
}
 
.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}
 
.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
 
.btn.primary {
    background-color: #3498db;
    color: #fff;
}
 
.btn.primary:hover {
    background-color: #2980b9;
}
 
.btn.success {
    background-color: #2ecc71;
    color: #fff;
}
 
.btn.success:hover {
    background-color: #27ae60;
}
 
.btn.warning {
    background-color: #f39c12;
    color: #fff;
}
 
.btn.warning:hover {
    background-color: #e67e22;
}
 
.btn.danger {
    background-color: #e74c3c;
    color: #fff;
}
 
.btn.danger:hover {
    background-color: #c0392b;
}
 
hr {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 20px 0;
}
 
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
 
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
</style>
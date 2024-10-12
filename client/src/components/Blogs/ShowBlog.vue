<template>
    <div>
        <h1>Show Blog</h1>
        <p>id: {{ blog.id }}</p>
        <p>title: {{ blog.pname }}</p>
        <!-- <p>รายละเอียด : {{ blog.content }}</p> -->

         <!-- แสดงรูปภาพ Thumbnail -->
         <transition name="fade">
                <div class="thumbnail-pic" v-if="blog.thumbnail && blog.thumbnail !== 'null'">
                    <img :src="BASE_URL + blog.thumbnail" alt="Thumbnail" />
                </div>
            </transition>
 
        <p>Pictures:</p>
        <div v-if="blog.pictures && blog.pictures.picture">
            <div v-for="(picture, index) in blog.pictures" :key="index">
                <img :src="picture" alt="Blog picture" class="blog-picture" />
            </div>
        </div>
        <p v-else>ไม่พบรูปภาพ</p>
 
        <p>ราคา: {{ blog.price }}</p>
        <p>จำนวน: {{ blog.pnum }}</p>
        <p>
            <button v-on:click="navigateTo('/blog/edit/' + blog.id)">แก้ไข blog</button>
            <button v-on:click="navigateTo('/blogs')">กลับ</button>
        </p>
    </div>
</template>
<script>
    import BlogsService from '@/services/BlogsService'
    export default {
        data () {
            return {
                blog: null
            }
        },
        async created () {
            try {
                let blogId = this.$route.params.blogId
                this.blog = (await BlogsService.show(blogId)).data
            } catch (error) {
                console.log (error)
            }
        },
        methods : {
            navigateTo (route) {
                this.$router.push(route)
            },
        }
    }
</script>
<style scoped>
</style><template>
    <div>
        <h1>Show Blog</h1>
        <p>id: {{ blog.id }}</p>
        <p>title: {{ blog.title }}</p>
        <p>รายละเอียด : {{ blog.content }}</p>
 
        <p>Pictures:</p>
        <div v-if="blog.pictures && blog.pictures.length">
            <div v-for="(picture, index) in blog.pictures" :key="index">
                <img :src="picture" alt="Blog picture" class="blog-picture" />
            </div>
        </div>
        <p v-else>ไม่พบรูปภาพ</p>
 
        <p>ราคา: {{ blog.category }}</p>
        <p>status: {{ blog.status }}</p>
        <p>
            <button v-on:click="navigateTo('/blog/edit/' + blog.id)">แก้ไข blog</button>
            <button v-on:click="navigateTo('/blogs')">กลับ</button>
        </p>
    </div>
</template>
 
<script>
import BlogsService from '@/services/BlogsService';
 
export default {
    data() {
        return {
            blog: null
        };
    },
    async created() {
        try {
            let blogId = this.$route.params.blogId;
            this.blog = (await BlogsService.show(blogId)).data;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
    }
}
</script>
 
<style scoped>
.blog-picture {
    max-width: 100%; /* Make the image responsive */
    height: auto; /* Maintain aspect ratio */
    margin-bottom: 10px; /* Spacing between images */
}
</style>
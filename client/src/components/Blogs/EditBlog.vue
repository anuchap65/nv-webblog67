<template>
  <div class="edit-product">
    <h1 class="text-center">แก้ไขสินค้า</h1>
    <form @submit.prevent="editBlog">
      <div class="form-group">
        <label for="product-name"><strong>ชื่อสินค้า:</strong></label>
        <input id="product-name" type="text" v-model="blog.pname" class="form-control" />
      </div>

      <div class="form-group">
        <label><strong>Thumbnail:</strong></label>
        <transition name="fade">
          <div class="thumbnail-pic" v-if="blog.thumbnail !== 'null'">
            <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" class="img-thumbnail" />
          </div>
        </transition>
      </div>

      <!-- <div class="form-group">
        <label><strong>Upload Images:</strong></label>
        <div class="dropbox" @click="$refs.fileInput.click()">
          <input
            type="file"
            ref="fileInput"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="handleFileChange"
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial">Drag your file(s) here to begin<br>or click to browse</p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
        </div>
      </div> -->

      <transition-group tag="ul" class="pictures">
        <li v-for="picture in pictures" :key="picture.id" class="picture-item">
          <img :src="BASE_URL + picture.name" alt="picture image" class="img-preview" />
        </li>
      </transition-group>

      <div class="form-group">
        <label for="product-detail"><strong>รายละเอียด:</strong></label>
        <input id="product-detail" type="text" v-model="blog.detail" class="form-control" />
      </div>

      <div class="form-group">
        <label for="product-price" ><strong>ราคา:</strong>  <strong style="margin-left: 5px;">บาท</strong></label>
        <input id="product-price" type="text" v-model="blog.price" class="form-control" />
      </div>

      <div class="form-group">
        <label for="product-quantity"><strong>จำนวน:</strong></label>
        <input id="product-quantity" type="text" v-model="blog.pnum" class="form-control" />
      </div>

      <div class="button-group">
        <button class="btn success" type="submit">ยืนยัน</button>
        <button class="btn" @click="navigateTo('/blogs')">กลับ</button>
      </div>
    </form>
  </div>
</template>

<script>
import BlogsService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "../../services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  components: { VueCkeditor },
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      blog: {
        pname: "",
        thumbnail: "null",
        pictures: "null",
        detail: "",
        price: "",
        pnum: "",
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
        ],
        height: 300,
      },
    };
  },
  methods: {
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name,
        };

        await UploadService.delete(dataJSON);
        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },
    async editBlog() {
      try {
        await BlogsService.put(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        let pictureJSON = [];
        this.uploadedFileNames.forEach((uploadFilename) => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename,
            };
            this.pictures.push(pictureJSON);
          }
        });
        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;

      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      this.save(formData);
    },
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },
    handleFileChange(event) {
      this.filesChange(event.target.name, event.target.files);
    },
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  async created() {
    this.currentStatus = STATUS_INITIAL;

    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogsService.show(blogId)).data;
      this.pictures = JSON.parse(this.blog.pictures);
      this.pictureIndex = this.pictures.length;
    } catch (error) {
      console.log(error);
    }
  },
  async mounted() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogsService.show(blogId)).data;
      this.pictures = JSON.parse(this.blog.pictures);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.edit-product {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
  text-align: center;
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: khaki;
}

ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

ul.pictures li {
  margin: 5px;
}

.img-preview {
  max-width: 180px;
  border-radius: 4px;
}

.thumbnail-pic img {
  width: 100%;
  max-width: 200px;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.success {
  background-color: #2ecc71;
  color: #fff;
}

.btn:hover {
  opacity: 0.8;
}

.btn.success:hover {
  background-color: #27ae60;
}
</style>

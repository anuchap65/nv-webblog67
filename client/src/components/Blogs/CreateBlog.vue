<template>
  <div class="container">
    <h1><center>เพิ่มสินค้า</center></h1>
    <form v-on:submit.prevent="createBlog" class="product-form">
      <div class="form-group">
        <label for="pname">ชื่อสินค้า:</label>
        <input type="text" id="pname" v-model="blog.pname" />
      </div>
      
      <transition name="fade">
        <div class="thumbnail-pic" v-if="blog.thumbnail !== 'null'">
          <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
        </div>
      </transition>
      
      <div enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="handleFileChange($event.target.files)"
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial">
            Drag your file(s) here to begin<br />
            or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
        </div>
      </div>

      <div class="pictures-section">
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" :key="picture.id">
            <img
              class="uploaded-img"
              :src="BASE_URL + picture.name"
              alt="picture image"
            />
            <div class="picture-actions">
              <button class="btn-thumbnail" v-on:click.prevent="useThumbnail(picture.name)">
                Thumbnail
              </button>
              <button class="btn-delete" v-on:click.prevent="delFile(picture)">Delete</button>
            </div>
          </li>
        </transition-group>
        <div class="clearfix"></div>
      </div>
      
      <div class="form-group">
        <label for="detail">รายละเอียด:</label>
        <input type="text" id="detail" v-model="blog.detail" />
      </div>

      <div class="form-group">
        <label for="price">ราคา:</label>
        <input type="text" id="price" v-model="blog.price" />
      </div>

      <div class="form-group">
        <label for="pnum">จำนวน:</label>
        <input type="text" id="pnum" v-model="blog.pnum" />
      </div>

      <div class="form-group">
        <button type="submit" class="btn-submit">เพิ่มสินค้า</button>
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
        this.pictures = this.pictures.filter(p => p.id !== material.id);
      }
    },
    async createBlog() {
      this.blog.pictures = JSON.stringify(this.pictures);
      console.log("JSON.stringify: ", this.blog);
      try {
        await BlogsService.post(this.blog);
        this.$router.push({ name: "blogs" });
      } catch (err) {
        console.log(err);
      }
    },
    handleFileChange(fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(fileList).forEach(file => {
        formData.append(this.uploadFieldName, file, file.name);
        this.uploadedFileNames.push(file.name);
      });
      this.save(formData);
    },
    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;
        this.updatePictures();
        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    updatePictures() {
      this.uploadedFileNames.forEach((uploadFilename) => {
        if (!this.pictures.some(p => p.name === uploadFilename)) {
          this.pictureIndex++;
          this.pictures.push({
            id: this.pictureIndex,
            name: uploadFilename,
          });
        }
      });
    },
    clearUploadResult() {
      setTimeout(() => {
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFileNames = [];
      }, 5000);
    },
    useThumbnail(filename) {
      this.blog.thumbnail = filename;
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
  components: {
    VueCkeditor,
  },
  created() {
    this.currentStatus = STATUS_INITIAL;
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
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

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}

ul.pictures li {
  float: left;
  margin-right: 20px;
}

.uploaded-img {
  max-width: 150px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.picture-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.btn-thumbnail,
.btn-delete {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-thumbnail {
  background-color: #007bff;
  color: white;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-submit {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-submit:hover {
  background-color: #218838;
}

.clearfix {
  clear: both;
}

.thumbnail-pic img {
  width: 200px;
  border-radius: 8px;
}
</style>

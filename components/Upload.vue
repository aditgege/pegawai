
<template>
    <el-upload
        class="avatar-uploader"
        action="http://test.produksi-iwzl-api.com/v1/update"
        :http-request="uploadImg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="fotoPegawai" :src="fotoPegawai" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>


<script>
import { Message } from 'element-ui';
  export default {
    name:'Upload',
    data() {
      return {
        gambarpegawai: this.$auth.user.gambarpegawai,
      };
    },
    computed: {
      fotoPegawai : function () {
        return "http://test.produksi-iwzl-api.com/images/gambarpegawai/" + this.gambarpegawai
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.fotoPegawai = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        
        if (!isJPG) {
          this.$notify.error({
            title: 'Error',
            message: 'pastikan format gambar jpg'
          });
        }
        if (!isLt2M) {
          this.$notify.error({
            title: 'Error',
            message: 'jangan lebih dari 2 MB'
          });
      }
        return isJPG && isLt2M;
      },
      uploadImg(f){
        let param =  new FormData();
        param.append('gambarpegawai', f.file)
        let config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        this.$axios.post(f.action,param,config )
          .then(response =>{
            this.gambarpegawai = response.data.data.gambarpegawai;
            this.$notify.success({
              message: 'Upload Foto Berhasil',
              showClose: false,
              position: 'bottom-right'
            });
          })
          .catch(() => {
            f.onError()

        })
      },

    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #28a745;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height:50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
</style>

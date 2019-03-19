<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-12">
               <div class="wrapper-profile">
                    <div class="card mt-2 align-middle card-profile">
                        <div class="card-body">
                           <div class="d-flex">
                                
                            <Upload />    
                                <div class="wrapper-identitas ml-3 d-flex w-75 ">
                                    <div class="">
                                        <p class="m-0">{{ user.nmpegawai}}</p>
                                        <small><i>{{ user.nmdepartemen }}</i></small>
                                    </div>
                                    <div class="ml-auto wrapper-kdpegawai">
                                        <small>KODE PEGAWAI</small><br>
                                        <b>{{user.kdpegawai}}</b>

                                    </div>
                                </div>
                           </div>
                        </div>
                   </div>
                   <div class="card mt-2">
                       <div class="card-body">
                             <form >
                        <div class="form-group">
                            <label>No. HP</label>
                            <input  type="number" class="form-control"  :disabled=isDisabled v-model="form.nohp" required :placeholder="user.nohp">
                        </div>
                        <div class="form-group">
                            <a href="#" class="btn btn-success w-25 float-right" style=" box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);" @click="isDisabled = !isDisabled" v-if="isDisabled == true">Edit</a>
                            <div v-else-if="isDisabled == false">
                                <a href="#" class="btn btn-success float-right " style=" box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);" @click="editnohp" >Simpan</a>
                                <a href="#" class="btn btn-success float-right  mr-2" style=" box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);" @click="isDisabled = !isDisabled" >Batal</a>
                            </div>
                        </div>
                    </form>
                       </div>
                   </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
import Upload from '~/components/Upload.vue'
export default {
    components:{
        Upload
    },
    middleware:'auth',
    data(){
        return {
            form:{
                imageUrl: '',
                nohp:'',
            },
            isDisabled:true
        }
    },
    methods: {
        async editnohp() {
            try{
                await this.$axios.post('update', this.form)
                .then(Response =>{
                    this.nohp = Response.data.data.nohp
                    this.isDisabled = true;
                    this.$notify.success({
                        message: 'No HP berhasil Diubah',
                        showClose: false,
                        position: 'bottom-right'
                    });
                })
            } catch(e){
                return e.response.errors
            }
        }
    },
    
}
</script>
<style scoped>
   .img-profile{
        width: 50px;
        height: 50px;
        background-size: cover;
        border-radius: 50px;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
    }
    
    .card {
        border:none;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border-radius: 5px;
    }
    small{
        color:gray;
    }
    .wrapper-kdpegawai{
        text-align: center;
    }
    small.btn-edit{
        
        font-size:10px;
    }
</style>

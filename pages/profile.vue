<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-12">
               <div class="wrapper-profile">
                    <div class="card mt-2 align-middle card-profile">
                        <div class="card-body">
                           <div class="d-flex">
                                <div class="img-profile"
                                    :style="{ backgroundImage: 'url(' + fotoPegawai + ')' }">
                                </div>
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
                           
                       </div>
                   </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    middleware:'auth',
    data(){
        return {
            fotoPegawai:"http://devzadmin.iwzl.web.id/uploads/pegawai/"+this.$auth.user.gambarpegawai,
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
</style>

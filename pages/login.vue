<template>
    <div class="container w-100 ">
        <div class="row">
            <div class="col-12">
                <div class="wrapper-logo m-auto">
                    <img src="~/assets/logonew_3.svg" alt="" srcset="" class="img-fluid">
                </div>
            </div>
        </div>
       <div class="row">
            <div class="col-12">
            <div name="pusherror" v-if="errors.length>1" >
                <Notification :message="errors" />                
            </div>
            <div class="card mt-4 align-middle">
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="form-group">
                            <label>ID Pegawai</label>
                            <input v-model="form.kdpegawai" type="text" class="form-control" :class="{ 'is-invalid' :errors.kdpegawai}"  placeholder="ID Pegawai" required>
                            <div class="invalid-feedback" v-if="errors.kdpegawai">
                                {{errors.kdpegawai[0]}}
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="form.password" type="password" class="form-control" :class="{ 'is-invalid' :errors.password}" placeholder="Password" required>
                            <div class="invalid-feedback" v-if="errors.password">
                                {{errors.password[0]}}
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Login" class="btn btn-success w-100" style=" box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
                        </div>
                    </form>
                </div>
            </div>
        </div>
       </div>
    </div>
</template>

<script>
import Notification from '~/components/Notification.vue'
export default {
    transition: 'page',
    layout:'blank',
    components: {
        Notification
    },
    transition:{
        name:'pusherror',
        mode:'out-in'
    },
    middleware: 'guest',
    data() {
        return {
            form: {
                kdpegawai: '',
                password: '',
                errors:null
            },
            show: true
        }
    },
   
    methods: {
        async login() {
            try{
                await this.$auth.login({ data: this.form })    
                this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/');
            } catch(e){
                return e.response.errors
            }
        }
    }
}
</script>
<style scoped>

    .container{
        margin-top: 30%;
    }
    .wrapper-logo{
        max-width: 50px;
    }
    .card{
        border:none;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border-radius: 5px;
    }
</style>

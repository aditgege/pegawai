<template>
  <section class="container-fluid">
    <b-row align-h="center">
      <div class="mt-5">
          <center><b>TANGGAL PENGERJAAN</b></center>
        <button class="btn btn-small" @click="prevDate"><i class="el-icon-d-arrow-left"></i></button>
        <el-date-picker align="center" type="date" placeholder="Pilih tanggal" v-model="form.tglpengerjaan" format="d-MMM-yyyy" v-on:change="getPpic" value-format="yyyy-MM-dd" >
        </el-date-picker>
        <button class="btn btn-small" @click="nextDate"><i class="el-icon-d-arrow-right"></i></button>
      </div>
    </b-row>
    <div class=" mt-4">
      <div class="row">
        <div class="col-3">
          <b-card header-bg-variant="primary" text-variant="white" header="Plan" class="text-center">
            <b-card-text>1</b-card-text>
          </b-card>
        </div>

        <div class="col-3">
          <b-card header-bg-variant="warning" text-variant="white" header="Sedang" class="text-center">
            <b-card-text>2</b-card-text>
          </b-card>
        </div>

        <div class="col-3">
          <b-card header-bg-variant="success" text-variant="white" header="Selesai" class="text-center">
            <b-card-text>2</b-card-text>
          </b-card>
        </div>
        <div class="col-3">
          <b-card header-bg-variant="danger" text-variant="white" header="Sisa" class="text-center">
            <b-card-text>2</b-card-text>
          </b-card>
        </div>
      </div>
    </div>
    <b-row>
       <div class="col-12 mt-3">
          <transition name="pusherror" >
            <Notification :message="errors" v-if="errors.length>1"/>                
            <b-table ref="table" v-else class="text-center"  hover :items="items" :fields="fields" responsive/>
          </transition>
      </div>
    </b-row>
  </section>
</template>

<script>
import Notification from '~/components/Notification.vue'

export default {
  transition:'page',
  middleware:'auth',
  components:{
    Notification
  },
  data(){
    return  {
      form:{
        idpegawai:this.$auth.user.idpegawai,
        tglpengerjaan: '',
      },
      fields:[
        {
          label: 'ID ORDER',
          key:'noorder'
        },
        {
          label:'KODE',
          key:'kdproduk'
        },
        {
          label:'PRODUK',
          key:'nmproduk'
        },
        {
          label:'WARNA',
          key:'warna'
        },
        {
          label:'SIZE',
          key:'size'
        },
        {
          label:'STATUS',
          key:'nmstproduksi'
        }
      ],
      items: [],
    }
  },
  mounted() {
    this.hariini(),
    this.getPpic()
  },
  methods: {
   hariini(){
    var date = new Date()
    this.form.tglpengerjaan = date;
   },
   nextDate(){
      var date = new Date(this.form.tglpengerjaan.valueOf());
      date.setDate(date.getDate() + 1);
      this.form.tglpengerjaan = date;
      this.getPpic()
   },
   prevDate(){
      var date = new Date(this.form.tglpengerjaan.valueOf());
      date.setDate(date.getDate() - 1);
      this.form.tglpengerjaan = date;
      this.getPpic()
   },
   getPpic() {
    this.$axios.post('datappic', this.form)
      .then((Response) => {
        if(Response.data.data.length>0){
          this.items = Response.data.data;
        }else{
          return "berhasil tapi data ga ada"
        }

      })
      .catch((error) => {
        return error.response.errors
      })
  },
  

}
 
};
</script>

<style lang="scss">
    // '~bootstrap/scss/bootstrap.scss'

.body{
  background-color: #DFE1F3;
  background-image:url("../assets/undraw_Working_32n9.svg")
}
  .card{
    border:none;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 5px;

  }
  .card-header{
    padding: 5px 0px;
    font-size: 15px;
    border-radius: calc(10px - 1px) calc(10px - 1px) 0 0!important;
    color:black;
  }
  .card-body{
    background: none;
  }
  .card-body p{
    color: black;
    font-size: 15px;
    font-weight: bold;
  }
  .table{
    font-size: 12px;
  }
</style>
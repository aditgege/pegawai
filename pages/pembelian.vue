<template>
  <section class="container-fluid">
     <b-row align-h="center">
      <div class=" col-12 mt-5">
          <center><b>TANGGAL PENGERJAAN</b></center>
      <div class="d-flex">
          <div class="">
            <el-date-picker align="center" type="date" placeholder="Pilih tanggal dari" v-model="form.tglpengerjaan" format="d-MMM-yyyy" v-on:change="getPpic" value-format="yyyy-MM-dd" ></el-date-picker>
            <el-date-picker class="mt-2" align="center" type="date" placeholder="Pilih tanggal ke" v-model="form.tglpengerjaan" format="d-MMM-yyyy" v-on:change="getPpic" value-format="yyyy-MM-dd" ></el-date-picker>
          </div>
          <div><a href="#" class="btn btn-success btn-cari">Cari</a></div>
      </div>
      </div>
    </b-row>
    <div class=" mt-4">
      <div class="row">

        <div class="col-4">
          <b-card header-bg-variant="warning" text-variant="white" header="Permintaan" class="text-center">
            <b-card-text>2</b-card-text>
          </b-card>
        </div>

        <div class="col-4">
          <b-card header-bg-variant="success" text-variant="white" header="Sudah dibeli" class="text-center">
            <b-card-text>2</b-card-text>
          </b-card>
        </div>

        <div class="col-4">
          <b-card header-bg-variant="primary" text-variant="white" header="Sisa" class="text-center">
            <b-card-text>1</b-card-text>
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
    Notification,
  },
  data(){
    return  {
      form:{
        idpegawai:this.$auth.user.idpegawai,
        tglpengerjaan: '',
      },
      fields:[
        {
          label: 'No',
          key:'noorder'
        },
        {
          label:'BARANG',
          key:'kdproduk'
        },
        {
          label:'SATUAN',
          key:'nmproduk'
        },
        {
          label:'QTY',
          key:'warna'
        },
        {
          label:'REKOMENDASI SUPPLIER',
          key:'size'
        },
        {
          label:'SUDAH DIBELI',
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
  .vhd-input{
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .btn-cari{
    text-align: center;
    padding: 30px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    font-weight: bold;
  }
</style>
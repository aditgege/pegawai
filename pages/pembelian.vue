<template>
  <section class="container-fluid">
     <b-row align-h="center">
      <div class=" col-12 mt-5">
          <center><b>TANGGAL PEMBELIAN</b></center>
      <div class="">
          <div class="center" align="center">
            <el-date-picker align="center" type="date" placeholder="Pilih tanggal dari" v-model="form.daritgl" format="d-MMM-yyyy" v-on:change="getDataPem" value-format="yyyy-MM-dd" ></el-date-picker>
            <el-date-picker class="mt-2" align="center" type="date" placeholder="Pilih tanggal ke" v-model="form.ketgl" format="d-MMM-yyyy" v-on:change="getDataPem" value-format="yyyy-MM-dd" ></el-date-picker>
          </div>
          <!-- <div><a href="#" @click="getDataPem" class="btn btn-success btn-cari">Cari</a></div> -->
      </div>
      </div>
    </b-row>
    <div class=" mt-4">
       <div class="row" v-if="errors.length>1">
        <div class="col-4">
          <b-card header-bg-variant="warning" text-variant="white" header="Permintaan" class="text-center">
            <b-card-text>0</b-card-text>
          </b-card>
        </div>

        <div class="col-4">
          <b-card header-bg-variant="success" text-variant="white" header="Sudah dibeli" class="text-center">
            <b-card-text>0</b-card-text>
          </b-card>
        </div>

        <div class="col-4">
          <b-card header-bg-variant="primary" text-variant="white" header="Sisa" class="text-center">
            <b-card-text>0</b-card-text>
          </b-card>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-4">
          <b-card header-bg-variant="warning" text-variant="white" header="Permintaan" class="text-center">
            <b-card-text>{{ permintaan }}</b-card-text>
          </b-card>
        </div>

        <div class="col-4">
          <b-card header-bg-variant="success" text-variant="white" header="Sudah dibeli" class="text-center">
            <b-card-text>{{dibeli}}</b-card-text>
          </b-card>
        </div>

        <div class="col-4">
          <b-card header-bg-variant="primary" text-variant="white" header="Sisa" class="text-center">
            <b-card-text>{{ sisa}}</b-card-text>
          </b-card>
        </div>
      </div>
    </div>
    <b-row>
       <div class="col-12 mt-3">
          <transition name="pusherror" >
            <Notification :message="errors" v-if="errors.length>1"/>                
            <b-table ref="table" v-else class="text-center"  hover :items="items" :fields="fields" responsive>
              <template slot="NO" slot-scope="data">
              {{ data.index + 1 }}
          </template>
            <template slot="stbeli" slot-scope="row">
              <b-form-group >
                <b-form-checkbox  v-if="row.item.stbeli == 1" v-model="row.item.stbeli" @change="selectRow(row.item)" :value="row.item.stbeli" ></b-form-checkbox>
                <b-form-checkbox  v-else  @change="selectRow(row.item)" :value="row.item.stbeli" ></b-form-checkbox>              
              </b-form-group>
               <!-- <b-form-group  v-else>
                <b-form-checkbox  v-model="row.item.stbeli" @change="row.item.stbeli = !row.item.stbeli ,updateData" :value="row.item.stbeli" :checked="false" >{{row.item.stbeli}}</b-form-checkbox>
              </b-form-group> -->
            </template>
            </b-table>
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
        daritgl: '',
        ketgl:''
      },
      fields:[
        'NO',
        {
          label:'BARANG',
          key:'nmjnsbahan'
        },
        {
          label:'SATUAN',
          key:'nmsatuan'
        },
        {
          label:'QTY',
          key:'qty'
        },
        {
          label:'REKOMENDASI SUPPLIER',
          key:'nmsupplier'
        },
        {
          label:'SUDAH DIBELI',
          key:'stbeli',

        }
      ],
      items: [],
      permintaan:'',
      dibeli:'',
      sisa:'',
      selected:''
      
    }
  },
  mounted() {
    this.getDataPem()
  },
  methods: {
   
   getDataPem() {
    this.$axios.post('datapembelian', this.form)
      .then((Response) => {
        if(Response.data.data.length>0){
          this.items = Response.data.data;
          this.permintaan = Response.data.permintaan;
          this.dibeli = Response.data.dibeli;
          this.sisa = Response.data.sisa
          console.log(row.item.stbeli)
          // console.log(this..stbeli)
        }else{
          return "berhasil tapi data ga ada"
        }

      })
      .catch((error) => {
        return error.response.errors
      })
  },
  updateData(){
    // this.$axios.post('updateBeli' , row.items.stbeli)
    // .then((Response) => {
    //   this.row.items.stbeli;
    // })
    // .catch((error) => {
    //   return error.response.errors
    // })
    // console.log(this.stbeli)
  },
  selectRow(item) {
      if (item.stbeli == 1) {
        item.stbeli = true;
        this.selected = item.stbeli
      } else {
        item.stbeli = false
        this.selected = item.stbeli

      }
       this.$axios.post('updateBeli', this.selected)
          .then((Response) => {
            this.selected = Response.stbeli
          })
          .catch((errot)=>{
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

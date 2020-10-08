<template>
  <ul class="cate-box">
    <li class="cate-list" v-for="index in cateList" :key="index.id">
      <img class="cate-img" :src="index.img" alt="美食">
      <p class="cate-title">{{index.name}}</p>
    </li>

  </ul>

</template>

<script>
  // import axios from 'axios'
  import {getCategroy} from '../../api/home.js'
    export default {
    data(){
      return {cateList:[]}
    },
        created() {
          // axios.get('http://admin.gxxmglzx.com/tender/test/get_type').then(res=>{
          //   if(res.data.errcode == 200){
          //     // console.log(res.data.data)
          //     this.cateList = res.data.data
          //   }else{
          //     conole.log(res.data.errmsg)
          //   }
          // }).catch(res=>{
          //   console.log(res);
          // })
          getCategroy().then(res=>{
            this.cateList = res.data;
          })
    }

    }
</script>

<style scoped>
.cate-box{
  display: flex;
  flex-wrap: wrap;}
  .cate-list{
    width: 20%;
    text-align: center;
    padding-top: 0.3rem;
    font-size: 12px;
  }
    .cate-img{
      width: 0.88rem;
      height: 0.88rem;
      margin-bottom: 0.1rem;
    }

</style>

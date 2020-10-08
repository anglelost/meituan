<template>
    <div class="list-box">
      <ul class="content">
        <li class="list" v-for="item in list" :key="item.id">
          <div class="img-box">
            <img :src=item.portrait alt="">
          </div>
          <div class="info-box">
            <div class="base">
              <span class="name">{{item.name}}</span>
              <span class="date">{{item.time}}</span>
            </div>
            <div class="time">{{item.duration}}分钟</div>
            <div class="desc">{{item.content}}</div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
props:["list"]
    }
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/mixin.scss";
  .list-box{
    @include border-top-1px(#e4e4e4);
    .content{
      padding: 0 0.3rem;
      .list{
        padding: 0.3rem 0 0.2rem 0;
        display: flex;
        .img-box{
          width: 0.8rem;
          flex: 0 0 0.8rem;
          margin-right: 0.2rem;
          img{
            width: 100%;
            border-radius: 50%;
          }
        }
        .info-box{
          flex: 1;
          min-width: 0;
          .base{
            color: #2f2f2f;
            font-size: 0.32rem;
            .date{
              color: #898989;
              font-size: 0.24rem;
              float: right;
            }

          }
          .time{
            color: #666;
            font-size: 0.24rem;
            margin-top: 0.14rem;
          }
          .desc{
            line-height: 0.4rem;
            color: #2f2f2f;
            padding: 0.28rem 0 0.16rem 0;
          }

        }
      }

    }
  }

</style>

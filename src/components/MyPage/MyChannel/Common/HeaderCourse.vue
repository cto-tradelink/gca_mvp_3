<template>
    <div class="row" style="width:100%;; height:56px; margin:0px auto; background-color: #c1d1f7;">
            <div id="header">
              <span v-on:click="home" style="display:inline-block; margin-top:10px;">
                  <img src="/static/img/channel-home.png"></span> 
                  <div id="move_btn_con" style="float:right">
                      <div style="float:left; color:#1a2a53;font-size: 14px;  font-weight: bold;margin-right:32px; " ><img src="/static/img/arrow_left_24.png"  style="width:24px;float:left;margin-top:16px;margin-right:6px;">이전강의 </div>
                      <div style="float:left; width:10px; height:20px; border-left:1px solid #fff;margin-top:19px;" ></div>
                      <div style="float:left;color:#1a2a53;font-size: 14px;  font-weight: bold;margin-left:32px; color:#1b49f4">  완료후 다음강의 <img src="/static/img/arrow_right_24.png" style="width:24px;float:right;margin-top:16px; margin-left:6px;"></div>
                  </div>
            </div>
        </div>    
</template>

<script>
export default {
    methods:{
        home:function(){

        }     
    }
}
</script>

<style scoped>
    #header{
        width: 1224px;
        height: auto;
        margin: 0px auto;
        height: 56px;
        background-color: #c1d1f7;
        line-height: 56px;
  
    }
    .row{
        background-color: #c1d1f7;
        border-bottom: solid 1px #c1d1f7;
    }
    
</style>

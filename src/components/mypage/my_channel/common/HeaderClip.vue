<template>
    <div class="row" style="width:100%;; height:56px; margin:0px auto; background-color: #c1d1f7;">
            <div id="header" >
              <span v-on:click="back" style="display:inline-block; margin-top:5px;"><img src="/static/img/arrow_left_24.png"></span> <span id="page_ttl"></span>
            </div>
        </div>    
</template>

<script>
export default {
    methods:{
        back:function(){
            console.log("back")
            this.$router.go(-1)
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
        border-bottom: solid 1px #ced4da;
    }
    
</style>

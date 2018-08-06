<template>
<div>
    <div class="page_title">
            관심기업
        </div>
        <div id="interest_startup_con">
              <StartupCard  v-for="s in startup_list" :startup="s"></StartupCard>
    </div>
</div>
        
</template>

<script>
import StartupCard from "../Startup/StartupCard.vue"

export default {
    components:{
        StartupCard
    },
    data:function(){
        return{
            startup_list:[]
        }
    },
    mounted:function(){
        var vue_obj = this
            var data={
                "id":localStorage.getItem("id")
                }   
                vue_obj.$http.post(`/vue_my_interest_set_detail/`).then((res)=>{
                        vue_obj.startup_list = res.data  
                        console.log (vue_obj)
                        setTimeout(function(){
                        $(".heart").css("color","#ff0000")
                    })
                })
    }
}
</script>
<style>
/* .startup_card:nth-child(3n){
    margin-right: 24px!important;
} */
</style>


<style scoped>
#interest_startup_con{
    width:900px;
    margin-top:32px;
}
ul{
    /* -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px; */
}
ul>li{
    float: left;
    list-style: none;
    
}
.page_title{
    /* opacity: 0.8;  
    font-size: 20px;
    font-weight: bold;  
    color: #1a2f53;
    margin-top:40px; */
}
.startup_card{
    margin-right:24px!important;
}
</style>

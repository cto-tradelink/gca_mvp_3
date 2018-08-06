<template>
<div>
    <div class="page_title">
            관심지원사업
        </div>
        <div id="interest_startup_con">
            <div class="masonry" style="width:1224px;">
                <div v-for="d in inte">
                    <CardWithPoster v-if="d.img != undefined"  v-bind:item="d"></CardWithPoster>
                    <CardWithoutPoster  v-if="d.img == undefined" v-bind:item="d"></CardWithoutPoster>
                </div>
        </div>
    </div>
</div>
        
</template>

<script>
import StartupCard from "../Startup/StartupCard.vue"
import CardWithPoster from "../Common/CardWithPoster.vue"
import CardWithoutPoster from "../Common/CardWithoutPoster.vue"
export default {
    components:{
        StartupCard,CardWithoutPoster,CardWithPoster
    },
    data:function(){
        return{
            startup_list:[],
            inte:""
        }
    },
    mounted:function(){
        var vue_obj = this
            var data={
                "id":localStorage.getItem("id")
                }   
            vue_obj.$http.post("/get_startup_application/", vue_obj.qs(qs))
            .then((res)=>{
                    vue_obj.comp = res.data.comp.slice()
                    vue_obj.inte = res.data.interest.slice()
                    vue_obj.writing = res.data.writing.slice()
                    vue_obj.end = res.data.comp.slice()
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

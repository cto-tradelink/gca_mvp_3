<template>
    <div id="dashboard_page">
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <DashContent  :dashboard_list="dashboard_list"></DashContent>
    </div>
    </div>
</template>

<script>
import Header from "../Common/Header.vue"
import LeftNavi from "../Common/LeftNavi.vue"
import DashContent from "./DashContent.vue"
export default {
    components:{
        Header, LeftNavi,DashContent
    },
    created:function(){
        
        this.$http.get(`/vue_get_dashboard/`)
        .then((result) => {            
            console.log(result)
            this.dashboard_list = result.data     
            console.log("ing set debug_pre")       ;
          
        })    
    },
    data:function(){
        return{
            dashboard_list:"",
        }
    }
    ,
    mounted:function(){
        // this.$http.get(`/vue_get_dashboard/`)
        // .then((result) => {            
        //     console.log(result)
        //     this.dashboard_list = result.data     
        //     console.log("ing set debug")       ;
        //     console.log(result.data.ing_set.length)   ;
        // })    
    }
}
</script>

<style scoped>

</style>

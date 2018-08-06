<template>
    <div id="dashboard_page">
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <DashContent  v-if="dashboard_list != ''" :dashboard_list="dashboard_list"></DashContent>
    </div>
    </div>
</template>

<script>
import Header from "../Common/Header.vue"
import LeftNavi from "../Common/LeftNavi.vue"
import DashContent from "./AgentDashContent.vue"
export default {
    components:{
        Header, LeftNavi,DashContent
    },
    data:function(){
        return{
            dashboard_list:{
                due_set:[],
                waiting_set:[],
                ing_set:[],
            },
        }
    }
    ,
    mounted:function(){
        var data= {"id": "84"}
        var vue_obj = this
        vue_obj.$http.post(`/vue_get_agent_dashboard/`,vue_obj.qs(data)).then((res)=>{  vue_obj.dashboard_list = $.extend(true, {}, res.data); })
    }
}
</script>

<style scoped>

</style>

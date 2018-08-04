<template>
    <div id="static_page">
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <StaticsUserContent></StaticsUserContent>
    </div>
    </div>
</template>

<script>
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"
import StaticsUserContent from "./StaticsUserContent.vue"

export default {
    components:{Header, LeftNavi, StaticsUserContent},
    mounted:function(){
         $(document).ready(function(){
            $("#static_navigation>ul>li").removeClass("hover")
            $("#static_navigation>ul>li:eq(2)").addClass("hover")
        })
    }
}
</script>

<style scoped>
    #static_page{      
       
    }
</style>

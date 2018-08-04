<template>

    <div id="static_page">
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <StaticsAllContent></StaticsAllContent>
    </div>
    </div>
</template>

<script>
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"
import StaticsAllContent from "./StaticsAllContent.vue"

export default {
    components:{Header, LeftNavi, StaticsAllContent},
    mounted:function(){
        $(document).ready(function(){
            $("#static_navigation>ul>li").removeClass("hover")
            $("#static_navigation>ul>li:eq(1)").addClass("hover")
        })
    }
}   
</script>

<style scoped>
    #static_page{
      
       
    }
</style>

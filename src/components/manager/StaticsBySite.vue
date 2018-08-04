<template>
    <div id="static_page">
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <StaticsSiteContent></StaticsSiteContent>
    </div>
    </div>
</template>

<script>
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"
import StaticsSiteContent from "./StaticsSiteContent.vue"

export default {
    components:{Header, LeftNavi, StaticsSiteContent},
    mounted:function(){
         $(document).ready(function(){
            $("#static_navigation>ul>li").removeClass("hover")
            $("#static_navigation>ul>li:eq(4)").addClass("hover")
        })
    }
}
</script>

<style scoped>
    #static_page{
      
       
    }
</style>

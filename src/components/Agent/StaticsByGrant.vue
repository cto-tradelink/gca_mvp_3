<template>
    <div id="static_page">
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <StaticsGrantContent></StaticsGrantContent>
    </div>
    </div>
</template>

<script>
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"
import StaticsGrantContent from "./StaticsGrantContent.vue"

export default {
    components:{Header, LeftNavi, StaticsGrantContent}
}
</script>

<style scoped>
    #static_page{      
       
    }
</style>

<template>
    <div id="account_page">
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <AccouallGrantContent></AccouallGrantContent>
    </div>
    </div>
</template>

<script>
import Header from "../Common/Header.vue"
import LeftNavi from "../Common/LeftNavi.vue"
import AccouallGrantContent from "./AccouallGrantContent.vue"
export default {
    components:{
        Header, LeftNavi, AccouallGrantContent
    }
}
</script>

<style scoped>
    #account_page{
        min-height: 1000px;
    }
</style>

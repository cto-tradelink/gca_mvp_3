P<template>
    <div id="dashboard_page">
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <AgentAccountContent></AgentAccountContent>
    </div>
    </div>
</template>

<script>
import Header from "../Common/Header.vue"
import LeftNavi from "../Common/LeftNavi.vue"
import AgentAccountContent from "./AgentAccountContent.vue"
export default {
    components:{
        Header, LeftNavi,AgentAccountContent
    }
}
</script>

<style scoped>

</style>

<template>
    <div>
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <MakeApplicationContent></MakeApplicationContent>
    </div>
    </div>
</template>
<script>
import MakeApplicationContent from "./MakeApplicationContent.vue"
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"

export default {
    components:{
        Header, LeftNavi, MakeApplicationContent,
    }
}
</script>

<style>

</style>

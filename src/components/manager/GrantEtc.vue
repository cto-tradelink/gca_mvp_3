<template>
        <div>
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <GrantEtcContent></GrantEtcContent>
        <MakeGrantBottomControl></MakeGrantBottomControl>
    </div>
    </div>
</template>

<script>
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"
import GrantEtcContent from "./GrantEtcContent.vue"
import MakeGrantBottomControl from "./Common/MakeGrantBottomControl.vue"
export default {
    components:{
        Header, LeftNavi,GrantEtcContent,MakeGrantBottomControl
    }
}
</script>
<template>
        <div>
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <SupportDetail></SupportDetail>
        <MakeGrantBottomControl></MakeGrantBottomControl>
    </div>
    </div>
</template>

<script>
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"
import SupportDetail from "./SupportDetail.vue"
import MakeGrantBottomControl from "./Common/MakeGrantBottomControl.vue"
export default {
    components:{
        Header, LeftNavi,SupportDetail,MakeGrantBottomControl
    }
}
</script>
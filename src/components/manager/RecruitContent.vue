<template>
        <div>
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <RecruitDetail></RecruitDetail>
        <MakeGrantBottomControl></MakeGrantBottomControl>
    </div>
    </div>
</template>

<script>
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"
import RecruitDetail from "./RecruitDetail.vue"
import MakeGrantBottomControl from "./Common/MakeGrantBottomControl.vue"
export default {
    components:{
        Header, LeftNavi,RecruitDetail,MakeGrantBottomControl
    }
}
</script>
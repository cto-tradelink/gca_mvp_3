<template>
        <div>
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <SelectMethodDetail></SelectMethodDetail>
        <MakeGrantBottomControl></MakeGrantBottomControl>
    </div>
    </div>
</template>

<script>
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"
import SelectMethodDetail from "./SelectMethodDetail.vue"
import MakeGrantBottomControl from "./Common/MakeGrantBottomControl.vue"
export default {
    components:{
        Header, LeftNavi,SelectMethodDetail,MakeGrantBottomControl
    }
}
</script>
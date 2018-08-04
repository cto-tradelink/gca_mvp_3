<template>
        <div>
    <Header></Header>
    <div>
        <LeftNavi></LeftNavi>
        <AttachedFileContent></AttachedFileContent>
        <MakeGrantBottomControl></MakeGrantBottomControl>
    </div>
    </div>

</template>

<script>
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"

import AttachedFileContent from "./AttachedFileContent.vue"



import MakeGrantBottomControl from "./Common/MakeGrantBottomControl.vue"
export default {
    components:{
        Header, LeftNavi,AttachedFileContent,MakeGrantBottomControl
    }
}
</script>
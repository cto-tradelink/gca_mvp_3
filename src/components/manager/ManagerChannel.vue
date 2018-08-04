<template>
<div>
    <Header></Header>
        <div>
            <LeftNavi></LeftNavi>
        </div>
        <div style="margin-left:132px;">
            <ChannelManager></ChannelManager>
        </div>

</div>
</template>

<script>
import Header from "./Common/Header.vue"
import LeftNavi from "./Common/LeftNavi.vue"
import ChannelManager from "../MyPage/MyChannel/ManageChannelDetail.vue"
export default {
    components:{
              Header, LeftNavi, ChannelManager
    },
    mounted:function(){
        $(document).ready(function(){
            $("#channel_navi").css("background-color","#f5f8ff")
            $("#page_ttl").text("채널 관리")
            $("#page_ttl").css("font-size", "24px");
            $("#channel_navi").css("border-bottom","1px solid #b3b6c9")
        })
    },

}
</script>

<style>

</style>

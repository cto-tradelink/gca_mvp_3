<template>
    <div id="startup_my_page" style="position:relative">
          <div id="startup_content">
            <div id="page_title">기업페이지</div>
            <div id="startup_info_con">
                <StartupHead ></StartupHead>
                <StartupBody ></StartupBody>
             
            </div>
        </div>
    </div>
</template>

<script>
import Startup from "../Startup/Startup.vue"
import StartupHead from "./StartupHead.vue"
import StartupBody from "./StartupBody.vue"

export default {
    data:function(){
        return{
            startup:{}
        }
    },
    components:{
         StartupHead, StartupBody,
    },
    mounted:function(){     

        var vue_obj=this
        $(document).ready(function(){
         $("#startup_header_con").css("margin-top","0")
         $("#startup_info_con").css("margin-top","32px")
         console.log("pre_this")
        //    vue_obj.$http.get(`/vue_get_startup_detail_manager/?id=`+localStorage.getItem("id"))
        //     .then((result) => {
        //     console.log("this!")
        //     console.log(result)
        //     vue_obj.startup = result.data
        //     console.log(vue_obj.startup)
        //     })
        })
      
    },

}
</script>
<style scoped>
    #page_title{
        opacity: 0.8;
        font-size: 20px;
        font-weight: bold;
        color: #1a2f53;
        margin-top: 40px;
    }
</style>

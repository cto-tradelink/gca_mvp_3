<template>
    <div id="make_application_page" style=" padding-bottom:200px;">
             <div id="application_header">
                <div id="title"><i style="font-size=20px;"  onclick="history.back();" class="fas fa-chevron-left"></i> &nbsp;&nbsp;&nbsp;공고문 작성중</div>
            </div>
            <div id="application_header_bottom">
            <ul>               
                <li v-on:click="go_link_0" >
                    <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/check.png"><div style="float:left; margin-left:8px;">사업개요</div>
                    </div>
                </li>                    
                <li><i class="fas fa-chevron-right"></i></li>
                <li v-on:click="go_link_1" >
                    <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/check.png"><div style="float:left; margin-left:8px;">지원내용</div>
                    </div>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li  v-on:click="go_link_2" >
                     <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/check.png"><div style="float:left; margin-left:8px;">모집개요</div>
                    </div>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li v-on:click="go_link_3" >
                    <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/check.png"><div style="float:left; margin-left:8px;">선정개요</div>
                    </div>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li v-on:click="go_link_4" >
                    <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/check.png"><div style="float:left; margin-left:8px;">제출서류</div>
                    </div>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li v-on:click="go_link_5" >
                    <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/pen.png"><div style="float:left; margin-left:8px;">기타</div>
                    </div>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li  v-on:click="go_link_6"  style="opacity:0.52">
                   <span>공고문 작성완료</span>
                </li>
            </ul>
            </div>


            <div id="grant_info_con">
                <div id="page_title">기타</div>           

                
                <div class="grant_info_con"  style="height:30px;padding-top:32px;padding-bottom:32px; margin-top:16px;">
                    <div class="input_con">
                    <div class="grant_info_title" id="select_info" style="line-height:32px;; display:inline-block; float:left;">선택입력사항</div>
                        <div id="checkbox_con"  style="display:inline-block">
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="opt_0" type="checkbox">행사일정</div>
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="opt_1" type="checkbox">FAQ</div>
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="opt_2" type="checkbox">추가문의처</div>
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="opt_3" type="checkbox">기타 안내사항</div>
                        </div>
                    </div>
                </div>


                <div class="grant_info_con">
                    <div class="grant_info_title">행사일정 </div>
                    <textarea type="text" id="ceremony" v-model="grant_info.ceremony"  class="input_normal" placeholder="행사일정을 입력하세요"></textarea>
                </div>
   
                <div class="grant_info_con">
                    <div class="grant_info_title">FAQ </div>
                    <textarea type="text" id="faq" class="input_normal"  v-model="grant_info.faq" placeholder="FAQ 를 입력하세요"></textarea>
                </div>
                   
                <div class="grant_info_con">
                    <div class="grant_info_title">추가문의처 </div>
                    <textarea type="text" id="additional_faq" v-model="grant_info.additional_faq"  class="input_normal" placeholder="추가문의처를 입력하세요"></textarea>
                </div>
                   
                <div class="grant_info_con">
                    <div class="grant_info_title">기타 안내사항 </div>
                    <textarea type="text" id="etc"  class="input_normal"  v-model="grant_info.etc" placeholder="기타 안내사항을 입력하세요"></textarea>
                </div>
         
            </div>
    </div>
</template>

<script>
function save(obj){
              var formData = new FormData();
                var grant_info ={}
                console.log(obj)
                grant_info["id"]=obj.$route.params.id
                grant_info["ceremony"]= $("#ceremony").text()
                grant_info["faq"]= $("#faq").text()
                grant_info["additional_faq"]= $("#additional_faq").text()
                grant_info["etc"]= $("#etc").text()               
                formData.append('json_data', JSON.stringify(grant_info));    
                obj.$http.post(`/vue_set_grant_6/`, formData)
}

export default {
    data:function(){
        return{
            grant_info:{

                }
            }
        },
    beforeRouteLeave (to, from, next) {
        if(confirm("페이지를 벗어나시겠습니까?")){
            next()
            }
        },
    methods:{
        go_link_0:function(){
            var result = confirm("현재 작성 내용을 저장후 이동하시겠습니까?")
            if (result == true){
                save(this);
            }
            this.$router.push("/manager/make/grant/"+this.$route.params.id)            
        },
        go_link_1:function(){
              var result = confirm("현재 작성 내용을 저장후 이동하시겠습니까?")
            if (result == true){
                save(this);
            }
            this.$router.push("/manager/make/grant/"+this.$route.params.id+"/support_content")     
        },
        go_link_2:function(){
            var result = confirm("현재 작성 내용을 저장후 이동하시겠습니까?")
            if (result == true){
                save(this);
            }
                this.$router.push("/manager/make/grant/"+this.$route.params.id+"/recruit_content")
        },
        go_link_3:function(){
            var result = confirm("현재 작성 내용을 저장후 이동하시겠습니까?")
            if (result == true){
                save(this);
            }      
        this.$router.push("/manager/make/grant/"+this.$route.params.id+"/select_method")
        },
        go_link_4:function(){
            var result = confirm("현재 작성 내용을 저장후 이동하시겠습니까?")
            if (result == true){
                save(this);
            }
      
        this.$router.push("/manager/make/grant/"+this.$route.params.id+"/attached_file")
           
        },
        go_link_5:function(){
            var result = confirm("현재 작성 내용을 저장후 이동하시겠습니까?")
            if (result == true){
                save(this);
            }
      
        this.$router.push("/manager/make/grant/"+this.$route.params.id+"/etc")
        },
        go_link_6:function(){
            var result = confirm("현재 작성 내용을 저장후 이동하시겠습니까?")
            if (result == true){
                save(this);
            }      
        this.$router.push("/manager/make/grant/"+this.$route.params.id+"/complete")
        },
        apply_save:function(){
            var formData = new FormData();
            var grant_info ={}
            console.log(this)
            grant_info["id"]=this.$route.params.id
            grant_info["ceremony"]= $("#ceremony").val()
            grant_info["faq"]= $("#faq").val()
            grant_info["additional_faq"]= $("#additional_faq").val()
            grant_info["etc"]= $("#etc").val()                
            formData.append('json_data', JSON.stringify(grant_info));    
            this.$http.post(`/vue_set_grant_6/`, formData)
            .then((result) => {  
                alert("저장하였습니다.")
            })    
        },
        apply_next:function(){
            var formData = new FormData();
            var grant_info ={}
            console.log(this)
            grant_info["id"]=this.$route.params.id
            grant_info["ceremony"]= $("#ceremony").val()
            grant_info["faq"]= $("#faq").val()
            grant_info["additional_faq"]= $("#additional_faq").val()
            grant_info["etc"]= $("#etc").val()                
            formData.append('json_data', JSON.stringify(grant_info));    
            this.$http.post(`/vue_set_grant_6/`, formData)
            .then((result) => {  
                this.$router.push("/manager/make/grant/"+ this.$route.params.id +"/complete")
            })  
        }
    },  
    mounted:function(){
        var vue_obj = this       
        vue_obj.$http.get("/vue_get_grant_information?id="+vue_obj.$route.params.id)
        .then((res)=>{
            vue_obj.grant_info = res.data
        })    
        $("#gca_content").css("background-color","#fdfeff")       
        }
}
</script>

<style scoped>
.grant_info_con>span{
    color: #1b66f4;
    font-size: 14px;
    margin-top: 24px;
    margin-right: 115px;
    display: inline-block;
}
#etc{
  font-size: 16px;
  color: #a0a3bc;
}
.grant_info_con{
    width: 1144px;
    padding-left: 40px;
    margin-left:52px;
    margin-top:8px;
    background-color:#fff;
}

  #make_application_page{
        overflow-x: hidden;
        background-color: #f4f7fa;
    }

.fa-calendar{
    font-size: 20px;
    margin-right:9px;
}
.date{
    width: 258px;
    height: 38px;
    background-color: #ffffff;
    border: solid 1px #ced4da;
    line-height: 38px;
    padding-left: 20px;
    font-size:14px;
}
#input_file{
    border: none;
    position: absolute;
    top:64px;
    right:16px;
}
#file_ttl{
    position: absolute;
    top:15px;
    left:16px;
    color: #1b82f4;
}
#file_ttl>span{
    font-size: 12px;
    color: #a0a3bc;
}

#poster_file_con{
    margin-top: 24px;
    width: 1016px;
    height: 101px;
    background-color: #ffffff;
    border: solid 1px #ced4da;
    position: relative;
}
.input_normal{
    width:1224px;
    border: none;
    outline: none;
    font-size: 14px;
    color: #1a2f53;
    margin-top: 24px;
    background-color: transparent
   
}
.grant_info_con{
    width: 1224px;  
    margin-left:52px;
    margin-top:48px;
}
.grant_info_title{
    width:196px;;
    float: left;
    font-size: 16px;
    color: #243d68;
    height: 44px;
    line-height: 44px;
}
.grant_info_title>span{
    font-size: 12px;
    color: #a0a3bc;
    display: inline-block;
    margin-left: 24px;
}

#grant_info_con{
    width:100%;
    margin-left: 64px; 


}
#page_title{
    margin-left: 52px;
    margin-top: 44px;
    font-size: 20px;
    font-weight: 900;
    color: #1a2f53;
}


  #make_application_page{
        overflow-x: hidden;
    }
    #application_header_bottom{
        width: 100%;
        height: 48px;
        background-color: rgba(206, 212, 218, 0.35);
        margin-left: 64px;
        padding-left: 52px;
        line-height: 48px;
        font-size: 16px;
        color: #243d68;
    }
    #application_header{
        width:100%;
        position: relative;
        overflow: auto;
        height:96px;
        background-color: #2256b8;
        margin-left: 64px;
        font-size: 24px;
        letter-spacing: -1px;
        color: #f9fcff;

    }
    #title{
        color: #fff;
        margin-top:32px;
        margin-left:52px;
    }
    li{
    list-style: none;
    float: left;
    margin-right: 24px;
    line-height: 48px;
}
</style>

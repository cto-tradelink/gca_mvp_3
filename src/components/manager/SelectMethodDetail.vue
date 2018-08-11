<template>
    <div id="make_application_page">
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
                <li v-on:click="go_link_2"  >
                     <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/check.png"><div style="float:left; margin-left:8px;">모집개요</div>
                    </div>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li v-on:click="go_link_3" >
                    <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/pen.png"><div style="float:left; margin-left:8px;">선정개요</div>
                    </div>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li  v-on:click="go_link_4" style="opacity:0.52">
                    <span style="background-color:#fff;font-size:16px; width:24px; height:24px; display:inline-block; text-align:center;line-height:24px;border-radius:12px;margin-right:8px;">5</span>제출서류</span>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li v-on:click="go_link_5"  style="opacity:0.52">
                    <span style="background-color:#fff;font-size:16px; width:24px; height:24px; display:inline-block; text-align:center;line-height:24px;border-radius:12px;margin-right:8px;">6</span>기타</span>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li  v-on:click="go_link_6"  style="opacity:0.52">
                   <span>공고문 작성완료</span>
                </li>
            </ul>
            </div>

            

            <div id="grant_info_con">
                <div id="page_title">선정개요</div>
              
                <div class="grant_info_con"  style="clear:both;  height:432px; padding-top:32px; background-color:#fff;">
                    <div class="grant_info_title" style="float:left; margin-left:40px">선정방법</div>
                    <tinymce id="d1" v-model="grant_info.prefer" :other_options="options"  style="width: 968px;float:left">
                       선정 방식, 선정 규모 기재
                    </tinymce>
                   </div>
              
                 <div class="grant_info_con" style="height:104px;line-height:104px;">
                    <div class="grant_info_title" style="margin-bottom:24px; float:left;line-height:104px;"> 심사일정</div>
                    <div style="float:left">
                    <datetime style="line-height:initial" v-model="grant_info.pro_0_start"></datetime>  에서 
                    <datetime style="line-height:initial" v-model="grant_info.pro_0_end"></datetime>  까지
                    </div>
              
                    <br> 
                    </div>
             
                
                                    <div class="grant_info_con" style="height:104px;line-height:104px;">
                    <div class="grant_info_title" style="margin-bottom:24px; float:left;line-height:104px;"> 발표일정</div>
                   <div style="float:left" >
                    <datetime style="line-height:initial" v-model="grant_info.pro_1_open"></datetime>  <br> 
                   </div>
                </div>              

               <div class="grant_info_con" style="clear:both;  height:432px; padding-top:32px; background-color:#fff;">
                    <div class="grant_info_title"  style="float:left; margin-left:40px;" >심사기준</div>
                    <tinymce id="d2"  :other_options="options"   v-model="grant_info.pro_0_criterion" style="width: 968px;float:left;">
                       ex. 역량(20), 기획력(30), 시장전망(20)
                    </tinymce>

                </div>
                
                <div class="grant_info_con"  style="height:30px;padding-top:32px;padding-bottom:32px; margin-top:16px;">
                    <div class="input_con">
                    <div class="grant_info_title" id="select_info" style="line-height:32px;; display:inline-block; float:left;">선택입력사항</div>
                        <div id="checkbox_con"  style="display:inline-block">
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="opt_0" type="checkbox">2차 심사</div>
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="opt_1" type="checkbox">3차 심사</div>
                        </div>
                    </div>
                </div>

            
                <div class="opt_0 hidden">
                    
                <div id="page_title">2차 심사</div>
                <div class="grant_info_con"  style="clear:both;  height:432px; padding-top:32px; background-color:#fff;">
                    <div class="grant_info_title" style="float:left; margin-left:40px">선정방법</div>
                    <tinymce id="second_decision" v-model="grant_info.pro_1_choose" :other_options="options"  style="width: 968px;float:left">
                       선정 방식, 선정 규모 기재
                    </tinymce>
                   </div>
               <div class="grant_info_con" style="height:104px;line-height:104px;">
                    <div class="grant_info_title" style="margin-bottom:24px; float:left;line-height:104px;"> 심사일정</div>
                    <div style="float:left">
                    <datetime style="line-height:initial" v-model="grant_info.pro_1_start"></datetime>  에서 
                    <datetime style="line-height:initial" v-model="grant_info.pro_1_end"></datetime>  까지
                    </div>
              
                    <br> 
                    </div>
                
                                    <div class="grant_info_con" style="height:104px;line-height:104px;">
                    <div class="grant_info_title" style="margin-bottom:24px; float:left;line-height:104px;"> 발표일정</div>
                   <div style="float:left" >
                    <datetime style="line-height:initial" v-model="grant_info.pro_1_open"></datetime>  <br> 
                   </div>
                </div>
              

               <div class="grant_info_con" style="clear:both;  height:432px; padding-top:32px; background-color:#fff;">
                    <div class="grant_info_title"  style="float:left; margin-left:40px;" >심사기준</div>
                    <tinymce id="second_test"  :other_options="options"   v-model="grant_info.pro_0_criterion" style="width: 968px;float:left;">
                       ex. 역량(20), 기획력(30), 시장전망(20)
                    </tinymce>

                </div>
                </div>


 <div class="opt_1 hidden">
                    
                <div id="page_title">3차 심사</div>
                <div class="grant_info_con"  style="clear:both;  height:432px; padding-top:32px; background-color:#fff;">
                    <div class="grant_info_title" style="float:left; margin-left:40px">선정방법</div>
                    <tinymce id="third_decision" v-model="grant_info.pro_2_choose" :other_options="options"  style="width: 968px;float:left">
                       선정 방식, 선정 규모 기재
                    </tinymce>
                   </div>
              
                <div class="grant_info_con" style="height:104px;line-height:104px;">
                    <div class="grant_info_title" style="margin-bottom:24px; float:left;line-height:104px;"> 심사일정</div>
                    <div style="float:left">
                    <datetime style="line-height:initial" v-model="grant_info.pro_2_start"></datetime>  에서 
                    <datetime style="line-height:initial" v-model="grant_info.pro_2_end"></datetime>  까지
                    </div>              
                    <br> 
                    </div>
             
                
                  <div class="grant_info_con" style="height:104px;line-height:104px;">
                    <div class="grant_info_title" style="margin-bottom:24px; float:left;line-height:104px;"> 발표일정</div>
                   <div style="float:left" >
                    <datetime style="line-height:initial" v-model="grant_info.pro_2_open"></datetime>  <br> 
                   </div>
                </div>
              

               <div class="grant_info_con" style="clear:both;  height:432px; padding-top:32px; background-color:#fff;">
                    <div class="grant_info_title"  style="float:left; margin-left:40px;" >심사기준</div>
                    <tinymce id="third_test"  :other_options="options"   v-model="grant_info.pro_2_criterion" style="width: 968px;float:left;">
                       ex. 역량(20), 기획력(30), 시장전망(20)
                    </tinymce>

                </div>
                </div>











         
            </div>
    </div>
</template>

<script>


        function save(obj){
      var formData = new FormData();
                var grant_info ={}
                grant_info["id"]=obj.$route.params.id
                grant_info["pro_0_choose"] = obj.data
                grant_info["pro_0_start"] = $("#start").val()
                grant_info["pro_0_end"] = $("#end").val()
                grant_info["pro_0_open"] = $("#pro_0_open").val()
                grant_info["pro_0_criterion"] = obj.data2
                grant_info["pro_1_criterion"] = $("#pro_1").text()
                grant_info["pro_2_criterion"] = $("#pro_2").text()

                console.log(grant_info)

                formData.append('json_data', JSON.stringify(grant_info));    
                obj.$http.post(`${obj.baseURI}/vue_set_grant_4/`, formData)
}

export default {
   
   methods:{
        toggle_input_third_con:function(){

        },
        go_link_0:function(){
            var result = confirm("현재 작성 내용을 저장후 이동하시겠습니까?")
            if (result == true){
                save(this);
            }
            this.$router.push("/manager/make/grant/"+this.$route.params.id)            
        },
        go_link_1:function(){
            
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
        apply_next:function(){
            var formData = new FormData();
            var grant_info ={}
                grant_info["id"]=this.$route.params.id
                grant_info["pro_0_choose"] = this.grant_info.pro_0_choose
                grant_info["pro_0_start"] = this.grant_info.pro_0_start
                grant_info["pro_0_end"] = this.grant_info.pro_0_end
                grant_info["pro_0_open"] = this.grant_info.pro_0_open
                grant_info["pro_0_criterion"] = this.grant_info.pro_0_criterion
                grant_info["pro_1_choose"] = this.grant_info.pro_1_choose
                grant_info["pro_2_choose"] = this.grant_info.pro_1_choose
                grant_info["open_method"] = this.grant_info.open_method
                console.log(grant_info)
                formData.append('json_data', JSON.stringify(grant_info));    
                this.$http.post(`/vue_set_grant_4/`, formData)
                .then((result) => {            
                     this.$router.push("/manager/make/grant/"+ this.$route.params.id +"/attached_file")
                })    
        },
        apply_save:function(){
                var formData = new FormData();
                var grant_info ={}
                grant_info["id"]=this.$route.params.id
                grant_info["pro_0_choose"] = this.grant_info.pro_0_choose
                grant_info["pro_0_start"] = this.grant_info.pro_0_start
                grant_info["pro_0_end"] = this.grant_info.pro_0_end
                grant_info["pro_0_open"] = this.grant_info.pro_0_open
                grant_info["pro_0_criterion"] = this.grant_info.pro_0_criterion
                grant_info["pro_1_choose"] = this.grant_info.pro_1_choose
                grant_info["pro_2_choose"] = this.grant_info.pro_1_choose
                grant_info["open_method"] = this.grant_info.open_method

                console.log(grant_info)

                formData.append('json_data', JSON.stringify(grant_info));    
                this.$http.post(`/vue_set_grant_4/`, formData)
                .then((result) => {            
                    alert("저장되었습니다.")
                })    
        },
    },  
    data:function(){
        return {
            data:"",
            data2:"",
            grant_info:{
                apply_start:"",
                apply_end : "",
            },
    options:{
                height:308,
            },
        }
    },
         beforeRouteLeave (to, from, next) {
        if(confirm("페이지를 벗어나시겠습니까?")){
            next()
        }
  },
    mounted:function(){
        var vue_obj = this
        $(document).ready(function(){

           vue_obj.$http.get("/vue_get_grant_information?id="+vue_obj.$route.params.id)
           .then((res)=>{
                vue_obj.grant_info = res.data
           })                                   
            $(document).off("click","input[type='checkbox']")
            $(document).on("click","input[type='checkbox']",function(){
                if( $(this).is(":checked")){
                    $("."+$(this).attr("data-index")).removeClass("hidden")
                }
                else{
                    $("."+$(this).attr("data-index")).addClass("hidden")
                }
              
            })

            $("#gca_content").css("background-color","#fdfeff")
            
            })
    }
}
</script>
<style>
.vdatetime{
    display: inline-block;
}
  
.vdatetime-input{
        width: 258px;
    height: 38px;
    background-color: #ffffff;
    border: solid 1px #ced4da;
    line-height: 38px;
    padding-left: 20px;
    font-size: 14px;
    display: inline-block;
}
</style>
<style scoped>
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
    background-color:#fff;
}
.grant_info_title{
    margin-left:40px;
    width:162px;

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
#page_title,.page_title{
    margin-left: 52px;
    margin-top: 44px;
    font-size: 24px;
    
    color: #1a2f53;
}


  #make_application_page{
        overflow-x: hidden;
        padding-bottom:200px;
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

  #make_application_page{
        overflow-x: hidden;
        background-color : #f4f7fa;;
    }
    
</style>

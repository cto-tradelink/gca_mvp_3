<template>
    <div id="make_application_page" style=" padding-bottom:200px;">
             <div id="application_header">
                <div id="title"><i style="font-size=20px;" class="fas fa-chevron-left"></i> &nbsp;&nbsp;&nbsp;공고문 작성중</div>
            </div>
            <div id="application_header_bottom">
            <ul>               
                <li class="grant_hd_menu">
                    <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/pen.png"><div style="float:left; margin-left:8px;">사업개요</div>
                    </div>
                </li>                    
                <li><i class="fas fa-chevron-right"></i></li>
                <li class="grant_hd_menu" v-on:click="go_link_1" style="opacity:0.52">                    
                    <span style="background-color:#fff;font-size:16px; width:24px; height:24px; display:inline-block; text-align:center;line-height:24px;border-radius:12px;margin-right:8px;">2</span>지원내용</span>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li class="grant_hd_menu"  v-on:click="go_link_2"  style="opacity:0.52">
                    <span style="background-color:#fff;font-size:16px; width:24px; height:24px; display:inline-block; text-align:center;line-height:24px;border-radius:12px;margin-right:8px;">3</span>모집개요</span>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li  class="grant_hd_menu" v-on:click="go_link_3"  style="opacity:0.52">
                    <span style="background-color:#fff;font-size:16px; width:24px; height:24px; display:inline-block; text-align:center;line-height:24px;border-radius:12px;margin-right:8px;">4</span>선정개요</span>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li class="grant_hd_menu" v-on:click="go_link_4"  style="opacity:0.52">
                    <span style="background-color:#fff;font-size:16px; width:24px; height:24px; display:inline-block; text-align:center;line-height:24px;border-radius:12px;margin-right:8px;">5</span>제출서류</span>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li class="grant_hd_menu" v-on:click="go_link_5"  style="opacity:0.52">
                    <span style="background-color:#fff;font-size:16px; width:24px; height:24px; display:inline-block; text-align:center;line-height:24px;border-radius:12px;margin-right:8px;">6</span>기타</span>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li class="grant_hd_menu" v-on:click="go_link_6"   style="opacity:0.52">
                   <span>공고문 작성완료</span>
                </li>
            </ul>



            </div>
                <div id="grant_info_con">
               <div id="page_title">사업개요</div>
                <div class="grant_info_con"  style="height:172px;padding-top:32px;padding-bottom:32px;">
                    <div class="input_con">
                    <div class="grant_info_title" style="height:64px;">지원사업명</div>
                    <input type="text"  v-model="grant_info.title" id="title_input" class="input_normal" maxlength="80" placeholder="기업이 참여하게 되는 사업명을 입력해 주세요. ex)넥스트 스타트업 어워드">
                    </div>
                    <div class="input_con">
                    <div class="grant_info_title" style="height:64px;">태그추가</div>
                    <input type="text" v-on:keyup="make_hash($event)" v-model="grant_info.title_tag" id="tag_input" class="input_normal" value="#" placeholder="#해시태그 #입력 #해주세요 #띄어쓰기로구분">
                    </div>
                    <div class="input_con">
                    <div class="grant_info_title" style="height:64px;">지원사업 한줄소개 </div>
                    <input type="text" id="short_desc_input"  v-model="grant_info.short_desc"  class="input_normal" placeholder="띄어쓰기포함 22 글자">
                    </div>
                    
                </div>



                <div class="grant_info_con"  style="height:30px;padding-top:32px;padding-bottom:32px; margin-top:16px;">
                    <div class="input_con">
                    <div class="grant_info_title" id="select_info" style="line-height:32px;; display:inline-block; float:left;">선택입력사항</div>
                        <div id="checkbox_con"  style="display:inline-block">
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="0" type="checkbox">포스터</div>
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="1" type="checkbox">지원사업명(하위)</div>
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="2" type="checkbox">진행기간</div>
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="3" type="checkbox">사업목적</div>
                            <div class="ch" style="float:left; padding-top:4px;"><input data-index="4" type="checkbox">사업내용</div>                     
                        </div>
                    </div>
                </div>


                 <div class="grant_info_con hidden opt" style="height:134px;">
                    <div class="grant_info_title" style="display:inline-block;float:left;margin-top:33px;">포스터 </div>
                    <div style="display:inline-block;  margin-top: 29px;">
                    <div id="poster_file_con">                     
                        <input id="input_file" type="file">
                    </div> 
                    <span class="file_cap">파일 용량 1MB이내, jpeg, jpg, png 파일 가능.</span>
                    </div>
                </div>

                 <div class="grant_info_con hidden opt" style="padding-top:32px; padding-bottom:22px">
                    <div class="grant_info_title" style="float:left;">지원사업 명(하위)</div>
                    <div style="display:inline-block">
                    <input type="text" id="sub_title_input"  v-model="grant_info.title_sub"  class="input_normal" placeholder="기업이 참여하게 되는 사업명을 입력해 주세요. ex)넥스트 스타트업 어워드">
                 <br><span class="file_cap">파일 용량 1MB이내, jpeg, jpg, png 파일 가능.</span>
                 </div>
                </div>

                 <div class="grant_info_con hidden opt">
                    <div class="grant_info_title" style="margin-bottom:24px;padding-top:32px ;float:left;">진행기간</div>
                    <div style="display:inline-block;     margin-top: 18px;  margin-bottom: 18px;">                    
                    <div> 
                        <datetime class="make_grant" v-model="grant_info.business_period_start"></datetime>
                     에서    <datetime class="make_grant" v-model="grant_info.business_period_end"></datetime> 까지
                     </div>
                     <span class="file_cap">사업(행사) 진행기간</span></div>
                </div>              
                 <div class="grant_info_con hidden opt" style="clear:both;  height:432px; padding-top:32px">
                    <div class="grant_info_title" style="float:left">사업목적 </div>
                    <tinymce type="text" :other_options="options" id="subject" style="height:272px;width: 968px;float:left" v-model="grant_info.subject"  placeholder="사업목적을 입력하세요"></tinymce>
               
                </div>
                <div class="grant_info_con hidden opt" style="height:432px; padding-top:32px">
                    <div class="grant_info_title" style="float:left">사업내용</div>
                    <tinymce type="text" :other_options="options" id="business_detail" style="height:272px;width: 968px;float:left" v-model="grant_info.business_detail"  placeholder="사업내용을 입력하세요"></tinymce>
                </div>
            </div>
    </div>
</template>

<script>


export default {
    methods:{
        go_link_1:function(){
            if(this.id !="new" && this.id!=undefined){
                this.$router.push("/manager/make/grant/"+this.id+"/support_content")
            }
            else{
                alert("내용 작성후 '다음'버튼을 클릭해서 진행하세요.")
            }
        },
        go_link_2:function(){
            if(this.id !="new" && this.id!=undefined){
                this.$router.push("/manager/make/grant/"+this.id+"/recruit_content")
            }
            else{
                alert("내용 작성후 '다음'버튼을 클릭해서 진행하세요.")
            }
        },
        go_link_3:function(){
            if(this.id !="new" && this.id!=undefined){
                this.$router.push("/manager/make/grant/"+this.id+"/select_method")
            }
            else{
                alert("내용 작성후 '다음'버튼을 클릭해서 진행하세요.")
            }
        },
        go_link_4:function(){
            if(this.id !="new" && this.id!=undefined){
                this.$router.push("/manager/make/grant/"+this.id+"/attached_file")
            }
            else{
                alert("내용 작성후 '다음'버튼을 클릭해서 진행하세요.")
            }
        },
        go_link_5:function(){
            if(this.id !="new" && this.id!=undefined){
                this.$router.push("/manager/make/grant/"+this.id+"/etc")
            }
            else{
                alert("내용 작성후 '다음'버튼을 클릭해서 진행하세요.")
            }
        },
        go_link_6:function(){
            if(this.id !="new" && this.id!=undefined){
                this.$router.push("/manager/make/grant/"+this.id+"/complete")
            }
            else{
                alert("내용 작성후 '다음'버튼을 클릭해서 진행하세요.")
            }
        },
        apply_save:function(){
              
                var formData = new FormData();
                var file = document.querySelector('#input_file');
                formData.append("file", file.files[0]);
                var data={}
                var grant_info ={}
                grant_info["id"]=this.$route.params.id
                grant_info["title"] = $("#title_input").val()
                grant_info["tag"] = $("#tag_input").val()
                grant_info["short_desc"] = $("#short_desc_input").val()
                grant_info["poster"] = $("#input_file").val().replace(/^.*[\\\/]/, '') 
                grant_info["sub_title"] = $("#sub_title_input").val()
                console.log(this.grant_info.business_period_start)
                grant_info["start"] = this.grant_info.business_period_start
                grant_info["end"] = this.grant_info.business_period_end
                grant_info["location"] = $("#location").val()
                grant_info["subject"] = $("#subject").text()
                grant_info["business_detail"] = $("#business_detail").text()
                grant_info["step"] = "1"
                formData.append('json_data', JSON.stringify(grant_info));    
                this.$http.post(`/vue_set_grant_1/`, formData)
                .then((result) => {  
                    console.log(result)          
                    var id= result.data.result;
                    this.id = result.data.result;
                })   
        },
        apply_next:function(){
           
                var formData = new FormData();
                var file = document.querySelector('#input_file');
                formData.append("file", file.files[0]);
                var data={}
                var grant_info ={}
                grant_info["user_id"]= localStorage.getItem("id")
                grant_info["id"]=this.$route.params.id
                grant_info["title"] = $("#title_input").val()
                grant_info["tag"] = $("#tag_input").val()
                grant_info["short_desc"] = $("#short_desc_input").val()
                grant_info["poster"] = $("#input_file").val().replace(/^.*[\\\/]/, '') 
                grant_info["sub_title"] = $("#sub_title_input").val()
                console.log(this.grant_info.business_period_start)
                grant_info["start"] = this.grant_info.business_period_start.split("T")[0]
                grant_info["end"] = this.grant_info.business_period_end.split("T")[0]
                grant_info["location"] = $("#location").val()
                grant_info["subject"] = this.grant_info.subject
                grant_info["business_detail"] =  this.grant_info.business_detail
                grant_info["step"] = "1"
                
                formData.append('json_data', JSON.stringify(grant_info));    
                this.$http.post(`/vue_set_grant_1/`, formData)
                .then((result) => {  
                    console.log(result)          
                    var id= result.data.result;
                    this.id = result.data.result;
                    this.$router.push("/manager/make/grant/"+id+"/support_content")
                }) 
        },
        make_hash:function(e){
            console.log("sdf")
            this.grant_info.title_tag = ("#"+this.grant_info.title_tag.substring(1,this.grant_info.title_tag.length)).replace("##","#").replace(/\s/g,"#")
            this.grant_info.title_tag =  this.grant_info.title_tag.replace("##","#")
            
        }
    },
    data:function(){
        return{
            options:{
                height:308,
            },
        grant_info:{},
    
            test:"",
            test2:""
        }
    },
    mounted:function(){
        var vue_obj = this
        $(document).ready(function(){

              $(document).on("click","#apply_next",function(){
                  vue_obj.apply_next();
              })
            $(document).off("click","input[type='checkbox']")
            $(document).on("click","input[type='checkbox']",function(){
                if( $(this).is(":checked") ){
                   $(".opt").eq($(this).attr("data-index")).removeClass("hidden")
                }else{
                  $(".opt").eq($(this).attr("data-index")).addClass("hidden")
                }
            })
            $("#gca_content").css("background-color","#fdfeff")
         

            if (vue_obj.$route.params.id != "new"){
                //아이디가 있다면 어디까지 썻는지에 대한 데이터가 있을것..  
              vue_obj.$http.get("/vue_get_grant_information?id="+vue_obj.$route.params.id,)
              .then((res)=>{
                  vue_obj.grant_info = res.data
              })
             
            }
            

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
<style lang="scss" scoped>

ul{
    -webkit-margin-before:0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
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
border:none;
margin:10px
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
      width: 496px;
  height: 40px;
  background-color: #ffffff;
  border: solid 1px #c1d1f7;
}
.input_normal{
    width: 476px;
  height: 36px;
  font-size: 14px;
  line-height: 1.86;
  letter-spacing: -0.1px;
  color: rgba(26, 42, 83, 0.5);
  padding-left: 20px;
   
}
.grant_info_con{
    width: 1144px;
    padding-left: 40px;
    margin-left:52px;
    margin-top:8px;
    background-color:#fff;
}
.grant_info_title{
    width:162px;
    display:inline-block;    
    font-size: 17px;
    color: #1a2f53;
  
    height: 56px;
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
        background-color: #f4f7fa;
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
.ch{
    margin-right: 121px;
}
.ch:last-child{
    margin-right: 0px;
}

.file_cap{
     width: 230px;
  height: 22px;
  font-family: NotoSansCJKkr;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.83;
  letter-spacing: normal;
  color: rgba(26, 42, 83, 0.5);
}

#select_info{
  height: 28px;
  opacity: 0.5;
  font-size: 17px;
  line-height: 1.65;
  letter-spacing: -0.3px;
  color: #1a2f53;
    opacity: 0.8;
}
</style>
<style>
.make_grant>.vdatetime-input{
    width:124px;
}
</style>
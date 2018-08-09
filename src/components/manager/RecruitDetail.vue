<template>
    <div id="make_application_page" style=" padding-bottom:200px;">
             <div id="application_header">
                <div id="title"><i style="font-size=20px;"  onclick="history.back();" class="fas fa-chevron-left"></i> &nbsp;&nbsp;&nbsp;공고문 작성중</div>
            </div>
            <div id="application_header_bottom">
            <ul>               
                 <li v-on:click="go_link_0">
                    <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/check.png"><div style="float:left; margin-left:8px;">사업개요</div>
                    </div>
                </li>                    
                <li><i class="fas fa-chevron-right"></i></li>
                <li  v-on:click="go_link_1">
                    <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/check.png"><div style="float:left; margin-left:8px;">지원내용</div>
                    </div>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li  v-on:click="go_link_2">
                     <div>
                        <img style="float:left; margin-top:12px;" src="/static/img/pen.png"><div style="float:left; margin-left:8px;">모집개요</div>
                    </div>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li  v-on:click="go_link_3" style="opacity:0.52">
                    <span style="background-color:#fff;font-size:16px; width:24px; height:24px; display:inline-block; text-align:center;line-height:24px;border-radius:12px;margin-right:8px;">4</span>선정개요</span>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li  v-on:click="go_link_4" style="opacity:0.52">
                    <span style="background-color:#fff;font-size:16px; width:24px; height:24px; display:inline-block; text-align:center;line-height:24px;border-radius:12px;margin-right:8px;">5</span>제출서류</span>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li  v-on:click="go_link_5" style="opacity:0.52">
                    <span style="background-color:#fff;font-size:16px; width:24px; height:24px; display:inline-block; text-align:center;line-height:24px;border-radius:12px;margin-right:8px;">6</span>기타</span>
                </li>
                <li><i class="fas fa-chevron-right"></i></li>
                <li  v-on:click="go_link_6" style="opacity:0.52">
                   <span>공고문 작성완료</span>
                </li>
            </ul>
            </div>
            <div id="grant_info_con">
                <div id="page_title">모집개요</div>               
                 <div class="grant_info_con" style="background-color:#fff; ">
                    <div class="grant_info_title" style="padding-bottom:24px; padding:15px;padding-left:40px;"> 모집기간</div>
                    <div style="padding-top:10px;padding-bottom:10px;">
                        <div>
                            <datetime class="recruit" v-model="grant_info.apply_start"></datetime>  부터  <datetime class="recruit" v-model="grant_info.apply_end"  type="datetime"  :minute-step="30" ></datetime> 까지
                        </div>
                    <span class="file_cap">공고 진행기간</span>
                    </div>
                </div>
             
                 <div class="grant_info_con" style="background-color:#fff; ; padding:40px; width:1154px; ">
                    <div class="grant_info_title" style="">모집조건</div>
                    <ul style="display:inline-block">
                        <li class="row"><span class="filter_title">업력</span><span class="filter">3년이내</span>
                        <span class="filter">5년이내</span><span class="filter">7년이내</span><span class="filter">제한없음</span>
                        </li>
                        <li class="row"><span class="filter_title">기업형태</span><span class="filter">개인사업자</span>
                        <span class="filter">법인사업자</span><span class="filter">예비창업자</span><span class="filter">제한없음</span>
                        </li>
                        <li class="row"><span class="filter_title">기업단계</span><span class="filter">기획/개발</span>
                        <span class="filter">MVP 보유기업</span><span class="filter">상품/상용화</span>
                        </li>
                        <li class="row"><span class="filter_title">소재지</span><span class="filter">경기도 기업</span>
                        <span class="filter">경기도 이전 예정</span><span class="filter">경기도 기업 이용기업</span>
                        <span class="filter">경기도 거주 임직원</span><span class="filter">경기도 외 기업</span>
                        </li>
                    </ul>
                    <div id="ch1"><input type="checkbox">기타 장르<input style="margin-left:75px;width:470px;height:40px; padding-left:20px; border: solid 1px #e7edfc;" class="input_normal" type="text"> 
                        </div>
                 </div>
                 <div class="grant_info_con"  style="background-color:#fff; ; padding:40px; width:1154px; ">
                  
                    <div class="grant_info_title">모집분야</div>
                   <table style="border-collapse:collapse; clear:left">
            <tr>
                <td id="f_col" class="col_name" style="height:73px;font-size: 14px;  font-weight: bold;  color: #243d68;">
                     <div>
                        <div></div>
                        기본장르
                    </div>
                </td>
                <td>
                    <span v-on:click="add_tag($event)" class="filter" v-for="t in filter_table_item.base">{{t}}</span>
                </td>
            </tr>
            <tr>
                <td class="col_name" style="vertical-align:top; padding-top:22px;font-size: 14px;font-weight: bold;">
                    <div style="padding-top:15px">
                        <div></div>
                        특수장르
                    </div>                    
                </td>
                <td style="padding-top: 22px;">
                    <ul id="f_li">
                        <li>
                            <div>
                                <span class="filter_ttl">창작</span> 
                                <ul class="filter_ul">
                                    <li class="filter"  v-for="t in filter_table_item.create">{{t}}</li>
                                </ul> 
                            </div>                                            
                        <li>
                            <div>
                                <span class="filter_ttl">IT 관련</span> 
                                <ul class="filter_ul">
                                    <li class="filter"  v-for="t in filter_table_item.it">{{t}}</li>
                                </ul>
                            </div>                        
                        <li>
                            <div>
                                <span class="filter_ttl">창업</span>
                                <ul class="filter_ul">
                                    <li class="filter"  v-for="t in filter_table_item.startup">{{t}}</li>
                                </ul>
                            </div>  
                        <li >
                            <div>
                                <span class="filter_ttl">제조/융합</span>
                                <ul class="filter_ul">
                                    <li class="filter"   v-for="t in filter_table_item.manufacture">{{t}}</li>
                                </ul>  
                            </div>
                        <li>
                            <div>
                                <span class="filter_ttl">신규산업</span>
                                <ul class="filter_ul">
                                    <li class="filter"  v-for="t in filter_table_item.new">{{t}}</li>
                                </ul>  
                            </div>
                        <li >
                            <div>
                                <span class="filter_ttl">기타</span>
                                <ul class="filter_ul">
                                    <li class="filter"  v-for="t in filter_table_item.etc">{{t}}</li>
                                </ul>  
                            </div>
                        </li>
                    </ul>
                </td>
            </tr>
        </table>
        <div id="ch2"><input type="checkbox">기타 장르<input style="margin-left:75px;width:470px;height:40px; padding-left:20px; border: solid 1px #e7edfc;" class="input_normal" type="text"> 
        </div>
        </div>
            <div class="grant_info_con"  style="height:30px;padding-top:32px;padding-bottom:32px; margin-top:16px;">
                <div class="input_con">
                <div class="grant_info_title" id="select_info" style="line-height:32px;; display:inline-block; float:left;">선택입력사항</div>
                    <div id="checkbox_con"  style="display:inline-block">
                        <div class="ch" style="float:left; padding-top:4px;"><input data-index="0" type="checkbox">우대사항</div>
                        <div class="ch" style="float:left; padding-top:4px;"><input data-index="1" type="checkbox">제한사항</div>
                    </div>
                </div>
            </div>

                <div class="grant_info_con">
                <div class="grant_info_title" style="margin-bottom:24px;"> 모집규모 </div>
                <input id="recruit_size" type="number" v-model="grant_info.recruit_size" placeholder="00" style="text-align:center; width: 95px;  height: 38px;  background-color: #ffffff;  border: solid 1px #ced4da;"> 팀 내외
                </div>
                <div class="grant_info_con">
                <div class="grant_info_title"> 우대사항 </div>
                   
                <tinymce id="d1"   :other_options="options"  placeholder="ex)우대사항" v-model="grant_info.prefer" style="width: 968px;float:left">
                </tinymce>
                </div>
                <div class="grant_info_con">
                <div class="grant_info_title">제한사항</div>
                <tinymce id="d2"  :other_options="options"  placeholder="ex)제한사항" v-model="grant_info.constraint" style="width: 968px;float:left">
                </tinymce>
                   
                </div>
            </div>
            
    </div>
</template>

<script>
function save(obj){
       var tag_list=[]
       console.log(obj.grant_info)
                $(".filter.hover").each(function(){
                    tag_list.push($(this).text())
                })
                var formData = new FormData();
                var grant_info ={}
                grant_info["id"]=obj.$route.params.id
                grant_info["recruit_tag"]= tag_list
                console.log(obj.grant_info.apply_start)
                grant_info["apply_start"] = obj.grant_info.apply_start
                grant_info["apply_end"] =  obj.grant_info.apply_end
                grant_info["object"] = obj.grant_info.object
                grant_info["condition"] = obj.grant_info.condition
                grant_info["recruit_size"]  = obj.grant_info.recruit_size
                grant_info["prefer"]  =obj.grant_info.prefer
                grant_info["constraint"]  =obj.grant_info.constraint
                
                formData.append('json_data', JSON.stringify(grant_info));    
                obj.$http.post(`/vue_set_grant_3/`, formData)
}

export default {
   
    methods:{
       
         
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
            var tag_list=[]
                $(".filter.hover").each(function(){
                    tag_list.push($(this).text())
                })
                var formData = new FormData();
                var grant_info ={}
                grant_info["id"]=this.$route.params.id
                grant_info["recruit_tag"]= tag_list
                grant_info["apply_start"] =this.grant_info.apply_start
                grant_info["apply_end"] = this.grant_info.apply_end                
                grant_info["object"] = this.grant_info.object
                grant_info["condition"] = this.grant_info.condition
                grant_info["recruit_size"] = this.grant_info.recruit_size
                grant_info["prefer"] = this.grant_info.prefer
                grant_info["constraint"] = this.grant_info.constraint
                
                formData.append('json_data', JSON.stringify(grant_info));    
                this.$http.post(`/vue_set_grant_3/`, formData)
                .then((result) => {            
                       this.$router.push("/manager/make/grant/"+ this.$route.params.id +"/select_method")
                })    
        },
        apply_save:function(){
                var tag_list=[]
                $(".filter.hover").each(function(){
                    tag_list.push($(this).text())
                })
                var formData = new FormData();
                var grant_info ={}
                grant_info["id"]=this.$route.params.id
                grant_info["recruit_tag"]= tag_list
                grant_info["apply_start"] =this.grant_info.apply_start
                grant_info["apply_end"] = this.grant_info.apply_end                
                grant_info["object"] = this.grant_info.object
                grant_info["condition"] = this.grant_info.condition
                grant_info["recruit_size"] = this.grant_info.recruit_size
                grant_info["prefer"] = this.grant_info.prefer
                grant_info["constraint"] = this.grant_info.constraint
                
                formData.append('json_data', JSON.stringify(grant_info));    
                this.$http.post(`/vue_set_grant_3/`, formData)
                .then((result) => {            
                   alert("저장되었습니다.")
                })    

        },


        },
        beforeRouteLeave (to, from, next) {
        if(confirm("페이지를 벗어나시겠습니까?")){
            next()
        }
        },
   
    data:function(){
        return{
               grant_info:{
                apply_end:"2018-01-01 00:00:00",
                apply_start:"2014-04-04 00:00:00",
              
            },
               options:{
                height:308,
            },
        
                   filter_table_item:{
                "base":["만화","출판","게임","애니메이션","방송","공연","광고","캐릭터","지식정보","콘텐츠 솔루션"],
                "create":["일러스트","전문디자인","디자인","콘텐츠기획"],
                "startup":["스타트업","1인기업","융합스타트업"],
                "new":["VR","AR","MCN"],
                "it":["IT","SW","ICT"],
                "manufacture":["메이커스","제조융복합","1인제조업"],
                "etc":["기획","개발","마케터"],
                "year":["3년이내","5년이내","7년이내","제한없음"],
                "local":["경기도기업","경기도 이전 예정","경기도 기업 이용기업","경기도 거주 임직원"],
                "kind":["개인사업자","법인사업자","경기도기업","MVP 보유기업","상용화 제품 보유기업"]
           },
        }
    },
    mounted:function(){
        var vue_obj = this
        $(document).ready(function(){
                vue_obj.$http.get("/vue_get_grant_information?id="+vue_obj.$route.params.id,)
                    .then((res)=>{
                     vue_obj.grant_info = res
                      for(var k=0; k <  vue_obj.grant_info.tag.length;k++)
                        {
                          $(".filter:contains('"+vue_obj.grant_info.tag[k] + "')").addClass("hover");
                         }
                    })
          
            $(document).off("click","input[type='checkbox']")
            $(document).on("click","input[type='checkbox']",function(){
                if( $(this).is(":checked") ){
                    $(this).parent().parent().children("*").not(".grant_info_title").removeClass("hidden")
                }else{
                    $(this).parent().parent().children("*").not(".grant_info_title").addClass("hidden")
                }
            })
            $("#gca_content").css("background-color","#fdfeff")
            $(document).off("click",".filter")
            $(document).on("click",".filter",function(){
                if($(this).hasClass("hover")) $(this).removeClass("hover")
                else $(this).addClass("hover")
            })
            
            
            $(document).off("click","#apply_next")
            $(document).on("click","#apply_next", function(){
            
            })

            $(document).off("click","#apply_save")
            $(document).on("click","#apply_save", function(){
               
            })


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
.ch{

}

.filter{
    cursor:pointer
}
.filter.hover{
    font-weight: bold
}
.tag_con{
    margin-top: 24px;
}
.bold{
    font-weight: bold;
}

span.filter_r{
    font-size: 14px;
    line-height: 1.71;
    color: #1b66f4!important;
    margin-right: 16px;
    display: inline-block;
}

#f_li>li{
    float: left;
    margin-right: 25px;
    display: inline-block;
    width:125px;
}
#f_li>li:last-child{
    margin-right: 0px;
}
.filter_ttl{
    display: inline-block;
    vertical-align: top;
  
}
.filter_ul{
   
}
table>tr>td{
    height: 64px;;
    vertical-align: middle;
  
}
table>tr:last-child>td{
    border-bottom: none;
}
table>tr>td:nth-child(1){
    width: 89px;
}
td>span{
    font-size: 12px;
    line-height: 1.33;
    color: #a0a3bc;
    display: inline-block;
}

#tbl1{
    border-collapse: collapse;
    margin-top:27px;
    margin-left:156px;
}
#tbl1>tr>td{
    vertical-align: top;
}
td>ul>li{
    display: block;
  
}
#tbl1>tr>td:nth-child(2n+1){
    width: 100px;
    font-size: 14px;
    color: #243d68;
     font-weight: bold;
}

#tbl1>tr>td:nth-child(2n){
    width: 200px;
    font-size: 14px;
    color: #1b66f4;
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
    width:162px;
    font-size: 17px;
    height: 44px;
    line-height: 44px;
    float:left;
    opacity: 0.8;
    color: #1a2f53;
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
    margin-walarive
    font-size: 20px;
    font-weight: 900;
    color: #1a2f53;
}

  #make_application_page{
        overflow-x: hidden;
        background-color : #f4f7fa;;
    }
    
    #application_header_bottom{
        width: 100%;
        height: 48px;
        background-color: rgba(206, 212, 218, 0.35);
        margin-left: 64px;
        padding-left: 52px;
        line-height: 48px;
        font-size: 16px;
        color:;
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
    #application_header_bottom>ul>li{
    list-style: none;
    float: left;
    margin-right: 24px;
    line-height: 48px;
}
.filter{
    font-size: 14px;
    color: #1b66f4;
    margin-right: 54px;
}
.filter_ttl{
    margin-top: 16px;
    display: block;
    float: left;
    width:100px
}
#f_li>li{
    float: left;
    width: 482px!important;
   
}
.filter_ul>.filter{
  
}
.filter_ul{
    display: inline-block;
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
.filter{
    margin-top:10px;
    display: block;
    margin-bottom: 27px;
    float: left;
    margin-right: 6px;
    cursor: pointer;
    border-radius: 100px;
    padding-right: 17px;
    padding-left: 17px;
    padding-top:11px;
    padding-bottom:11px;
    display: inline-block;
    background-color: #f5f8ff;
    height: 18px;
    line-height: 18px;
    opacity: 0.7;
    font-size: 14px;
    letter-spacing: -0.1px;
    text-align: center;
    color: #1a2a53;
    margin-bottom:12px;
}
.filter_title{
    float: left;
    margin-top:20px;

}
.row{
    clear: both;
}
.filter_title{
    width:100px;
    opacity: 0.7;
    font-size: 12px;
    line-height: 1.83;
    letter-spacing: normal;
    color: #1a2a53;
}

</style>
<style>
.recruit>.vdatetime-input{
 width: 160px;
  height: 40px;
  background-color: #ffffff;
  border: solid 1px #e7edfc;
}

</style>

<template>
    <div id="make_application_page" style=" padding-bottom:200px;">
            <div id="application_header">
                <div id="title"><i style="font-size=20px;"  onclick="history.back();" class="fas fa-chevron-left"></i> &nbsp;&nbsp;&nbsp;지원서 양식 지정</div>
            </div>





            <div id="choose_spec">             
                <div class="title">
                    기본 수집사항 <span class="caption_0">필수적으로 수집해야하는 수집정보 입니다.(해제불가)</span>
                </div>
                
                <div class="input_seg_con" style="height:196px;">
                    <ul>
                        <li class="info_title">기본정보</li>
                        <li class="info_segment">기업명</li>
                        <li class="info_segment">기업형태</li>
                        <li class="info_segment">설립일</li>
                        <li class="info_segment">주소</li>
                     
                    </ul>
                    <ul>
                        <li class="info_title">대표자 정보</li>
                        <li class="info_segment">대표자명</li>
                        <li class="info_segment">전화번호</li>
                        <li class="info_segment">이메일</li>
                    </ul>
                    <ul>
                        <li class="info_title">담당자 정보</li>
                        <li class="info_segment">대표자명</li>
                        <li class="info_segment">전화번호</li>
                        <li class="info_segment">이메일</li>
                    </ul>
                </div>
                <div class="input_seg_con" style="height:92px">
                    <ul style="padding-top:34px;">
                        <li class="info_title">사업분야</li>
                        <li class="info_segment">키워드</li>
                        <li class="info_segment">기본장르</li>
                        <li class="info_segment">특수장르</li>
                        <li class="info_segment">사업(서비스)명</li>
                        <li class="info_segment">사업(서비스)소개</li>
                    </ul>                 
                </div>                             
                
                
                <div class="title" style="margin-top:27px;">
                    선택 수집사항 <span class="caption_0">추가적으로 수집해야하는 수집정보 입니다.(선택)</span>
                </div>
                <div class="input_seg_con" style="height:92px">
                    <ul style="padding-top:34px;">
                        <li class="info_title">기업정보</li>
                        <li class="info_segment chk"><input v-model="meta_info.p0" data-name="p0" type="checkbox">홈페이지</li>
                        <li class="info_segment chk"><input v-model="meta_info.p1" data-name="p1" type="checkbox">SNS</li>
                        <li class="info_segment chk"><input v-model="meta_info.p2" data-name="p2" type="checkbox">고용현황</li>
                        <li class="info_segment chk"><input v-model="meta_info.p3" data-name="p3" type="checkbox">매출액</li>
                        <li class="info_segment chk"><input v-model="meta_info.p4" data-name="p4" type="checkbox">수출액</li>
                        <li class="info_segment chk"><input v-model="meta_info.p5" data-name="p5" type="checkbox">투자유치내역</li>                        
                    </ul>                 
                </div>     
                <div class="input_seg_con" style="height:92px">
                    <ul style="padding-top:34px;">
                        <li class="info_title">기업소개</li>
                        <li class="info_segment chk"><input v-model="meta_info.p6"  data-name="p6"  type="checkbox">기업소개</li>
                        <li class="info_segment chk"><input v-model="meta_info.p7"  data-name="p7"  type="checkbox">연혁(주요경력)</li>
                    </ul>                 
                </div>     
                <div class="input_seg_con input_file_con" style="height:119px">
                    <ul style="padding-top:34px;">
                        <li class="info_title">첨부서류</li>
                        <li class="info_segment chk">사업계획서</li>
                        <li class="info_segment chk">사업자등록증</li>
                        <li class="info_segment chk">지방세/국세납입증</li>
                        <li class="info_segment chk">지적재산권</li>                                    
                    </ul>       
                    <div id="special_abs">첨부서류 변경은 <span class="blue">공고문 작성 > 제출서류</span> 에서 가능합니다.</div>          
                </div> 

            </div>
    <BottomControl></BottomControl>
    </div>
</template>

<script>
import BottomControl from "./Common/BottomControl.vue"

export default {
    components:{
        BottomControl
    },
         beforeRouteLeave (to, from, next) {
        if(confirm("페이지를 벗어나시겠습니까?")){
            next()
        }
    },
    data:function(){
        return {
            meta_info:{}
        }
    },
    methods:{
        apply_save:function(){
                var meta_val=[]
                $("input:checked").each(function(){
                    meta_val.push( $(this).attr("data-name") )
                })
                var data={}
                data["meta"]=meta_val
                data["id"]= this.$route.params.id
                console.log(data)
                this.$http.post(`/vue_set_application/`, data)
                .then((result) => {            
                                alert("수정하였습니다.")
                })    
        },
        apply_next:function(e){
            var meta_val=[]
                $("input:checked").each(function(){
                        meta_val.push( $(this).attr("data-name") )
                })
                var data={}
                data["meta"]=meta_val
                data["id"]= this.$route.params.id
                console.log(data)
                this.$http.post(`/vue_set_application/`, data)
                .then((result) => {   
                    alert("승인 요청 하였습니다.")         
               var supply_tag = [] 
                $("#tbl1>tr>td>ul>li.hover").each(function(){
                    supply_tag.push($(e.target).text())
                grant_info["supply_tag"] = supply_tag
                })    
            })
        }
    },
    mounted:function(){
        var vue_obj = this        
            var meta_val = []
            $(document).off("click","#apply_next")
            $(document).on("click","#apply_next",function(){
                console.log("hete")
                vue_obj.apply_next()
            })
            

            vue_obj.$http.get("/vue_get_grant_information?id="+vue_obj.$route.params.id,)
            .then((res)=>{
                vue_obj.grant_info = res.data
                    for(var k =0; k < vue_obj.grant_info.meta.split(",").length; k++){
                        $("input[data-name='"+ vue_obj.grant_info.meta.split(",")[k]+"']").each(function(){
                        $(this).click()
                    })
                }
            })
    }
    }

</script>


<style scoped lang="scss">
    #tbl1,#tbl2{
        width:1224px;
        border-collapse: collapse;
        margin-left: 54px;
        margin-top:38px;
    }
    #tbl1>tr>td{
        vertical-align: top;
        font-size: 14px;
        color: #1a2f53;
    }
    #tbl2>tr>td{
        vertical-align: top;
        font-size: 14px;
        color: #1a2f53;
    }
    

    #tbl1>tr>td:nth-child(2n){
        text-align: left;
        width:206px;
    }
    #tbl1>tr>td:nth-child(2n+1){
        text-align: left;
        width:100px;
    }
    #tbl1>tr>td>ul>li{
        font-size: 14px;
        color: #7697ab;
        margin-bottom: 24px;
    }

     #tbl2>tr>td:nth-child(2n){
        text-align: left;
        width:206px;
    }
    #tbl2>tr>td:nth-child(2n+1){
        text-align: left;
        width:100px;
    }
    #tbl2>tr>td>ul>li{
        font-size: 14px;
       color: #1b66f4;
        margin-bottom: 24px;
    }


    .hr{
        margin-top: 24px;
        width:1224px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        color: #243d68;
        border-bottom: 1px solid #d8d8d8;
        margin-left:54px;
    }
    .hr>span{
        display: inline-block;
        vertical-align: unset;
        font-size: 14px;
        color: #a0a3bc;
        margin-left: 36px;
    }
    #choose_title{
        font-size: 20px;
        font-weight: 900;
        color: #1a2f53;
        margin-top:44px;
        margin-left:56px;
    }

    #choose_spec{
        width:100%; 
        margin-left: 64px;
        position: relative;
       
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
    #choose_spec>.title{
        opacity: 0.8;
        font-size: 24px;
        line-height: 1.67;
        letter-spacing: -0.6px;
        color: #1a2f53;
        margin-top: 58px;
        margin-left: 54px;
     
    }
    .title>.caption_0{
        opacity: 0.8;
        font-size: 14px;
        line-height: 1.86;
        letter-spacing: -0.1px;
        color: #1a2a53;
        padding-left: 27px;
  
    }
    
    .input_seg_con{
        width: 1224px;
        background-color: #ffffff;
        margin-left: 54px;
        margin-top: 23px;
        position: relative;
        #special_abs{ 
            opacity: 0.8;
            font-size: 14px;
            line-height: 1.86;
            letter-spacing: -0.1px;
            color: #1a2a53;
            position: absolute;
            right:22px;
            bottom:20px;
            .blue{
                font-size: 14px;
                font-weight: bold;
                line-height: 1.86;
                letter-spacing: -0.1px;
                color: #1b49f4;
            }
            }

        ul{
            display: block;
            padding-top:27px;
            clear: both;
            margin-left: 40px;
            
            li.info_title{
                float: left;
                width: 168px;
                display: block;           
                height: 28px;
                font-size: 17px;  
                line-height: 1.65;
                letter-spacing: -0.3px;
                color: #1a2f53;                
            }
            li.info_segment{
                float: left;
                display: block;
                height: 26px;
                opacity: 0.5;
                font-family: NotoSansCJKkr;
                font-size: 14px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 1.86;
                letter-spacing: -0.1px;
                color: #1a2a53;
                margin-right:51px
            
            }
            li.chk{   
                font-size: 14px;
                line-height: 1.86;
                letter-spacing: -0.1px;
                color: #1a2a53!important;
                opacity: 1;
            }
        }
    }
    .input_file_con{
        background-color: #e7edfc;
        border: solid 1px #c1d1f7;
    }


    
    
    </style>

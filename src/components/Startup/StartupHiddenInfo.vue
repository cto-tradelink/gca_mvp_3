<template>
    <div id="startup_hidden_info" class="startup_detail panel_3 hidden" v-if="is_manage_page" >
    
    <div id="hidden_info_show">
        <div class="hidden_info_seg" style="margin-top:16px;">
            <div class="info_ttl">관심 지원사업</div>

           <div id="filter_con">
                <span class="filter">자금지원사업</span>    
           </div>
            <div class="hr" ></div>
            <div id="add_filter">추가하기</div>    
               
        </div>

        <div class="hidden_info_seg">
            <div class="info_ttl">기업 형태</div>
            <div class="filter_con">
               <span class="filter">법인사업자</span> 
            </div>
        </div>

        <div class="hidden_info_seg">
            <div class="info_ttl">사업자 등록증</div>
            <div class="file" style="width:576px;margin-top:16px;">
                    <input class="service_info_file" type="file">
                </div>
        </div>

        <div class="hidden_info_seg" style="height:84px;">
            <div class="info_ttl">추가 입력사항</div>
            <div class="con">
                <div class="file_con"><input class="option" data-target="0"  type="checkbox" checked> 지적재산권</div>
                <div class="file_con"><input class="option" data-target="1"  type="checkbox" checked> 매출액</div>
                <div class="file_con"><input class="option" data-target="2"  type="checkbox" checked> 수출액</div>
                <div class="file_con"><input class="option" data-target="3"  type="checkbox" checked> 투자유치내역</div>
            </div>
        </div>

        <div class="hidden_info_seg  option_info" data-target="0">
            <div class="info_ttl">지적재산권</div>
                <div class="intel_file" style="display:inline-block">파일 업로드
                </div>
                <div class="file" id="add_file_con" style="margin-left:48px;">
                    <div style="width:447px;height:40px">
                    <input class="hidden_info_file" type="file" style="margin:9px; clear:both;"><img src="/static/img/cancel@3x.png" style="width:24px; height:24px;float:right; margin:10px;">
                    </div>
                </div>
              <div v-on:click="add_file" class="add_file" style="margin-top:16px;"><img style=" margin-left:252px;;margin-top:9px;float:left" src="/static/img/pluse2.png">추가하기</div>
                      
        </div>
        <div class="hidden_info_seg  option_info" data-target="1">
            <div class="info_ttl">매출액</div>
                <div class="finance_con">
                <table class="finance" style="border:none; border-collapse:collapse;width:516px;">
                    <tr>
                        <td>
                            <input class="year_input" readonly>
                        </td>
                        <td>
                            <div class="size_con"><input id="rev_num" type="number">원</div>
                        </td>
                    </tr>
                     <tr v-for="f in startup.revenue">
                        <td>{{f.year}}년</td>
                        <td style="position:relative; padding-left:20px;">{{f.num}}원
                            <img v-on:click="del_row($event)"  src="/static/img/cancel@3x.png" style="position:absolute; width:24px; cursor:pointer; right:-30px;">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="line" style="height:1px;border-top:1px solid #e7edfc;margin-top:16px;; padding-top:16px;"></div>
                            <div v-on:click="add_rev" class="add_rev"><img style=" margin-left:252px;;margin-top:9px;float:left" src="/static/img/pluse2.png">추가하기</div>
                        </td>
                    </tr>                                  
                    </table>
                </div>   
            
        </div>
   <div class="hidden_info_seg  option_info"  data-target="2">
            <div class="info_ttl">수출액</div>
               <div class="finance_con">
             
             
          <table class="finance" style="border:none; border-collapse:collapse; width:516px;">
                    <tr>
                        <td>
                            <input class="year_input">
                        </td>
                        <td>
                         <select id="nation_select" style="height:44px; width:158px; border:1px solid #e7edfc; " v-model="selectedCoutry">
                            <option disabled selected value>국가를 선택하세요</option>
                                <option v-for="country in countries" :value="country.name">{{ country.name }}</option>
                        </select>
                        </td>
                        <td>
                            <div class="size_con" style="width:240px;"><input id="trade_num" style="margin-right:3px;" type="number">원</div>
                        </td>
                    </tr>
                    <tr v-for="f in startup.trade">
                        <td style="padding-left:20px;">{{f.year}}년</td>
                        <td style="padding-left:20px;">{{f.nation}}</td>
                        <td style="padding-left:20px;position:relative">{{f.num}}원
                            <img v-on:click="del_row($event)" src="/static/img/cancel@3x.png" style="position:absolute; width:24px; cursor:pointer; right:-30px;">
                        </td>
                    </tr>      
                    <tr>
                        <td colspan="3">
                            <div class="line" style="height:1px;border-top:1px solid #e7edfc;margin-top:16px;; padding-top:16px;"></div>
                            <div v-on:click="add_trade" class="add_trade"><img style=" margin-left:252px;;margin-top:9px;float:left" src="/static/img/pluse2.png">추가하기</div>
                        </td>
                    </tr>
                         
                    </table>
               </div>
        </div>
           <div class="hidden_info_seg  option_info" data-target="3">
            <div class="info_ttl">투자유치내역</div>
            <ul>
                <li><span class="y">{{year}}</span> <span>{{size}}</span></li>
            </ul>
        </div>
    </div>
            <div id="modify_btn">수정하기</div>
        
        <div id="hidden_info_input" class="hidden">
             <div class="hidden_info_seg" style="margin-top:16px;">
            <div class="info_ttl">관심 지원사업</div>
            <div class="tag_con">
                <span class="tag">자금지원</span><span class="tag">엑셀러레이팅 프로그램</span>  
            </div>
        </div>

        <div class="hidden_info_seg">
            <div class="info_ttl">기업 형태</div>
            <div class="tag_con">
                <span class="tag">법인사업자</span>  
            </div>
        </div>

        <div class="hidden_info_seg">
            <div class="info_ttl">사업자 등록증</div>
            <div class="file">
                    <input class="service_info_file" type="file"><img src="/static/img/cancel@3x.png" style="width:24px; height:24px;">
                </div>
        </div>

        <div class="hidden_info_seg">
            <div class="info_ttl">지적재산권</div>
            
            <div class="file">
                    <input class="service_info_file" type="file"><img src="/static/img/cancel@3x.png" style="width:24px; height:24px;">
                </div>
        </div>
        <div class="hidden_info_seg">
            <div class="info_ttl">매출액</div>
            <ul>
                <li><span class="y">{{year}}</span> <span>{{size}}</span></li>
            </ul>
              <div id="add_history"><img src="/static/img/pluse.png" style="float:left"> 추가하기</div>
        </div>
   <div class="hidden_info_seg">
            <div class="info_ttl">수출액</div>
            <ul>
                <li><span class="y">{{year}}</span> <span>{{size}}</span></li>
            </ul>
              <div id="add_history"><img src="/static/img/pluse.png" style="float:left"> 추가하기</div>
        </div>
           <div class="hidden_info_seg">
            <div class="info_ttl">투자유치내역</div>
            <ul>
                <li><span class="y">{{year}}</span> <span>{{size}}</span></li>
            </ul>
              <div id="add_history"><img src="/static/img/pluse.png" style="float:left"> 추가하기</div>
        </div>
        </div>

        
        <div id="back_layer" class="hidden">           
        </div>
    <div id="int_sp2" class="hidden" style="z-index:999">
       <div id="sp_hd"><span class="ttl">관심지원사업</span> <span id="sp_x_btn"  class="x_btn">x</span> </div>
            <div id="filter_popup_wr" style="width:936px;">              
                <div  style="margin-left:16px;margin-top:12px;line-height:52px;display:inline-block">자금지원 <span v-for="sp in sp_table_item.money" class="filter_a">{{sp}}</span></div>
                <div  style="margin-top:12px;line-height:52px;display:inline-block">투자연계 <span v-for="sp in sp_table_item.fund"  class="filter_a">{{sp}}</span></div>
                <div  style="margin-left:16px;line-height:52px;display:inline-block">교육 <span  v-for="sp in sp_table_item.edu"  class="filter_a">{{sp}}</span></div>
                <div  style="line-height:52px;display:inline-block">판로 <span v-for="sp in sp_table_item.channel"  class="filter_a">{{sp}}</span></div>
                <div  style="margin-left:16px;line-height:52px;display:inline-block">네트워킹 <span  v-for="sp in sp_table_item.network"  class="filter_a">{{sp}}</span></div><br>
                <div  style="margin-left:16px;line-height:52px;display:inline-block">공간지원 <span  v-for="sp in sp_table_item.space" class="filter_a">{{sp}}</span></div>
                <div  style="margin-left:16px;line-height:52px;display:inline-block">기타 <span v-for="sp in sp_table_item.etc"  class="filter_a">{{sp}}</span></div>
                <div  style="margin-left:16px;line-height:52px;display:inline-block">피칭 <span v-for="sp in sp_table_item.pitch"  class="filter_a">{{sp}}</span></div>
                
            </div>
        </div>  

    </div>
</template>
<script>
var current_year
var current_year_trade
var min_year = 2200;
var min_year_trade =2200;
var revenue_flag = true
var year_alert = false
var rev_year_arr=[]
var trade_year_arr=[]
export default {
    props:["startup"],
    computed:{
          is_manage_page(){
            if (this.$route.fullPath.indexOf("mypage")==-1){
                return false 
            }      
            else{
                return true
            }
        },
    },
    methods:{
        
        add_file:function(){
            var file_seg='   <div style="width:447px;height:40px; clear:both">'+
                    '<input class="hidden_info_file" type="file" style="margin:9px; clear:both;"><img src="/static/img/cancel@3x.png" style="width:24px; height:24px;float:right; margin:10px;">'+
                    '</div>'
            $("#add_file_con").append(file_seg)
        },
   filter_popup_toggle:function(){
       console.log("ddd")
       console.log($("#int_sp"))
            if($("#int_sp2").hasClass("hidden")){
                $("#int_sp2").removeClass("hidden")
                $("#back_layer").css("position","fixed")                
                $("#back_layer").css("width",$(window).width())
                $("#back_layer").css("height",$(window).height())
                $("#back_layer").css("top","0")
            }else{
                $("#int_sp2").addClass("hidden")
                  $("#back_layer").css("position","fixed")
                $("#back_layer").css("width",0)
                $("#back_layer").css("height",0)
                $("#back_layer").css("top","0")
            }
        },
            del_row:function(e){
            $(e.target).parent().parent().remove()
        },
        init_year_data:function(){
            console.log("hereer11")
            if (this.$props.startup.found_date != undefined && this.$props.startup.found_date !=""){
            console.log(this.$props.startup.found_date)
            var found_year = this.$props.startup.found_date.split("-")[0]
            var current_year = new Date().getFullYear().toString()
            console.log((parseInt(current_year)-parseInt(found_year)))
            for(var k=0; k< (parseInt(current_year)-parseInt(found_year)) ; k++){
                    console.log(parseInt(found_year)+k)
                    rev_year_arr.push(parseInt(found_year)+k)
                    trade_year_arr.push(parseInt(found_year)+k)
            }
            this.set_rev_year()
            this.set_trade_year()
            }
      
        },
        set_rev_year:function(){
            console.log(new Date().getFullYear().toString())
            var current_row_year = rev_year_arr[-1]
            console.log((new Date().getFullYear()-1))
            if(current_row_year != (new Date().getFullYear())){
                var target_year = rev_year_arr.pop()
                $(".year_input:eq(0)").val(target_year)
            }
        },
        set_trade_year:function(){
            console.log(new Date().getFullYear().toString())
            var current_row_year = trade_year_arr[-1]
            console.log((new Date().getFullYear()-1))
            if(current_row_year != (new Date().getFullYear())){
                var target_year = trade_year_arr.pop()
                $(".year_input:eq(1)").val(target_year)
            }
        },
        add_rev:function(){
            if($("#rev_num").val() != ""){
                this.startup.revenue.push({
                    "year": $(".year_input:eq(0)").val(),
                    "num": $("#rev_num").val()
                })
                this.set_rev_year();
            }
            else{
                alert("수출액을 입력해주세요")
            }
        },            
        add_trade:function(){
            if($("#trade_num").val() != ""){
                this.startup.trade.push({
                    "year": $(".year_input:eq(1)").val(),
                    "num": $("#trade_num").val(),
                    "nation":$("#nation_select").val()
                })
                this.set_trade_year();
            }
            else{
                alert("수출액을 입력해주세요")
            }
        
        },      
        getCountriesList: function() {     
            var vue_obj=this   
        this.$http.get('https://restcountries.eu/rest/v1/all').then(function(response) {
        vue_obj.countries = (response.data)  
        })
        },    
            modi_file:function(e){
                if($(e.path[0]).text()=="수정"){
                    $("#file").addClass("hidden")
                    $("#submit_file").removeClass("hidden")
                    $(e.path[0]).text("완료")
                }
                else{
                     $("#file").removeClass("hidden")
                    $("#submit_file").addClass("hidden")
                    $(e.path[0]).text("수정")
                    var formData = new FormData();
            var file = document.querySelector('#business_file');
            this.$props.startup.business_file = $("#business_file").val().replace(/^.*[\\\/]/, '')
            formData.append("file", file.files[0]);
            formData.append('json_data', JSON.stringify(this.$props.startup));    
            this.$http.post(`${this.baseURI}/vue_update_startup_detail/`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
                })

                }
            },
            add_invest:function(e){
            if($(e.path[0]).text()=="추가"){
                $(".add_invest_row").removeClass("hidden")
                $("td>#num").attr("contenteditable",true)
                $("td>#company").attr("contenteditable",true)
                $("td>#num").focus()
                $(e.path[0]).text("완료")
            }
            else{
            $(".add_invest_row").addClass("hidden")
                $(e.path[0]).text("추가")
                this.$props.startup.invest.push({
                    "year":$("#invest_year").val(),
                    "currency": $("#currency").val(),
                    "company":$("#company").text(),
                    "kind": $("#step").val(),
                    "num" : $("td>#num").text()
                })
            }
        },
        getNumbers:function(start,stop,step = 1){
             var result=[]
            for(var k = start ; k <= stop ; k = k + step){
                result.push(k)
            }
        return result.reverse();
        },
        modify_trade:function(e){
            if($(e.path[0]).text()=="수정"){
                $(e.path[0]).text("완료")
                $(e.path[0]).parent().find("div").attr("contenteditable",true)
                  $(e.path[0]).parent().find("div").focus()
            }else{
                $(e.path[0]).text("수정")
                $(e.path[0]).parent().find("div").attr("contenteditable",false)
                var r = $(e.path[0]).parent().find("div").text()
                for(var k=0; k <= this.$props.startup.trade.length ; k++ ){
                    if(this.$props.startup.trade[k].id == parseInt( $(e.path[0]).attr("data-id") )){
                        this.$props.startup.trade[k].num=r
                    } 
                }
            }
        },    
        add_tag:function(e){
    
            if(this.$props.startup.tag.indexOf($(e.path[0]).text().replace("#",""))==-1){
                this.$props.startup.tag.push($(e.path[0]).text().replace("#",""))
                $(e.path[0]).addClass("bold")
            } 
            else{
                var index = this.$props.startup.tag.indexOf($(e.path[0]).text().replace("#",""))
                this.$props.startup.tag.splice(index,1)
                $(e.path[0]).removeClass("bold")
            }            
            // 서버와 연동하는 코드 추가
        }
    },
    mounted:function(){
        min_year = 2200;
        current_year = 0
        min_year_trade = 2200;
        current_year_trade = 0
        
        var vue_obj = this
        $(document).ready(function(){


            $(document).on("click","#sp_x_btn", function(){
                 if($("#int_sp2").hasClass("hidden")){
                $("#int_sp2").removeClass("hidden")
                $("#back_layer").removeClass("hidden")                
                
                $("#back_layer").css("position","fixed")                
                $("#back_layer").css("width",$(window).width())
                $("#back_layer").css("height",$(window).height())
                $("#back_layer").css("top","0")
                $("#back_layer").css("left","0")
                
            }else{
                $("#int_sp2").addClass("hidden")
                $("#back_layer").addClass("hidden")
                $("#back_layer").css("position","fixed")
                $("#back_layer").css("width",0)
                $("#back_layer").css("height",0)
                $("#back_layer").css("top","0")
            }
            })


            $(document).on("click","#add_filter", function(){
                 if($("#int_sp2").hasClass("hidden")){
                $("#int_sp2").removeClass("hidden")
                $("#back_layer").removeClass("hidden")                
                
                $("#back_layer").css("position","fixed")                
                $("#back_layer").css("width",$(window).width())
                $("#back_layer").css("height",$(window).height())
                $("#back_layer").css("top","0")
                $("#back_layer").css("left","0")
                
            }else{
                $("#int_sp2").addClass("hidden")
                $("#back_layer").addClass("hidden")
                $("#back_layer").css("position","fixed")
                $("#back_layer").css("width",0)
                $("#back_layer").css("height",0)
                $("#back_layer").css("top","0")
            }
            })

            $(document).on("click","input.option",function(){
                console.log("here")
                $(".option_info").addClass("hidden")
                $("input.option").each(function(){
                    if($(this).is(":checked")){
                        var target = $(this).attr("data-target")
                        $(".hidden_info_seg[data-target='"+target+"']").removeClass("hidden")
                    }
                })
            })

            if( $(".filter_r").length == 0){
                $("#startup_hidden_info > div:nth-child(1) > div.modi_btn").click()
            }
           vue_obj.init_year_data()
            try{
                for(var k =0; k <= vue_obj.$props.startup.history.length ; k++){
                if( parseInt(vue_obj.$props.startup.history[k].year) < min_year )
                    min_year =  parseInt(vue_obj.$props.startup.history[k].year)
                    current_year = min_year                
                }
                year_alert = false
            }   
            catch(e){
                console.log(e)
                year_alert = true
            }

            try
            {
            for(var k =0; k <= vue_obj.$props.startup.revenue.length ; k++){
                if( parseInt(vue_obj.$props.startup.revenue[k].year) < min_year )
                    min_year =  parseInt(vue_obj.$props.startup.revenue[k].year)
                if( parseInt(vue_obj.$props.startup.revenue[k].year) > current_year )
                    current_year =  parseInt(vue_obj.$props.startup.revenue[k].year)
                console.log(min_year)

                console.log(current_year)              
                    }
            }
            catch(e){
                console.log(e)
            }
            try{

           
            for(var k =0; k <= vue_obj.$props.startup.trade.length ; k++){
                try{
                if( parseInt(vue_obj.$props.startup.trade[k].year) < min_year_trade )
                    min_year_trade =  parseInt(vue_obj.$props.startup.trade[k].year)
                if( parseInt(vue_obj.$props.startup.trade[k].year) > current_year_trade )
                    current_year_trade =  parseInt(vue_obj.$props.startup.trade[k].year)
                console.log(min_year_trade)
                }
                catch(e){
                    console.log(e)
                }
            }
            }
            catch(e){

            }

            for(var k =0; k < $(".filter_r").length; k++){
               $(".filter:contains('"+$(".filter_r:eq("+k+")").text().replace("#","")+"')").addClass("bold")
            }

        })
    },
    data:function(){
        return{      
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
               sp_table_item:{
                "money":["자금지원","R&D지원"],
                "fund":["엑셀러레이팅 프로그램","데모데이 프로그램(투자연계)"],
                "edu":["교육 프로그램","전문가 양성 프로그램"],
                "channel":["해외 진출 지원","전시회 참가지원","유통지원"],
                "network":["네트워킹 프로그램", "데모데이 프로그램(네트워킹)","전문가 컨설팅&멘토링"],
                "space":["스타트업 오피스 지원","가상오피스 지원"],
                "pitch":["기업피칭"],
                "etc":["마케팅지원","퍼블리싱 지원","B2B 상담 지원","번역지원"],
            }
        }
    }
}
</script>
<style scoped>
#sp_hd{
    width: 936px;
    height: 39.6px;
    background-color: #e7edfc;
}
#sp_hd>.ttl{
    margin:10px;
    display: inline-block;
}
#sp_x_btn{
    float: right;
    margin:8px;
    cursor:pointer;
}



#modify_btn{
     width: 100px;
  height: 40px;
  border-radius: 28px;
  background-color: #ffffff;
  border: solid 1px #1b66f4;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  margin-left: 458px;
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
    margin-top: 29px;
}
.filter_ul{
   
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


.input_normal{
    width: 415px;
    height: 52px;
    border:none;   
    font-size: 14px;
    letter-spacing: normal;
    color: #1a2f53;
    padding-left: 16px;
    line-height: 56px;    
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #1a2f53;
    opacity: 0.5; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #1a2f53;
    opacity: 0.5; /* Firefox */
}

::-ms-input-placeholder { /* Microsoft Edge */
    color: #1a2f53;
    opacity: 0.5; /* Firefox */
}

.finance_con{
    width: 927px;
   
    background-color: #fff;
    position: relative;
    margin-bottom: 24px;
    overflow: auto;
    padding: 0px;
   
    padding-right: 16px;
    margin-top: 24px;
    
}
#file{

    cursor: pointer;
    margin-top: 24px;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.71;
    color: #2256b8;
}
.hidden_info_seg{
        position: relative;
        width: 968px;
      
        height: auto;
        background-color: #ffffff;
        padding: 24px;
        margin-bottom: 24px;
}
.service_name{
    opacity: 0.8;
  font-size: 20px;
  font-weight: bold;
  color: #1a2f53;
  display: inline-block;
}
.service_name_sub{
    display: inline-block;
      font-size: 12px;
  color: #a0a3bc;
  margin-left: 7px;
}
.modi_btn{   
    font-size: 14px;   
    color: #1b66f4;   
    position: absolute;
    top:30px;
    right:24px;
    cursor: pointer;
}
.filter{
    opacity: 0.5;
    font-size: 14px;
    color: #1b66f4;
    cursor: pointer;
    margin-right: 40px;
}
ul{
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
}
li{
    list-style: none;
}


.file_ttl{
   
  height: 32px;
  opacity: 0.8;
  font-family: NotoSansCJKkr;
  font-size: 17px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.65;
  letter-spacing: -0.3px;
  color: #1a2f53;
  margin-top:24px;
}

.file{
   
    width: 448px;
    height: 40px;
    background-color: #ffffff;
    border: solid 1px #c1d1f7;
    height: auto;
    background-color: #ffffff;
    border: solid 1px #c1d1f7;
    display: inline-block
}
.file>img{
     width: 24px;
  height: 24px;
  float: right;
  margin-top:8px;
  margin-right:8px;
}
.file>input{
    margin: 8px;
}
.filter{
    background-color: #f5f8ff;
    font-size: 14px;
    letter-spacing: -0.1px;
    text-align: center;
    color: #1a2a53;
    border-radius: 30px;
}
.filter_con{
    margin-top:16px;
}


.finance{
  background-color: #ffffff; 
  border-collapse: collapse;
  width: 100%;

}

.finance>tr>td{

}
.finance>tr:last-child>td{
  border-bottom: none;
}
.finance>tr>td:nth-child(1){
  width: 94px;
}

.finance>tr>td>input{
  border: none
}


.size_con>input{
    border:none;
    width:200px;
    outline: none;
    margin-left:10px;
    margin-right:20px;
    height:34px;
}

.size_con{
    width: 400px;
    height: 42px;
    background-color: #ffffff;
    border: solid 1px #e7edfc;
    margin-left:12px;
    line-height:42px;
}
.year_input{
    width: 160px;
    height: 40px;
    background-color: #ffffff;
    border: solid 1px #e7edfc!important;
}


table{
    border-collapse: collapse;
}

.add_rev,.add_trade,.add_file{
    cursor: pointer;
    width: 576px;
    height: 40px;
    border: solid 1px #1b49f4;
    line-height: 40px;
}

td>span{
    font-size: 12px;
    color: #a0a3bc;
}
.finance{
  background-color: #ffffff; 
  border-collapse: collapse;
  width: 100%;

}

.finance>tr>td{

}
.finance>tr:last-child>td{
  border-bottom: none;
}
.finance>tr>td:nth-child(1){
  width: 94px;
}

.finance>tr>td>input{
  border: none
}

.hr{
    width: 968px;
    height: 1px;

    border-bottom: solid 1px #e7edfc;
    margin-top:16px;
    margin-bottom:16px;
}
#add_filter{
    cursor: pointer;
    height: 40px;
    border-radius: 28px;
    background-color: #ffffff;
    border: solid 1px #1b66f4;
    width:100px;
    text-align: center;
    line-height: 40px;
    color: #1b66f4;
}
#int_sp2{
    background-color: #fff;
    position: fixed;
    top:100px;
    left:50%;
    margin-left: -468px;
}

.filter_a{
    margin-right: 6px;
    cursor: pointer;
    border-radius: 100px;
    padding-left: 26px;
    padding-right: 26px;
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
.file_con{
    float:left;
    margin-right: 76px;
    margin-top:20px;
}
#back_layer{
    position: fixed;   
    top: 0px;
    left: 0px;
    background-color: rgba(26, 47, 83, 0.8);
}
</style>

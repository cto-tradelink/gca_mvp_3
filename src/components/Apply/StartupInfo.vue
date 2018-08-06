<template>
    <div id="base_info" style="padding-bottom:200px;">
        <div id="case_con">
            <div id="base_title">기업정보</div>
            <div id="wr_con_1">
                <table>
                    <tr class="option" data-option="homepage">
                        <td>홈페이지</td>
                        <td> <input v-model="startup.homepage" class="input_normal " type="text" placeholder="홈페이지를 입력하세요" > </td>
                    </tr>
                    <tr  class="option" data-option="sns">
                        <td style="vertical-align:top; padding-top:37px;">SNS</td>
                        <td style="position:relative">
                            <img style="position:absolute;width:24px; left:14px; top:35px;"  src="/static/img/facebook_1.png">
                            <img style="position:absolute;width:24px; left:14px; top:95px;" src="/static/img/insta.png">
                            <img style="position:absolute;width:24px; left:14px; top:155px;"  src="/static/img/youtube.png">
                            <input class="input_normal" style="margin-top:24px; padding-left:50px;width:381px;" v-model="startup.facebook"  type="text" placeholder="SNS 주소를 입력하세요."><br>
                            <input class="input_normal" style="margin-top:16px; padding-left:50px;width:381px;" v-model="startup.insta"  type="text" placeholder="SNS 주소를 입력하세요."><br>
                            <input class="input_normal" style="margin-top:16px; padding-left:50px;width:381px;" v-model="startup.youtube"  type="text" placeholder="SNS 주소를 입력하세요."><br>
                        </td>
                    </tr>                                    
                </table>
            </div>
            <div id="wr_con_2" class="option" data-option="emp">
                <div class="seg_ttl">고용현황</div>
                <table style="margin-top:20px;">
                    <tr>
                        <td>총</td>
                        <td style="position:relative"><span style="position:absolute; top:14px; right:20px;">명</span>
                            <input  v-model="startup.total_employee" class="input_normal" style="margin-bottom:20px;width:162px;"  type="text" placeholder="00" value="0"> </td>
                    </tr>
                    <tr>
                        <td>상주직원 기준</td>
                        <td  style="position:relative"><span style="position:absolute; top:14px; right:20px;">명</span><input v-model="startup.hold_employee"  class="input_normal" style="margin-bottom:20px;width:162px;"  type="text" placeholder="00"> </td>
                    </tr>
                    <tr>
                        <td>고용보험 등록기준</td>
                        <td style="position:relative"><span style="position:absolute; top:14px; right:20px;">명</span><input   v-model="startup.assurance_employee"  style="margin-bottom:20px;width:162px;"  class="input_normal"  type="text" placeholder="00"> </td>
                    </tr>               
                </table>
            </div>            
            <div class="wr_con_finance option" data-option="rev" >
            <div class="seg_ttl">매출액</div>  
                <div class="finance_con">
                <table class="finance" style="border:none; border-collapse:collapse">
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

            <div class="wr_con_finance option" data-option="trade">
            <div class="service_name">수출액</div>      
            <div class="finance_con">
                 <table class="finance" style="border:none; border-collapse:collapse">
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
              <div id="wr_con_3">
                <div class="seg_ttl">지식재산권 보유현황</div>
                <table style="margin-top:20px;">
                    <tr>
                        <td style="padding-bottom:20px;">특허권</td>
                        <td style="padding-bottom:20px;"><input id="patent" class="file" type="file"> </td>
                    </tr>
                    <tr style="padding-bottom:20px;">
                        <td style="padding-bottom:20px;">상표권</td>
                        <td style="padding-bottom:20px;"><input id="trademark" class="file" type="file"> </td>
                    </tr>
                    <tr style="padding-bottom:20px;">
                        <td style="padding-bottom:20px;">실용신안</td>
                        <td style="padding-bottom:20px;"><input id="subpatent" class="file" type="file"> </td>
                    </tr>    
                     <tr style="padding-bottom:20px;">
                        <td style="padding-bottom:20px;">디자인</td>
                        <td style="padding-bottom:20px;"><input id="design" class="file" type="file"> </td>
                    </tr>                 
                </table>
            </div>
        </div>       
    </div>
</template>
<script>
var current_year
var current_year_trade
var min_year
var min_year_trade
var revenue;
var rev_year_arr=[]
var trade_year_arr=[]

export default {
    props:["startup"],
    data:function(){
        return{
            countries: "",
        }
    },
    beforeRouteLeave (to, from, next) {
        if(confirm("페이지를 벗어나시겠습니까?")){
            next()
        }
    },
    methods:{   
        del_row:function(e){
            $(e.target).parent().parent().remove()
        },
        init_year_data:function(){
            if (this.startup.found_date != undefined && this.startup.found_date !="")
            var found_year = this.startup.found_date.split("-")[0]
            var current_year = new Date().getFullYear().toString()
            console.log((parseInt(current_year)-parseInt(found_year)))
            for(var k=0; k< (parseInt(current_year)-parseInt(found_year)) ; k++){
                    console.log(parseInt(found_year)+k)
                    rev_year_arr.push(parseInt(found_year)+k)
                    trade_year_arr.push(parseInt(found_year)+k)
            }
            this.set_rev_year()
            this.set_trade_year()
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
        modify_trade:function(e){
            if($(e.path[0]).text()=="수정"){
                $(e.path[0]).text("완료")
                $(e.path[0]).parent().find("div").attr("contenteditable",true)
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
   
             modify_revenue:function(e){
            if($(e.path[0]).text()=="수정"){
                $(e.path[0]).text("완료")
                $(e.path[0]).parent().find("div").attr("contenteditable",true)
            }else{
                $(e.path[0]).text("수정")
                $(e.path[0]).parent().find("div").attr("contenteditable",false)
                var r = $(e.path[0]).parent().find("div").text()
                for(var k=0; k <= this.$props.startup.revenue.length ; k++ ){
                    if(this.$props.startup.revenue[k].id == parseInt( $(e.path[0]).attr("data-id") )){
                        this.$props.startup.revenue[k].num=r
                    } 
                }
            }
        },
         add_revenue(e){
            if( current_year != 2017){
            if($(e.path[0]).text()=="추가" ){
                $(e.path[0]).text("완료")
                $(".add_revenue_row").removeClass("hidden")
                $("#cur_year").text(current_year+1);
            }
            else{
                $(e.path[0]).text("추가")
                $(".add_revenue_row").addClass("hidden")
                current_year = current_year + 1;
                this.$props.startup.revenue.push({
                    "year":$("#cur_year").text(), "num":$("#cur_rev").text()
                })
            }
            }
         
        },
    },
    mounted:function(){
        min_year = 2018;
        current_year = 0
        min_year_trade = 2018;
        current_year_trade = 0
        
        var vue_obj = this

       
        $(document).ready(function(){
            var id = localStorage.getItem("id")
           $("#country").countrySelect();


        vue_obj.$http.get(`/vue_get_grant_optional_data/?gr=`+vue_obj.$route.params.id)
            .then((result)=>{
                console.log(result)
                var target_arr = result.split(",")
                $(".option").each(function(){
                    if(   target_arr.indexOf($(this).attr("data-option")) == -1 ){
                        $(this).addClass("hidden")
                    }  
                })
            })    
         $(".niceCountryInputSelector").each(function(i,e){
                new NiceCountryInput(e).init();
            });
        vue_obj.$http.get(`/vue_get_application/?id=`+localStorage.getItem("id")+`&gr=`+vue_obj.$route.params.id)
            .then((result) => {            
                   console.log(result);
                   vue_obj.$props.startup = result.data
                   vue_obj.init_year_data()
                   }                      
                   )
         
            if($(".f_row").length == 1){
                $(".add_revenue_row").removeClass("hidden")
            }
             if($(".t_row").length == 1){
                $(".add_trade_row").removeClass("hidden")
            }

                $(document).off("click","#apply_next")
                $(document).on("click","#apply_next", function () {
                     var formData = new FormData();
                        
                        var file1 = document.querySelector('#patent');
                        var file2 = document.querySelector('#trademark');
                        var file3 = document.querySelector('#subpatent');
                        var file4 = document.querySelector('#design');
            
                        formData.append("file_1", file1.files[0]);
                        formData.append("file_2", file2.files[0]);
                        formData.append("file_3", file3.files[0]);
                        formData.append("file_4", file4.files[0]);
                var result = confirm("해당 정보를 토대로 기업 정보를 업데이트 하시겠습니까?")
                if(result == true){
                       

                        formData.append('json_data', JSON.stringify(vue_obj.$props.startup)); 
                        vue_obj.$http.post(`/vue_update_startup_with_application_3/`, formData)
                        .then((result) => {
                            console.log(result)
                        })

                }
              
                formData.append('json_data', JSON.stringify(vue_obj.$props.startup)); 
                console.log(vue_obj.$props.startup)
                vue_obj.$http.post(`/vue_update_application/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }).then((result)=>{
                   
                })

                vue_obj.$router.push("/apply/"+vue_obj.$route.params.id+"/oversea_info")
                })
                $(document).off("click","#apply_prev")
                $(document).on("click","#apply_prev", function () {
                var result = confirm("해당 정보를 토대로 기업 정보를 업데이트 하시겠습니까?")
                   var formData = new FormData();
                        
                        var file1 = document.querySelector('#patent');
                        var file2 = document.querySelector('#trademark');
                        var file3 = document.querySelector('#subpatent');
                        var file4 = document.querySelector('#design');
            
                        formData.append("file_1", file1.files[0]);
                        formData.append("file_2", file2.files[0]);
                        formData.append("file_3", file3.files[0]);
                        formData.append("file_4", file4.files[0]);
                        formData.append('json_data', JSON.stringify(vue_obj.$props.startup)); 
                if(result == true){
                  
                        formData.append('json_data', JSON.stringify(vue_obj.$props.startup)); 
                        vue_obj.$http.post(`/vue_update_startup_with_application_3/`, formData)
                        .then((result) => {
                            console.log(result)
                        })
                }
         
                     
                vue_obj.$http.post(`/vue_update_application/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                })
                    vue_obj.$router.push("/apply/"+vue_obj.$route.params.id+"/business_info")
                })
                  $(document).off("click","#apply_save" )            
            $(document).on("click","#apply_save", function(){
                var formData = new FormData();
                                      
                        var file1 = document.querySelector('#patent');
                        var file2 = document.querySelector('#trademark');
                        var file3 = document.querySelector('#subpatent');
                        var file4 = document.querySelector('#design');
            
                        formData.append("file_1", file1.files[0]);
                        formData.append("file_2", file2.files[0]);
                        formData.append("file_3", file3.files[0]);
                        formData.append("file_4", file4.files[0]);
                formData.append('json_data', JSON.stringify(vue_obj.$props.startup)); 
                console.log(vue_obj.$props.startup)
                vue_obj.$http.post(`/vue_update_application/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }).then((result)=>{
                    alert("임시 저장되었습니다.")
                })                
            })



            for(var k =0; k <= vue_obj.$props.startup.revenue.length ; k++){
                try{
                if( parseInt(vue_obj.$props.startup.revenue[k].year) < min_year )
                    min_year =  parseInt(vue_obj.$props.startup.revenue[k].year)
                if( parseInt(vue_obj.$props.startup.revenue[k].year) > current_year )
                    current_year =  parseInt(vue_obj.$props.startup.revenue[k].year)
                console.log(min_year)
                }
                catch(e){
                    console.log(e)
                }
            }
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
        })
    },
      created: function() {
    this.getCountriesList()
  }
}
</script>

<style scoped>
button{
    border-radius: none!important;
    
}

.add_rev,.add_trade{
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
.finance_con{
  margin-top: 26px;
  width:516px;
  padding: 8px 16px;
  margin-left: 206px;
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
textarea{
    font-size: 14px;
    line-height: 1.71;
    color: #1a2f53;
    padding: 16px;
    width: 944px;
    height: 335px;
}
.text_num{
    font-size: 14px;
    line-height: 1.71;
    color: #a0a3bc;
    margin-top: 2px;
}

tr>td:nth-child(1){
    font-size: 16px;  
    color: #1a2f53;
}
#wr_con_3{
     width: 1144px;
  height: 342px;
  background-color: #ffffff;
  padding: 40px;
  margin-top: 24px;

}
.file{
    padding: 10px;
    border: 1px solid #ced4da;
    padding-left: 176px;
    padding-right: 0px;
    height:36px;
    line-height: 36px;
  
}
#f_li>li>div{
    width:322px; 
    height: 170px;    
    float: left;
}
.filter_ttl{
    display: block;
    float: left;
    width: 106px;
    font-size: 14px;
  color: #7697ab;
  line-height: 35px;
}
.filter_ul{
    display: inline-block;

}
.filter_ul>li{
    line-height: 35px;
    cursor: pointer;
}

#wr_con_2>table{
    margin-top: 40px;
}
.filter{
    font-size: 14px;
  color: #1b66f4;
  margin-right: 58px;
  opacity: 0.5;
  cursor: pointer;
}
.filter:hover{
      font-size: 14px;
  font-weight: bold;
  color: #1b66f4!important;
  opacity: 1!important;
}

.seg_title{
    font-size: 16px;
    color: #a0a3bc;

}
#wr_con_2{
    width: 1144px;
    height: 260px;;
    background-color: #ffffff;
    margin-top: 24px;
    padding: 40px;
    margin-bottom: 24px;
}
tr>td:nth-child(1){
    width: 172px;
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

#base_info{
    position: relative;
    width:100%;
}
#case_con{
    width: 1224px;
    margin: 0px auto;
}
#base_title{
    width: 95px;
    height: 32px;  
    font-size: 24px; 
    letter-spacing: -1px;
    color: #a0a3bc;
    margin-top: 31px;
}
#wr_con_1{
    margin-top: 40px;
    width: 1160;
    

    background-color: #ffffff;
    padding : 32px 32px; 
}

#wr_con_1>table{
    
}
.input_normal{
    width: 415px;
    height: 40px;
    border: solid 1px #ced4da;
    font-size: 14px;
    letter-spacing: normal;
    color: #1a2f53;
    padding-left: 16px;
    line-height: 40px;
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



.wr_con_finance{
    width: 1160px;
    background-color: #fff;
    position: relative;
    margin-bottom: 24px;
  
    padding: 40px;
    padding-left: 24px;
}
.add_btn{
    position: absolute;
     font-size: 14px; 
  color: #1b66f4;
  top:40px;
  right: 24px;
}



#base_info{
    position: relative;
    width:100%;
}
#case_con{
    width: 1224px;
    margin: 0px auto;
}
#base_title{
    width: 95px;
    height: 32px;  
    font-size: 24px; 
    letter-spacing: -1px;
    color: #a0a3bc;
    margin-top: 31px;
}
.seg_ttl{
    font-size: 16px;
   
}

.modi_btn{   
    font-size: 14px;   
    color: #1b66f4;   
    position: absolute;
    top:30px;
    right:24px;
    cursor: pointer;
}

</style>
import axios from "axios"

export function test(){
    console.log("dddd")
}

// 유저  유틸리티 함수, 클래스

export function go(url,vue_obj){
    vue_obj.$router.push(url)
}


export class HeartAdd{
    check_user() {
        if(localStorage.getItem("user")!="u"){
            if( localStorage.getItem("user") == "m" ||localStorage.getItem("user")=="ma"){ 
                alert("관심담기를 할수 없는 계정입니다."); return false;
             }  
             else {
                 alert("로그인을 해주세요."); 
                return false;    
             }
        }else{
            return true
        }
    }
    toggle_heart(event,kind,id,obj){
        console.log("하트를 토글합니다.")
            var t = kind
            var vue_obj = obj
            if( t == "path")  {var url = "/toggle_int_path/"; var text="패스";}
            else if(t == "course") {var url = "/toggle_int_course/"; var text="코스";}
            else if(t == "clip") {var url = "/toggle_int_clip/"; var text="강의";}
            else if(t == "startup") {var url = "/vue_toggle_interest_st/"; var text="스타트업";}
            else if(t == "sp") {var url = "/vue_toggle_interest_sb/"; var text="지원사업";}
                    if($(event.target).attr("src").indexOf("_p") != -1){
                    if(confirm("관심 "+text+"에서 삭제하시겠습니까?")){
                        $.ajax({
                            url:vue_obj.baseURI+url,
                            type:"post", 
                            data:{
                                "id":localStorage.getItem("id"),
                                "val":id
                            },
                            success:function(res){
                                alert("성공적으로 삭제 되었습니다.")
                                $(event.target).attr("src","/static/img/like_d.png")
                                                             
                            }
                        })
                    }
                    }
                    else{
                        $.ajax({
                            url:vue_obj.baseURI+url,
                            type:"post", 
                            data:{
                                "id":localStorage.getItem("id"),
                                "val":id
                            },
                            success:function(res){
                                alert("성공적으로 등록 되었습니다.")
                                 $(event.target).attr("src","/static/img/like_p.png")
                              
                            }
                        })
                    }      
    }
    action_heart(event,target,id,obj){
        console.log("test!!!")
        if(this.check_user()){
            //유저가 참이라면
            this.toggle_heart(event,target,id,obj);
        }else{
            // 유저가 거짓이라면
            alert("관심담기가 안되는 계정입니다.")
        }
        return false
    }   
} 

export function check_fav(obj){
    $.ajax({
        url:obj.baseURI+"/vue_get_all_fav/",
        type:"post",
        data:{"id":localStorage.getItem("id")},
        success:function(res){
            console.log(res)
             $(".heart").each(function(){
                if($(this).attr("data-target")=="clip"){
                    if(res.clip.indexOf(parseInt($(this).attr("data-id"))) != -1){                            
                            $(this).find("img").attr("src","/static/img/like_p.png")
                    }
                    }
                if($(this).attr("data-target")=="course"){
                    if(res.course.indexOf(parseInt($(this).attr("data-id"))) != -1){                            
                            $(this).find("img").attr("src","/static/img/like_p.png")                       
                    }
                    }
                if($(this).attr("data-target")=="path"){
                    if(res.path.indexOf(parseInt($(this).attr("data-id"))) != -1){                            
                            $(this).find("img").attr("src","/static/img/like_p.png")                    
                    }
                    }
               if($(this).attr("data-target")=="startup"){
                    if(res.startup.indexOf(parseInt($(this).attr("data-id"))) != -1){                            
                            $(this).find("img").attr("src","/static/img/like_p.png")
                    }
                    } 
                })
            }
    })
}

// 태시 태그 문자열 만들어주는 함수
export function make_hash_string(e){
    e= e.target
    $(e).val("#"+$(e).val().slice(1,$(e).val().length).replace("##","#").replace(/\s/g,"#"));
    $(e).val($(e).val().replace("##","#"));
}




// 매출액 입력하는 함수, 클래스
// 연혁에서 최초 설립일 데이터를 받아옴.
// 현재 년도에서 1년씩 감산하면서 년도가 입력되어진채로 row 추가 됨.
// 호출해서 선언하면 
class RevenueManager{
    found_date="";
    found_year=""
    current_year = ""
    year_arr=[]
    // 연혁에서 최초 설립일 데이터를 받아옴.
    init(id,obj){
        axios.get(`${obj.baseURI}/vue_get_startup_detail`,{"id":id})
        .then((result)=>{
            console.log(result)
            if(result.found_date != ""){
                this.current_year = new Date().getFullYear()
                this.found_date = result.found_date
                this.found_year = result.found_year
                for(var k=0; k< (parseInt(this.current_year)-parseInt(this.found_year)) ; k++){
                    year_arr.push(parseInt(this.found_year)+k)
                }

            }           
        })        
    }
    get_submitted_year(arr){
        for(var k=0; k < arr.length; k++ ){
            if(this.year_arr.indexOf(arr[k])){
                this.year_arr.slice( this.year_arr.indexOf(arr[k]) ,1 ) // 현재 인덱스를 찾아서 지우기
            }
        }
    }

    get_found_year(){
        return this.found_date.split("-")[0]
    }
    get_target_year(){

        var target_year = this.year_arr.pop()
        console.log(target_year)
        return target_year
    }
    

    // 현재 추가될 row 의 년도를 계산함
    calc_current_year(){

    }    
    //revenue 행 추가 하고 dom 조작
    add_row(){

    }
    //행 삭제
    delete_row(){

    }
}



// 수출액 입력하는 함수, 클래스
// 현재 년도에서 1년씩 감산하면서 년도가 입력되어진채로 row 추가 됨.
class TradeManager{
    // 연혁에서 최초 설립일 데이터를 받아옴.
    get_found_year() {
        
    }
    // 현재 추가될 row 의 년도를 계산함
    calc_current_year(){

    }    
    //revenue 행 추가 하고 dom 조작
    add_row(){

    }
    //행 삭제
    delete_row(){
        
    }
}




// 투자액 입력하는 함수 , 클래스
class InvestManager{
    // 연혁에서 최초 설립일 데이터를 받아옴.
    get_found_year() {
        
    }
    //revenue 행 추가 하고 dom 조작
    add_row(){

    }
    //행 삭제
    delete_row(){
        
    }
}










//매니저, 기관 관리자 유틸리티 함수


// 파이그래프 만들기
export function make_pie_graph(target, arr,arr2){
    $(target).empty()
    var group = d3.select(target)
                  .attrs({ width: 300, height: 300 })
                  .append('g')
                  .attr('transform', 'translate(100, 100)');
    var data = arr;
    var pieSegments = d3.pie()(data);
    var arcGenerator = d3.arc()
                         .innerRadius(70)
                         .outerRadius(100)
                         .startAngle(function (d) { return d.startAngle; })
                         .endAngle(function (d) { return d.endAngle; });
    var colors = d3.scaleOrdinal(d3.schemeCategory10);
    group.selectAll('path')
         .data(pieSegments)
         .enter()
         .append('path')
         .attrs({ d: arcGenerator, stroke: 'white',
                  'stroke-width': 0, fill: function (d, i) {
                      return colors(i);
                  },
         });
         $(target).parent().parent().find(".column").find("ul").empty()
         for(var k=0; k < arr2.length;k++){
             var $seg =  "<li><span style='background-color:"+colors(k)+"'></span><span>"+arr2[k]+":"+arr[k]+"</span></li>"
              $(target).parent().parent().find(".column").find("ul").append($seg)
         }
}
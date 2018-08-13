<template>
    <div id="static_content">
        <StaticNavigation></StaticNavigation>
        <div id="top_banner">
            <div class="on"> 
                <span class="title">진행중 사업 LSB2</span>
             
            </div>
            <div>
                <span class="title">총 등록사업(누적)</span>
         
            </div>
        </div>
        <div id="gr_back" style="background-color:#fff; width:1144px;padding:40px;margin-top:52px;">
        <div id="select_zone" style="position:relative">
         <select id="grant_select" class="basic">
	            <option value="all">전체</option>
	            <option v-for="sp in base_info.current_grant_list"  v-bind:data-id="sp.id">{{sp.name}}</option>
            </select>
            
            <!-- <div id="static_pdf_down" v-on:click="open_window"  >통계 PDF 다운</div>-->
            <div id="static_pdf_down" v-on:click="makePDF" style="right:100"  >통계 PDF 다운</div> 
            <div style="    position: absolute;    width: 38px;    height: 86px;      z-index: 999999000;    top: 566px; background-color: #fff;"></div>
        
        </div>
        <div id="test_div">
         <svg id="sgv_11_all" width="1144" height="612"></svg></div>
         <div id="select_zone_2">
            <select class="basic">
	            <option value="0">전체</option>
                <option value="2">방문자</option>
	            <option value="1">지원자</option>
	            <option value="3">선정자</option>	       
            </select>      
            <div id="person_num">{{pre_entry.length}}<span>명</span></div>   
        </div>
        <div id="pie_con">
            <div class="pie_seg">
                <div class="pie">
                    <span>지역</span>
                    <svg id="pie_0" style="margin-top:59px;margin-left:43px"></svg>
                </div>
                <div class="column">
                    <ul>                                                       
                    </ul>
                </div>
            </div>
            <div class="pie_seg">
                <div class="pie">
                     <span>업종</span>
                    <svg id="pie_1" style="margin-top:59px;margin-left:43px"></svg>
                </div>
                <div class="column">  <ul>
                                                        
                    </ul></div>
            </div>
            <div class="pie_seg">
                <div class="pie">
                     <span>직원수</span>
                    <svg id="pie_2" style="margin-top:59px;margin-left:43px"></svg>
                </div>
                <div class="column">  <ul>
                                                              
                    </ul></div>
            </div>
            <div class="pie_seg">
                <div class="pie">
                     <span>태그</span>
                    <svg id="pie_3" style="margin-top:59px;margin-left:43px"></svg>
                </div>
                <div class="column">  
                    <ul>
                                                         
                    </ul></div>
            </div>
        </div>
        <div id="list_view">
            <div id="list">리스트 보기 <i style="cursor:pointer" class="fas fa-chevron-up"></i> </div>
            <div id="sub_btn">
                <span id="excel_down" >리스트 엑셀로 내보내기</span>
                  <div id="input_box"><input type="text"><i class="fas fa-search"></i></div>
                <div> 
                    <span class="change_num num_on" data-num="10">10개 보기</span>
                    <span class="change_num" data-num="50">50개 보기</span>
                    <span class="change_num" data-num="100">100개 보기</span>
                    <span class="change_num" data-num="all">전체 보기</span>
                </div>
            </div>
            <table id="list_tbl">
                <thead>
                    <tr>
                        <td>순서 <i class="fas fa-sort-down"></i></td>
                        <td>아이디 <i class="fas fa-sort-down"></i></td>
                        <td>기업명 <i class="fas fa-sort-down"></i></td>
                        <td>업종 <i class="fas fa-sort-down"></i></td>
                        <td>지역 <i class="fas fa-sort-down"></i></td>
                        <td>직원수 <i class="fas fa-sort-down"></i></td>
                        <td>연락처 <i class="fas fa-sort-down"></i></td>
                        <td>제출일 <i class="fas fa-sort-down"></i></td>
                        <td style="text-align:right; padding-right:30px;">전체 지원서류 <i class="fas fa-sort-down"></i></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="e in entry">
                        <td>{{e.index}} </td>
                        <td>{{e.email}} </td>
                        <td>{{e.name}} </td>
                        <td>{{e.kind}} </td>
                        <td>{{e.local}} </td>
                        <td>{{e.employee_num}} </td>
                        <td>{{e.tel}}</td>
                        <td>{{e.submit_day}} </td>
                        <td style="text-align:right; padding-right:30px;"><span v-bind:class="{hidden:e.no_file , file:true}">지원서류 <i class="fas fa-file-archive"></i></span> </td>
                    </tr>             
                </tbody>
            </table>
            <div id="tbl_pagination" style="margin-top:37px;">
                <i id="before_list" class="fas fa-chevron-left"></i>
                    <span class="list_btn" v-for="l in list_nav" v-bind:data-num="l">{{l}}</span>
                <i id="after_list" class="fas fa-chevron-right"></i>
            </div>
        </div>
        </div>
        <img id="loading" class="hidden" src="/static/img/loading.gif">
<div id='tooltip' style='position:absolute;background-color:lightgray;padding:5px'></div>
    </div>
</template>


<script>
import StaticNavigation from "./StaticNavigation.vue"
import axios from "axios"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { setTimeout } from 'timers';


function format_date(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

function dict_sort(arr){
    arr.sort(function(a,b){  return (a[Object.keys(a)[0]]) < (b[Object.keys(b)[0]]) ?
                 -1 : (a[Object.keys(a)[0]]) > (b[Object.keys(b)[0]]) ? 1 : 0;   }).reverse()
    var value_list = []
    var key_list = []
    for(var k = 0; k < arr.length; k++){
        value_list.push(arr[k][Object.keys(arr[k])[0]])
        key_list.push(Object.keys(arr[k])[0])
    }
    var result = new Object();
    result.value=value_list
    result.key=key_list
    return result
}



export default {
    components:{
        StaticNavigation
    },
    methods:{

        manager_sel:function(){
            this.grant_list = []
            for(var k =0; k < this.manager_list.length; k++){
                if( parseInt(this.manager_list[k].id) == parseInt($("#manager_sel").val()) ){
                    this.grant_list = this.manager_list[k].grant
                }
            }

        },
        open_window:function(){
   
            var url="/manager/statics/by_grant/popup/219";
            window.open(url,"","width=800,height=800,left=600");}
    ,  
    makePDF: function(selector = 'body') {
        $(".change_num.num_on").click();
        $("#list_view").addClass("hidden")
        $(".zoom").attr("width","1")
        $(".zoom").attr("height","1")
   
			window.html2canvas = html2canvas //Vue.js 특성상 window 객체에 직접 할당해야한다.
			let that = this
			let pdf = new jsPDF('l', 'mm', 'a4')
			let canvas = pdf.canvas
			const pageWidth = 295 //캔버스 너비 mm
			const pageHeight =210  //캔버스 높이 mm
			canvas.width = pageWidth                 

            var ele = document.querySelector('#test_div')
			let width = ele.offsetWidth // 셀렉트한 요소의 px 너비
			let height = ele.offsetHeight // 셀렉트한 요소의 px 높이
			let imgHeight = pageWidth * height/width // 이미지 높이값 px to mm 변환
			if(!ele){
				console.warn(selector + ' is not exist.')
				return false            }
            
            	html2canvas(ele).then(canvas=>{
                    	let position = 0
                    var imgData = canvas.toDataURL('image/png')
                    var downloadLink = document.createElement("a");
                    document.body.appendChild(downloadLink);
                    downloadLink.style.display = "none";
                    downloadLink.href = imgData;
                    downloadLink.download = "전체 통계.PNG";
                    downloadLink.click();
                    downloadLink.remove()
                    
					pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight, undefined, 'slow')
					//Paging 처리
					let heightLeft = imgHeight //페이징 처리를 위해 남은 페이지 높이 세팅.
					heightLeft -= pageHeight
					while (heightLeft >= 0) {
						position = heightLeft - imgHeight
						pdf.addPage();
						pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight)
						heightLeft -= pageHeight
					}
					//pdf.save("test" +'.pdf')
                })
                setTimeout(function(){
                var ele = document.querySelector('#gr_back')
			 width = ele.offsetWidth // 셀렉트한 요소의 px 너비
			 height = ele.offsetHeight // 셀렉트한 요소의 px 높이
             imgHeight = pageWidth * height/width // 이미지 높이값 px to mm 변환



             $("#person_num").css({
                    "display": "inline-block",
                    "margin-left": "30px"
             })
             $("#pie_con").css("margin-left", "158px")
                	html2canvas(ele).then(canvas=>{
                    	let position = 0
                  var imgData = canvas.toDataURL('image/png')
					pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight, undefined, 'slow')
					//Paging 처리
					let heightLeft = imgHeight //페이징 처리를 위해 남은 페이지 높이 세팅.
					heightLeft -= pageHeight
					while (heightLeft >= 0) {
						position = heightLeft - imgHeight
						pdf.addPage();
						pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight)
						heightLeft -= pageHeight
					}
                    pdf.save("사이트 통계" +'.pdf')
                     $("#pie_con").css("margin-left", "0")
                      $("#person_num").css({
                    "display": "block",
                    "margin-left": "0px"
             })
                })
                },1000)
               

            setTimeout(function(){
  var ele = document.querySelector('#pie_con')
			 width = ele.offsetWidth // 셀렉트한 요소의 px 너비
			 height = ele.offsetHeight // 셀렉트한 요소의 px 높이
			 imgHeight = pageWidth * height/width // 이미지 높이값 px to mm 변환
			if(!ele){
				console.warn(selector + ' is not exist.')
				return false
            }
            	html2canvas(ele).then(canvas=>{
                    	let position = 0
                    var imgData = canvas.toDataURL('image/png')
                    var downloadLink = document.createElement("a");
                    document.body.appendChild(downloadLink);
                    downloadLink.style.display = "none";
                    downloadLink.href = imgData;
                    downloadLink.download = "태그통계.PNG";
                    downloadLink.click();
                    downloadLink.remove()
                    
					pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight, undefined, 'slow')
					//Paging 처리
					let heightLeft = imgHeight //페이징 처리를 위해 남은 페이지 높이 세팅.
					heightLeft -= pageHeight
					while (heightLeft >= 0) {
						position = heightLeft - imgHeight
						pdf.addPage();
						pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight)
						heightLeft -= pageHeight
					}
					//pdf.save("test" +'.pdf')
                })

                    $(".zoom").attr("width","1084")
                    $(".zoom").attr("height","482")

            },2000)
          



			// html2canvas(ele, {
			// 	onrendered: function(canvas) {
			// 		let position = 0
			// 		const imgData = canvas.toDataURL('image/png')
			// 		pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight, undefined, 'slow')
			// 		//Paging 처리
			// 		let heightLeft = imgHeight //페이징 처리를 위해 남은 페이지 높이 세팅.
			// 		heightLeft -= pageHeight
			// 		while (heightLeft >= 0) {
			// 			position = heightLeft - imgHeight
			// 			pdf.addPage();
			// 			pdf.addImage(imgData, 'png', 0, position, pageWidth, imgHeight)
			// 			heightLeft -= pageHeight
			// 		}
			// 		pdf.save(that.propTitle.toLowerCase() +'.pdf')
			// 	},
			// });	
        
},

    },
    data:function(){
        return{
            f_entry:[],
            pre_entry:[],
            entry:[
               
            ],
            base_info:{

              },
            list_nav:[

            ],
            manager_list:[],
            grant_list:[],
        }
    },
    mounted:function(){
    var vue_obj=this

    //기관 관리자 라면 ;
    try{
        if(user.has("manager"))
        $("manager_select").removeClass("hidden")
    }
    catch(e){
        console.log(e)
    }
   
    // SVG 선언, 
    var svg = d3.select("#sgv_11_all"),

    // 차트 크기 설정 (chart size settings)
    margin = {top: 20, right: 20, bottom: 110, left: 40},
    margin2 = {top: 530, right: 20, bottom: 40, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    height2 = +svg.attr("height") - margin2.top - margin2.bottom;

    // 입력 데이타 날짜 포맷    
    var parseDate = d3.timeParse("%Y-%m-%d");
    
    // 차트 x,y 축의 스크린좌표 설정 
    var x_data = d3.scaleTime().range([0, width]), // 공통 x 축 
    y = d3.scaleLinear().range([height, 0]), // not used here
    x2 = d3.scaleTime().range([0, width]), // 브러시 영역 x 축 
    y2 = d3.scaleLinear().range([height2, 0]); // 브러시 영역 y 축 

    // 주 차트 영역의 좌측 y 축 스크린 영역 설정
    var y_left  = d3.scaleLinear().range([height, 0]); //lsb1 : left y axis (higher values)
    // 주 차트 영역의 우측 y 축 스크린 영역 설정
    var y_right = d3.scaleLinear().range([height, 0]); //lsb1 : left y axis (lower values)
   
    var tooltip = d3.select('#tooltip');  // html div 형태의 툴팁 지원: 미사용

    var Line_chart; // 주 차트 영역 라인 그래프 컨테이너
    var line1; // line1 데이타 해석 함수 
    var line2; // line2 데이타 해석 함수 
    var line3; // line3 데이타 해석 함수 
    var line4; // line4 데이타 해석 함수 
    var line5; // line5 데이타 해석 함수 
    var line6; // line6 데이타 해석 함수 
    var line7; // line7 데이타 해석 함수 
    var line8; // line8 데이타 해석 함수 
    var line9; // line9 데이타 해석 함수 

    // 차트 x,y축 틱 표시 설정
    var xAxis = d3.axisBottom(x_data)
          .tickFormat(d3.timeFormat("%m-%d"))
          .tickPadding(2) ,
        xAxis2 = d3.axisBottom(x2)
          .tickFormat(d3.timeFormat("%m-%d"))
          .tickPadding(2) ,
        yAxisLeft = d3.axisLeft(y_left),
        yAxisRight = d3.axisRight(y_right);

    // y 데이타를  좌측(높은 범위)과 우측(낮은 범위) 범주로 분리 
    var list_lower_data_n=[]; // 낮은 데이타값: 우측 레젠드에 표시
    var list_upper_data_n=[]; // 높은 데이타값: 좌측 레젠드에 표시
    var list_data=[null]; // null과 9 개의 데이타 배열 (base 1) 
    var data_legend_LR=[null]; // null 과 9개의 데이타 위치 표시 (data-legend-left / data-legend-right)
    var total_max_y; // 높은 값들의 최대치 
    var lower_max_y; // 낮은 값들의 최대치 
    var threshold=0.5; // 높은 값들의 최대치에서 얼마의 비율을 낮은 값들의 최대치 경계선으로 정할지를 지정
                       // 데이타 최대치가 70 이고, threshold=0.5 이면 35가 낮은 데이타 영역 값들의 최대치임 
		       // 최대치가 35보다 작은 데이타배열은 우측에, 35보다 큰 데이타 배열들은 좌측 레전드에 배정

    var old_x_data_domain;
    var new_x_data_domain;

    // 레전드 세팅 (legend setting), 데이타의 내용물의 이름을 설정
    var data_legend_names=[
      "",
      "DATA1",
      "DATA2",
      "DATA3",
      "DATA4",
      "DATA5",
      "DATA6",
      "DATA7",
      "DATA8",
      "DATA9" 
    ];
    // 레전드 컬러 설정 (legend color setting), 
    var data_line_color=[
        "",
        "steelblue",
        "red",
        "black",
        "green",
        "yellow",
        "brown",
        "rosybrown",
        "orangered",
        "purple" 
    ];

    //좌측 레전드 박스 위치/크기 설정
    var left_legend_pos_x= 50;
    var left_legend_pos_y= 0;
    var left_legend_width= 150;

    //우측 레전드 박스 위치/크기 설정
    var right_legend_pos_x= width-250;
    var right_legend_pos_y= 0;
    var right_legend_width= 150;

    //레전드 row 의 높이 설정, 글씨 크기는 16자 정도가 기본인데 이를 늘리려면, 아래 높이도 높여야
    var legend_each_height= 19;
    var legend_font_size= "16px";


    // 새도우 필터 설정 (shadow filter settings)
    var defs = svg.append("defs");

    var filter = defs.append("filter")
	      .attr("id", "dropshadow");

	  filter.append("feGaussianBlur")
	      .attr("in", "SourceAlpha")
	      .attr("stdDeviation", 4)
	      .attr("result", "blur");
	  filter.append("feOffset")
	      .attr("in", "blur")
	      .attr("dx", 2)
	      .attr("dy", 2)
	      .attr("result", "offsetBlur");
          
	    filter.append("feFlood")
	      .attr("in", "offsetBlur")
	      .attr("flood-color",'#cccccc')
	      .attr("flood-opacity", "1")
	      .attr("result", "offsetColor");

	    filter.append("feComposite")
	      .attr("in", "offsetColor")
	      .attr("in2", "offsetBlur")
	      .attr("operator", "in")
	      .attr("result", "offsetBlur");

	  var feMerge = filter.append("feMerge");

	  feMerge.append("feMergeNode")
	      .attr("in", "offsetBlur")
	  feMerge.append("feMergeNode")
	      .attr("in", "SourceGraphic");

 
    // 축 라벨 이름 설정 (axis label name settings)
    var axis_x_label="날짜";
    var axis_y_left_label="횟수";
    var axis_y_right_label="횟수";
    
    // mousefocus: 마우스로 라인 그래프의 데이타 점 위를 호버할 때,  원과 툴팁이 나타나는 원점을 정의  
    var mousefocus = svg.append("g")
        .attr("x", 0)
        .attr("y", 0);


    // 차트의 최상위 컨테이너
    var focus = svg.append("g");
    focus.attr("class", "focus")
        .attr("stroke-width","1px")
        .attr("stroke","#000000")
        .attr("fill","none")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 하단 차트의 줌제어용 브러시 영역 
    var brush;

    // 상단 차트의 줌제어용 큰 투명 사각형 : 줌 인아웃과 패닝 지원 
    var zoom;


    // 하단 브러시 영역의 차트의 컨테이너 
    var context = svg.append("g")
        .attr("class", "context")
        .attr("stroke","#000")
        .attr("strok-width","1px")
        .attr("fill","none")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


if(false){ //  툴팁과 함께  가로 세로선을 표시했었으나 지금은 미사용 
    mousefocus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 20)
        .attr("y2", 30) 
  	.attr("stroke","brown") 
  	.attr("stroke-width","4px") 
  	.attr("stroke-dasharray","3,3");

    mousefocus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", 0)
        .attr("x2", 0) 
        .attr("y1", 10)
        .attr("y2", 20)
  	.attr("stroke","brown") 
  	.attr("stroke-width","4px") 
  	.attr("stroke-dasharray","3,3");
};

    // 마우스 툴팁의 원 모양 설정
    mousefocus.append("circle")
        .attr("x", 0)
        .attr("y", 0) 
        .attr("transform", "translate(-2.5,0)") 
  	.attr("fill","white") 
  	.attr("stroke","brown") 
  	.attr("stroke-width","2px") 
  	.attr("r","5px");

    {  // 캡(윗방향) 달린 사각형 툴팁 
	 var polydata = ["0,0","-5,15","-75,15","-75,75","75,75","75,15","5,15","0,10" ];

         mousefocus.append("polygon")
		.attr("points", polydata) 
		.attr("stroke", "#cccccc")
		.attr("stroke-width", 2)
		.attr("fill", "white") 
		.attr("transparent", "none") 
		.attr("filter","url(#dropshadow)");
    };

    // 마우스 툴팁의 텍스트 영역 
    var textgroup= mousefocus.append("g").attr("class", "tt_text_group");

    // 데이타 배열 이름용 (DATA1,2,3...)
    textgroup.append("text")
        .attr("class", "tt_text1")
        .attr("x", -70)
      	.attr("dy", 20+16*1);

    // Y 축 데이타 값 
    textgroup.append("text")
        .attr("class", "tt_text2")
        .attr("x", -70)
      	.attr("dy", 20+16*2);

    // X 축 데이타 값 (2018-04-04 ...)
    textgroup.append("text")
        .attr("class", "tt_text3")
        .attr("x", -70)
      	.attr("dy", 20+16*3);

    // 마우스 툴팁 svg 영역은 처음에 표시하지 않고, mouseover 시에 표시를 on 하고, mouseout 시 표시 off 한다.
    //   아래 mouseover,mouseout 이벤트 핸들어 참조
    mousefocus.attr("display","none");





$(document).ready(function(){
    $("#loading").removeClass("hidden")
    $("#loading").css("position","fixed")
    $("#loading").css("top","400px")
    $("#loading").css("left","50%")
    $("#loading").css("margin-left","-200px")
    $.ajax({
        url: "/vue_get_manager_list/",
        type:"post",
        data:{
            "id":localStorage.getItem("id")
        },
        success:function(res){
            console.log(res)
            vue_obj.manager_list = res.slice()
        }
    })

    $(document).off("change","#grant_select")
    $(document).on("change","#grant_select",function(){

    $("#loading").removeClass("hidden")
    $("#loading").css("position","fixed")
    $("#loading").css("top","400px")
    $("#loading").css("left","50%")
    $("#loading").css("margin-left","-200px")

    var url = `/get_grant_static_detail/?id=`+localStorage.getItem("id")+"&sb_id="+ $("#grant_select").find("option:selected").attr("data-id")
    vue_obj.$http.get(url)
            .then((result) => {
                console.log(result.data.title)
                $("#select_zone>.basic").find("option:contains('"+ result.data.title +"')").prop("selected",true)

                var temp_data_0 = vue_obj.base_info.current_grant_list
                var temp_data_1 = vue_obj.base_info.current_grant
                var temp_data_2 = vue_obj.base_info.total_grant            
                vue_obj.base_info = result.data
                vue_obj.base_info.current_grant_list = temp_data_0  
                vue_obj.base_info.current_grant= temp_data_1
                vue_obj.base_info.total_grant= temp_data_2

                vue_obj.all_startup_list = result.data.all_startup_list
                vue_obj.pre_entry = result.data.all_startup_list
                vue_obj.entry = vue_obj.all_startup_list.slice(0,10)
                vue_obj.list_nav=[]
                for(var k=1; k <= Math.ceil(vue_obj.pre_entry.length/10); k++){vue_obj.list_nav.push(k)}
               
                update_zoomable_line()
                var result = dict_sort(vue_obj.base_info.all_local_tag)
                vue_obj.utils.make_pie_graph("#pie_0", result.value , result.key)
                var result2 = dict_sort(vue_obj.base_info.all_kind_tag)
                vue_obj.utils.make_pie_graph("#pie_1", result2.value , result2.key)
                var result3 = dict_sort(vue_obj.base_info.all_em_tag)
                vue_obj.utils.make_pie_graph("#pie_2", result3.value , result3.key)
                var result4 = dict_sort(vue_obj.base_info.all_tag_tag)
                vue_obj.utils.make_pie_graph("#pie_3", result4.value , result4.key)
                $(".list_btn").removeClass("bold")
                $(".list_btn:eq(0)").addClass("bold")

                $("#loading").addClass("hidden")

        })
    }) // end of on change : lsb


    $(document).on("click",".title", function(){
        $(".title").parent().removeClass("on")
        $(this).parent().addClass("on")
    })

    $(document).on("click","#excel_down", function(){     
        var ee = excelExport("list_tbl").parseToCSV().parseToXLS("excelexport sheet");
            location.href = ee.getXLSDataURI();
})
       
vue_obj.$http.get(`/get_static_info/?id=`+localStorage.getItem("id"))
        .then((result) => {
                $("#loading").addClass("hidden")
                vue_obj.base_info = result.data
                console.log(vue_obj.base_info)
                vue_obj.all_startup_list = result.data.all_startup_list
                vue_obj.pre_entry = result.data.all_startup_list
                vue_obj.entry = vue_obj.all_startup_list.slice(0,10)
                vue_obj.list_nav=[]
                for(var k=1; k <= Math.ceil(vue_obj.pre_entry.length/10); k++){vue_obj.list_nav.push(k)}
              
                init_zoomable_line()
                var result = dict_sort(vue_obj.base_info.all_local_tag)
                vue_obj.utils.make_pie_graph("#pie_0", result.value , result.key)
                var result2 = dict_sort(vue_obj.base_info.all_kind_tag)
                vue_obj.utils.make_pie_graph("#pie_1", result2.value , result2.key)
                var result3 = dict_sort(vue_obj.base_info.all_em_tag)
                vue_obj.utils.make_pie_graph("#pie_2", result3.value , result3.key)
                var result4 = dict_sort(vue_obj.base_info.all_tag_tag)
                vue_obj.utils.make_pie_graph("#pie_3", result4.value , result4.key)
                $(".list_btn").removeClass("bold")
                $(".list_btn:eq(0)").addClass("bold")     


                if( vue_obj.$route.params.id != undefined){

                vue_obj.$http.get(`/get_grant_static_detail/?id=`+localStorage.getItem("id")+"&sb_id="+ vue_obj.$route.params.id)
                .then((result) => {
                console.log(result.data.title)
                $("#select_zone>.basic").find("option:contains('"+ result.data.title +"')").prop("selected",true)

                var temp_data_0 = vue_obj.base_info.current_grant_list
                var temp_data_1 = vue_obj.base_info.current_grant
                var temp_data_2 = vue_obj.base_info.total_grant            
                vue_obj.base_info = result.data
                vue_obj.base_info.current_grant_list = temp_data_0  
                vue_obj.base_info.current_grant= temp_data_1
                vue_obj.base_info.total_grant= temp_data_2

                vue_obj.all_startup_list = result.data.all_startup_list
                vue_obj.pre_entry = result.data.all_startup_list
                vue_obj.entry = vue_obj.all_startup_list.slice(0,10)
                vue_obj.list_nav=[]
                for(var k=1; k <= Math.ceil(vue_obj.pre_entry.length/10); k++){vue_obj.list_nav.push(k)}
               
                update_zoomable_line()
                var result = dict_sort(vue_obj.base_info.all_local_tag)
                vue_obj.utils.make_pie_graph("#pie_0", result.value , result.key)
                var result2 = dict_sort(vue_obj.base_info.all_kind_tag)
                vue_obj.utils.make_pie_graph("#pie_1", result2.value , result2.key)
                var result3 = dict_sort(vue_obj.base_info.all_em_tag)
                vue_obj.utils.make_pie_graph("#pie_2", result3.value , result3.key)
                var result4 = dict_sort(vue_obj.base_info.all_tag_tag)
                vue_obj.utils.make_pie_graph("#pie_3", result4.value , result4.key)
                $(".list_btn").removeClass("bold")
                $(".list_btn:eq(0)").addClass("bold")

                    })

                    }

});

  


$(document).off("change","#select_zone_2");

$(document).on("change","#select_zone_2>.basic:eq(0)", function(){
        if($(this).val()=="0"){
                vue_obj.pre_entry = vue_obj.base_info.all_startup_list
                vue_obj.entry = vue_obj.base_info.all_startup_list.slice(0,10)
                var result = dict_sort(vue_obj.base_info.all_local_tag)
                vue_obj.utils.make_pie_graph("#pie_0", result.value , result.key)
                var result2 = dict_sort(vue_obj.base_info.all_kind_tag)
                vue_obj.utils.make_pie_graph("#pie_1", result2.value , result2.key)
                var result3 = dict_sort(vue_obj.base_info.all_em_tag)
                vue_obj.utils.make_pie_graph("#pie_2", result3.value , result3.key)
                var result4 = dict_sort(vue_obj.base_info.all_tag_tag)
                vue_obj.utils.make_pie_graph("#pie_3", result4.value , result4.key)
        }else 
        if($(this).val()=="1"){
                vue_obj.pre_entry = vue_obj.base_info.ap_startup_list
                vue_obj.entry = vue_obj.base_info.ap_startup_list.slice(0,10)
                var result = dict_sort(vue_obj.base_info.ap_local_tag)
                vue_obj.utils.make_pie_graph("#pie_0", result.value , result.key)
                var result2 = dict_sort(vue_obj.base_info.ap_kind_tag)
                vue_obj.utils.make_pie_graph("#pie_1", result2.value , result2.key)
                var result3 = dict_sort(vue_obj.base_info.ap_em_tag)
                vue_obj.utils.make_pie_graph("#pie_2", result3.value , result3.key)
                var result4 = dict_sort(vue_obj.base_info.ap_tag_tag)
                vue_obj.utils.make_pie_graph("#pie_3", result4.value , result4.key)
        }else 
        if($(this).val()=="2"){
                vue_obj.pre_entry = vue_obj.base_info.hit_startup_list
                vue_obj.entry = vue_obj.base_info.hit_startup_list.slice(0,10)
                var result = dict_sort(vue_obj.base_info.hit_local_tag)
                vue_obj.utils.make_pie_graph("#pie_0", result.value , result.key)
                var result2 = dict_sort(vue_obj.base_info.hit_kind_tag)
                vue_obj.utils.make_pie_graph("#pie_1", result2.value , result2.key)
                var result3 = dict_sort(vue_obj.base_info.hit_em_tag)
                vue_obj.utils.make_pie_graph("#pie_2", result3.value , result3.key)
                var result4 = dict_sort(vue_obj.base_info.hit_tag_tag)
                vue_obj.utils.make_pie_graph("#pie_3", result4.value , result4.key)
        }
        else 
        if($(this).val()=="3"){
                vue_obj.pre_entry = vue_obj.base_info.aw_startup_list
                vue_obj.entry = vue_obj.base_info.aw_startup_list.slice(0,10)                
                var result = dict_sort(vue_obj.base_info.aw_local_tag)
                vue_obj.utils.make_pie_graph("#pie_0", result.value , result.key)
                var result2 = dict_sort(vue_obj.base_info.aw_kind_tag)
                vue_obj.utils.make_pie_graph("#pie_1", result2.value , result2.key)
                var result3 = dict_sort(vue_obj.base_info.aw_em_tag)
                vue_obj.utils.make_pie_graph("#pie_2", result3.value , result3.key)
                var result4 = dict_sort(vue_obj.base_info.aw_tag_tag)
                vue_obj.utils.make_pie_graph("#pie_3", result4.value , result4.key)
        }
        vue_obj.list_nav=[]
        for(var k=1; k <= Math.ceil(vue_obj.pre_entry.length/10); k++){vue_obj.list_nav.push(k)}
        $(".list_btn").removeClass("bold")
        $(".list_btn:eq(0)").addClass("bold")
})

$(document).on("click",".change_num", function(){
            $(".change_num").removeClass("num_on")
            $(this).addClass("num_on")
            if($(this).attr("data-num") == "10"){
                
                vue_obj.entry = vue_obj.pre_entry.slice(0,10)
                vue_obj.list_nav=[]
                for(var k=1; k <= Math.ceil(vue_obj.pre_entry.length/10); k++){vue_obj.list_nav.push(k)}
            }else if($(this).attr("data-num") == "50"){
                vue_obj.entry = vue_obj.pre_entry.slice(0,50)
                vue_obj.list_nav=[]
                for(var k=1; k <= Math.ceil(vue_obj.pre_entry.length/50); k++){vue_obj.list_nav.push(k)}
            }else if($(this).attr("data-num") == "100"){
                 vue_obj.entry = vue_obj.pre_entry.slice(0,100)
                 vue_obj.list_nav=[]
                for(var k=1; k <= Math.ceil(vue_obj.pre_entry.length/100); k++){vue_obj.list_nav.push(k)}
            }else{
                 vue_obj.entry = vue_obj.pre_entry
                 vue_obj.list_nav=[]
                 vue_obj.list_nav.push(1)
            }
})

$(document).on("click",".list_btn", function(){
        $(".list_btn").removeClass("bold");
        $(this).addClass("bold")

        vue_obj.entry = vue_obj.pre_entry.slice( (parseInt($(this).attr("data-num"))-1)*10, (parseInt($(this).attr("data-num")))*10)
})

$(document).off("change","#grant_sel");

$(document).on("change","#grant_sel",function(){
        
    vue_obj.$http.get(`/get_grant_static_detail/?id=`+$("#manager_sel").val()+"&sb_id="+$(this).find(":selected").attr("data-id"))
        .then((result) => {
            var temp_data_0 = vue_obj.base_info.current_grant_list
            var temp_data_1 = vue_obj.base_info.current_grant
            var temp_data_2 = vue_obj.base_info.total_grant            
             vue_obj.base_info = result.data
            vue_obj.base_info.current_grant_list = temp_data_0  
            vue_obj.base_info.current_grant= temp_data_1
            vue_obj.base_info.total_grant= temp_data_2

                vue_obj.all_startup_list = result.data.all_startup_list
                vue_obj.pre_entry = result.data.all_startup_list
                vue_obj.entry = vue_obj.all_startup_list.slice(0,10)
                vue_obj.list_nav=[]
                for(var k=1; k <= Math.ceil(vue_obj.pre_entry.length/10); k++){vue_obj.list_nav.push(k)}
                update_zoomable_line()
                var result = dict_sort(vue_obj.base_info.all_local_tag)
                vue_obj.utils.make_pie_graph("#pie_0", result.value , result.key)
                var result2 = dict_sort(vue_obj.base_info.all_kind_tag)
                vue_obj.utils.make_pie_graph("#pie_1", result2.value , result2.key)
                var result3 = dict_sort(vue_obj.base_info.all_em_tag)
                vue_obj.utils.make_pie_graph("#pie_2", result3.value , result3.key)
                var result4 = dict_sort(vue_obj.base_info.all_tag_tag)
                vue_obj.utils.make_pie_graph("#pie_3", result4.value , result4.key)
                $(".list_btn").removeClass("bold")
                $(".list_btn:eq(0)").addClass("bold")


        })
})

$(document).off("click","#top_banner>div:eq(1)");

$(document).on("click","#top_banner>div:eq(1)",function(){
        
    vue_obj.$http.get(`/get_all_static_info/?id=`+localStorage.getItem("id"))
        .then((result) => {
            console.log(result)
            $("#top_banner>div").removeClass("on");
            $("#top_banner>div:eq(1)").addClass("on");
          
            vue_obj.base_info = result.data
           
                vue_obj.all_startup_list = result.data.all_startup_list
                vue_obj.pre_entry = result.data.all_startup_list
                vue_obj.entry = vue_obj.all_startup_list.slice(0,10)
                vue_obj.list_nav=[]
                for(var k=1; k <= Math.ceil(vue_obj.pre_entry.length/10); k++){vue_obj.list_nav.push(k)}
                update_zoomable_line()
                var result = dict_sort(vue_obj.base_info.all_local_tag)
                vue_obj.utils.make_pie_graph("#pie_0", result.value , result.key)
                var result2 = dict_sort(vue_obj.base_info.all_kind_tag)
                vue_obj.utils.make_pie_graph("#pie_1", result2.value , result2.key)
                var result3 = dict_sort(vue_obj.base_info.all_em_tag)
                vue_obj.utils.make_pie_graph("#pie_2", result3.value , result3.key)
                var result4 = dict_sort(vue_obj.base_info.all_tag_tag)
                vue_obj.utils.make_pie_graph("#pie_3", result4.value , result4.key)
                $(".list_btn").removeClass("bold")
                $(".list_btn:eq(0)").addClass("bold")
                $("#select_zone>.basic option[value='all']").prop("selected", true)
        })
})

$(document).off("click","#top_banner>div:eq(0)")

$(document).on("click","#top_banner>div:eq(0)",function(){
        
    vue_obj.$http.get(`/get_static_info/?id=`+localStorage.getItem("id"))
        .then((result) => {
            console.log(result)
                   $("#top_banner>div").removeClass("on")
            $("#top_banner>div:eq(0)").addClass("on")
                vue_obj.base_info = result.data
                vue_obj.all_startup_list = result.data.all_startup_list
                vue_obj.pre_entry = result.data.all_startup_list
                vue_obj.entry = vue_obj.all_startup_list.slice(0,10)
                vue_obj.list_nav=[]
                for(var k=1; k <= Math.ceil(vue_obj.pre_entry.length/10); k++){vue_obj.list_nav.push(k)}
                update_zoomable_line()
                var result = dict_sort(vue_obj.base_info.all_local_tag)
                vue_obj.utils.make_pie_graph("#pie_0", result.value , result.key)
                var result2 = dict_sort(vue_obj.base_info.all_kind_tag)
                vue_obj.utils.make_pie_graph("#pie_1", result2.value , result2.key)
                var result3 = dict_sort(vue_obj.base_info.all_em_tag)
                vue_obj.utils.make_pie_graph("#pie_2", result3.value , result3.key)
                var result4 = dict_sort(vue_obj.base_info.all_tag_tag)
                vue_obj.utils.make_pie_graph("#pie_3", result4.value , result4.key)
                $(".list_btn").removeClass("bold")
                $(".list_btn:eq(0)").addClass("bold")
                $("#select_zone>.basic option[value='all']").prop("selected", true)
        })
})



function update_zoomable_line(){
        
    brush = d3.brushX()
        .extent([[0, 0], [width, height2]])
        .on("brush end", brushed);

    zoom = d3.zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [width, height]])
        .extent([[0, 0], [width, height]]) 
        .on("zoom", zoomed);

    var line_sub_1 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_2 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_3 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_4 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_5 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_6 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_7 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_8 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_9 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });    

 
  
   
  var data = vue_obj.base_info.total_int_data
  var data2 = vue_obj.base_info.total_app_data
  var data3 = vue_obj.base_info.total_hit_data
  var data4 = vue_obj.base_info.total_app_avg_data
  var data5 = vue_obj.base_info.total_int_avg_data
  var data6 = vue_obj.base_info.total_hit_avg_data
  var data7 = vue_obj.base_info.agency_int_avg_data
  var data8 = vue_obj.base_info.agency_hit_avg_data
  var data9 = vue_obj.base_info.agency_app_avg_data

   

  var min_date = new Date(vue_obj.base_info.min_date)
  min_date.setDate(min_date.getDate() - 1);

  // DATA 1 ~ 9 각 배열에 대하여, 데이타가 비어있는 날짜를 찾아 , 데이타값을 0 으로 하여 추가함 

  var extent = d3.extent(data, function(d) {  return parseDate(d.date); });
  var dateHash = data.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers = x_data.domain();
  d3.timeDays(min_date, Date.now())
        .filter(function(date) { return !dateHash[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers.forEach(function(header) {
                emptyRow[header] = null;
            });
            data.push(emptyRow);
        });
  data.sort(function(a, b) { return d3.ascending(a.date, b.date); });


  var extent2= d3.extent(data2, function(d) {  return parseDate(d.date); });
  var dateHash2 = data2.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers2 = x_data.domain();
  d3.timeDays(min_date, Date.now())
        .filter(function(date) { return !dateHash2[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers2.forEach(function(header2) {
                emptyRow[header2] = null;
            });
            data2.push(emptyRow);
        });
    data2.sort(function(a, b) { return d3.ascending(a.date, b.date); });

  var extent3= d3.extent(data3, function(d) {  return parseDate(d.date); });
  var dateHash3 = data3.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers3 = x_data.domain();
  d3.timeDays(min_date, Date.now())
        .filter(function(date) { return !dateHash3[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers3.forEach(function(header2) {
                emptyRow[header2] = null;
            });
            data3.push(emptyRow);
        });
    data3.sort(function(a, b) { return d3.ascending(a.date, b.date); });

  var extent4= d3.extent(data4, function(d) {  return parseDate(d.date); });
  var dateHash4 = data4.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers4 = x_data.domain();
  d3.timeDays(min_date, Date.now())
        .filter(function(date) { return !dateHash4[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers4.forEach(function(header) {
                emptyRow[header] = null;
            });
            data4.push(emptyRow);
        });
    data4.sort(function(a, b) { return d3.ascending(a.date, b.date); });

 var extent5= d3.extent(data5, function(d) {  return parseDate(d.date); });
  var dateHash5 = data5.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers5 = x_data.domain();
  d3.timeDays(min_date, Date.now())
        .filter(function(date) { return !dateHash5[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers5.forEach(function(header) {
                emptyRow[header] = null;
            });
            data5.push(emptyRow);
        });
    data5.sort(function(a, b) { return d3.ascending(a.date, b.date); }); 

  var extent6= d3.extent(data6, function(d) {  return parseDate(d.date); });
  var dateHash6 = data6.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers6 = x_data.domain();
  d3.timeDays(min_date, Date.now())
        .filter(function(date) { return !dateHash6[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers6.forEach(function(header) {
                emptyRow[header] = null;
            });
            data6.push(emptyRow);
        });
    data6.sort(function(a, b) { return d3.ascending(a.date, b.date); });

  var extent7= d3.extent(data7, function(d) {  return parseDate(d.date); });
  var dateHash7 = data7.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers7 = x_data.domain();
  d3.timeDays(min_date, Date.now())
        .filter(function(date) { return !dateHash7[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers7.forEach(function(header) {
                emptyRow[header] = null;
            });
            data7.push(emptyRow);
        });
    data7.sort(function(a, b) { return d3.ascending(a.date, b.date); });


  var extent8= d3.extent(data8, function(d) {  return parseDate(d.date); });
  var dateHash8 = data8.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers8 = x_data.domain();
  d3.timeDays(min_date, Date.now())
        .filter(function(date) { return !dateHash8[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers8.forEach(function(header) {
                emptyRow[header] = null;
            });
            data8.push(emptyRow);
        });
    data8.sort(function(a, b) { return d3.ascending(a.date, b.date); });


  var extent9= d3.extent(data9, function(d) {  return parseDate(d.date); });
  var dateHash9 = data9.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers9 = x_data.domain();
  d3.timeDays(min_date, Date.now())
        .filter(function(date) { return !dateHash9[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers9.forEach(function(header) {
                emptyRow[header] = null;
            });
            data9.push(emptyRow);
        });
    data9.sort(function(a, b) { return d3.ascending(a.date, b.date); });


// common begin
    list_data.push(data);
    list_data.push(data2);
    list_data.push(data3);
    list_data.push(data4);
    list_data.push(data5);
    list_data.push(data6);
    list_data.push(data7);
    list_data.push(data8);
    list_data.push(data9);
    var list_data_max=[];
    var data_max=  d3.max(data , function (d) { return +d.number; }); list_data_max.push(data_max);
    var data2_max= d3.max(data2, function (d) { return +d.number; }); list_data_max.push(data2_max);
    var data3_max= d3.max(data3, function (d) { return +d.number; }); list_data_max.push(data3_max);
    var data4_max= d3.max(data4, function (d) { return +d.number; }); list_data_max.push(data4_max);
    var data5_max= d3.max(data5, function (d) { return +d.number; }); list_data_max.push(data5_max);
    var data6_max= d3.max(data6, function (d) { return +d.number; }); list_data_max.push(data6_max);
    var data7_max= d3.max(data7, function (d) { return +d.number; }); list_data_max.push(data7_max);
    var data8_max= d3.max(data8, function (d) { return +d.number; }); list_data_max.push(data8_max);
    var data9_max= d3.max(data9, function (d) { return +d.number; }); list_data_max.push(data9_max);
    console.log("list_data_max"); console.log(list_data_max);

    total_max_y= d3.max(list_data_max, function(n) { return n; } );
    console.log("total_max_y"); console.log(total_max_y);
    var list_lower_data_max=[];
    // DATA 1 ~ 9 배열을 좌측 y축 (높은 값 축), 우측 y 축 (낮은 값 축) 구분으로 이분함
    for(var i=1; i<=list_data_max.length; i++) {
       if(list_data_max[i-1] <  threshold * total_max_y ) {
           list_lower_data_n.push(i);
           list_lower_data_max.push( list_data_max[i-1]);
	   data_legend_LR[i]="data-legend-right";
       } else {
           list_upper_data_n.push(i);
	   data_legend_LR[i]="data-legend-left";
       };
    };
    lower_max_y= d3.max(list_lower_data_max, function(n) { return n; } );

    console.log("upper right y"); console.log(list_upper_data_n);
    console.log("lower right y"); console.log(list_lower_data_n);
    console.log("lower_max_y"); console.log(lower_max_y);

    // x 축의 최우측은 현재 시간 
    x_data.domain([new Date(vue_obj.base_info.min_date), Date.now()  ]);  
    // x 축의 최우측은 데이타 상의 최근 날짜 (미사용)
    //x_data.domain(d3.extent(data, function(d) { return parseDate(d.date) }));  

    // 좌측 우축 y 축의 기점을 0 으로 할 수도 있고, 서로 다르게 설정할 수도 있다.
    y_left.domain([-1, total_max_y]);
    y_right.domain([-0.1, lower_max_y]);
    //y_left.domain([0, total_max_y]);
    //y_right.domain([0, lower_max_y]);

    old_x_data_domain= x_data.domain();
    new_x_data_domain= x_data.domain();

    // 하단 브러시 차트는 x 축을 공유하고, y축의 도메인은 좌측 y 축(최대치)을 기준 
    x2.domain(x_data.domain());
    y2.domain(y_left.domain());
  

    // 데이타 해석 함수 작성: 좌측 y축인지 우측 y축인지 구분하여 작성 
    for(var i=1; i<=list_data_max.length; i++) {
       if(list_data_max[i-1] <  threshold * total_max_y ) { // 우측 y 축 
if(i==1) line1 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==2) line2 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==3) line3 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==4) line4 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==5) line5 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==6) line6 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==7) line7 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==8) line8 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==9) line9 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
       } else { // 좌측 y 축 
if(i==1) line1 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==2) line2 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==3) line3 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==4) line4 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==5) line5 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==6) line6 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==7) line7 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==8) line8 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==9) line9 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
       };
    };
 
// common end 

    $(".focus:eq(1)").empty();
    $(".axis--y").remove();



    // 상단 차트 x 축 티커  
    focus.append("g")
      .attr("class", "axis axis--x") 
      .attr("transform", "translate(0," + height + ")") 
      .call(xAxis);

    // 상단 차트 좌측 y 축 티커  
    focus.append("g")
      .attr("class", "axis axis--y")
      .attr("stroke","#000000") 
      .attr("stroke-width","1px") 
      .attr("shape-rendering","crispEdges") 
      .call(yAxisLeft)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text(axis_y_left_label);

    // 상단 차트 우측 y 축 티커  
    focus.append("g")
      .attr("class", "axis axis--y")
      .attr("stroke","#ff0000") 
      .attr("stroke-width","1px") 
      .attr("shape-rendering","crispEdges") 
      .call(yAxisRight)
      .attr("transform", "translate("+width+",0)") 
	      .append("text")
      	      .attr("stroke","#ff0000") 
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text(axis_y_left_label);


    // DATA1 .. 9 를 상단 차트에 그림 
    Line_chart.append("path")
        .datum(data)
        .attr("class", "line1")
        .attr("fill","none")
        .attr(data_legend_LR[1], data_legend_names[1])
        .attr("d", line1);
    Line_chart.append("path")
        .datum(data2)
        .attr("class", "line2")
        .attr("fill","none")
        .attr(data_legend_LR[2], data_legend_names[2])
        .attr("d", line2);
    Line_chart.append("path")
        .datum(data3)
        .attr("fill","none")
        .attr("class", "line3")
        .attr(data_legend_LR[3], data_legend_names[3])
        .attr("d", line3);
    Line_chart.append("path")
        .datum(data4)
        .attr("class", "line4")
        .attr("fill","none")
        .style("stroke-dasharray", ("3, 3"))
        .attr(data_legend_LR[4], data_legend_names[4])
        .attr("d", line4);
    Line_chart.append("path")
        .datum(data5)
        .attr("class", "line5")
        .attr("fill","none")
        .style("stroke-dasharray", ("3, 3"))
        .attr(data_legend_LR[5], data_legend_names[5])
        .attr("d", line5);
    Line_chart.append("path")
        .datum(data6)
        .attr("fill","none")
        .attr("class", "line6")
        .style("stroke-dasharray", ("3, 3"))
        .attr(data_legend_LR[6], data_legend_names[6])
        .attr("d", line6);

    Line_chart.append("path")
        .datum(data7)
        .attr("class", "line7")
        .attr("fill","none")
        .style("stroke-dasharray", ("3,1,1,1,3"))
        .attr(data_legend_LR[7], data_legend_names[7])
        .attr("d", line7);
    Line_chart.append("path")
        .datum(data8)
        .attr("class", "line8")
        .attr("fill","none")
        .style("stroke-dasharray", ("3,1,1,1,3"))
        .attr(data_legend_LR[8], data_legend_names[8])
        .attr("d", line8);

    Line_chart.append("path")
        .datum(data9)
        .attr("class", "line9")
        .attr("fill","none")
        .style("stroke-dasharray", ("3,1,1,1,3"))
        .attr(data_legend_LR[9], data_legend_names[9])
        .attr("d", line9);
        
    $(".context").empty()

    // DATA1 .. 9 를 하단 브러시 차트에 그림 
    context.append("path")
        .datum(data)
        .attr("class", "sub_line1")
        .attr("stroke", data_line_color[1])
        .attr("fill", "none")        
        .attr("d", line_sub_1);
    context.append("path")
        .datum(data2)
        .attr("class", "sub_line2")
        .attr("stroke", data_line_color[2])
        .attr("fill", "none")  
        .attr("d", line_sub_2);
    context.append("path")
        .datum(data3)
        .attr("class", "sub_line3")
        .attr("stroke", data_line_color[3])
        .attr("fill", "none")  
        .attr("d", line_sub_3);
    context.append("path")
        .datum(data4)
        .attr("class", "sub_line4")
        .attr("stroke", data_line_color[4])
        .attr("fill", "none")  
        .style("stroke-dasharray", ("3, 3"))
        .attr("d", line_sub_4);
    context.append("path")
        .datum(data5)
        .attr("class", "sub_line5")
        .attr("stroke", data_line_color[5])
        .attr("fill", "none")  
        .style("stroke-dasharray", ("3, 3"))
        .attr("d", line_sub_5);
    context.append("path")
        .datum(data6)
        .style("stroke-dasharray", ("3, 3"))
        .attr("fill", "none")  
        .attr("class", "sub_line6")
        .attr("stroke", data_line_color[6])
        .attr("d", line_sub_6);
    context.append("path")
        .datum(data7)
        .style("stroke-dasharray", ("3, 1"))
        .attr("fill", "none")  
        .attr("class", "sub_line7")
        .attr("stroke", data_line_color[7])
        .attr("d", line_sub_7);
    context.append("path")
        .datum(data8)
        .style("stroke-dasharray", ("3, 1"))
        .attr("fill", "none")  
        .attr("class", "sub_line8")
        .attr("stroke", data_line_color[8])
        .attr("d", line_sub_8);
    context.append("path")
        .datum(data9)
        .style("stroke-dasharray", ("3, 1"))
        .attr("fill", "none")  
        .attr("class", "sub_line9")
        .attr("stroke", data_line_color[9])
        .attr("d", line_sub_9);
        

    // 하단 브러시 차트 x 축 티커 
    context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2)
	  //.selectAll("text")	
	  //.style("text-anchor", "end")
	  //.attr("dx", "-.8em")
	  //.attr("dy", ".15em")
	  //.attr("transform", "rotate(-65)");


    // 좌 우 레전드 표시 

    var left_legend = focus.append("rect")
        .attr("x", left_legend_pos_x)
        .attr("y", left_legend_pos_y)
        .attr("width", left_legend_width) .attr("height", legend_each_height * list_upper_data_n.length + 25) 
  	.attr("stroke","#cccccc") 
  	.attr("stroke-width","2px") 
  	//.attr("stroke-dasharray","3,3")
	.attr("filter","url(#dropshadow)");

    for(var j=0,dx=left_legend_pos_x+40; j<list_upper_data_n.length; j++) {
      focus.append("rect").attr("x",dx-30).attr("y",legend_each_height*(j+1)-5)
  	.attr("stroke",data_line_color[list_upper_data_n[j]])
  	.attr("fill",data_line_color[list_upper_data_n[j]])
	.attr("width",10).attr("height",10);
      focus.append("text").attr("x",dx).attr("y",legend_each_height*(j+1)+5)
  	.attr("stroke",data_line_color[list_upper_data_n[j]])
	.text(data_legend_names[list_upper_data_n[j]]);
    };

    var right_legend = focus.append("rect") 
        .attr("x", right_legend_pos_x)
        .attr("y", right_legend_pos_y)
        .attr("width", right_legend_width) .attr("height", legend_each_height * list_lower_data_n.length + 25) 
  	.attr("stroke","#cccccc") 
  	.attr("stroke-width","2px") 
  	//.attr("stroke-dasharray","3,3") 
	.attr("filter","url(#dropshadow)");

    for(var j=0,dx=right_legend_pos_x+40; j<list_lower_data_n.length; j++) {
      focus.append("rect").attr("x",dx-30).attr("y",legend_each_height*(j+1)-5)
  	.attr("stroke",data_line_color[list_lower_data_n[j]])
  	.attr("fill",data_line_color[list_lower_data_n[j]])
	.attr("width",10).attr("height",10);
      focus.append("text").attr("x",dx).attr("y",legend_each_height*(j+1)+5)
  	.attr("stroke",data_line_color[list_lower_data_n[j]])
	.text(data_legend_names[list_lower_data_n[j]]);
    }; 
     


    // 브러시 영역 설정
    context.append("g")
      .attr("class", "brush")
      .attr("fill","none") 
      .call(brush)
      .call(brush.move, x_data.range());

    
    // 줌 영역 설정, 이벤트 핸들러 설정 
    svg.append("rect")
      .attr("class", "zoom")
      .attr("width", width)
      .attr("height", height)
      .attr("fill","transparent")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")") 
      .on("mouseover", function() { mousefocus.style("display", "block"); tooltip.style("display", "block");})
      .on("mouseout", function() { mousefocus.style("display", "none"); tooltip.style("display", "none");}) 
      .on("mousemove", mousemove)
      .call(zoom);

}
   


 
function init_zoomable_line(){

    brush = d3.brushX()
        .extent([[0, 0], [width, height2]])
        .on("brush end", brushed);

    zoom = d3.zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [width, height]])
        .extent([[0, 0], [width, height]]) 
        .on("zoom", zoomed);

    var line_sub_1 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_2 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_3 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_4 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_5 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_6 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_7 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_8 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });
    var line_sub_9 = d3.line()
        .x(function (d) { return x2(parseDate(d.date)); })
        .y(function (d) { return y2(+d.number); });    

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0) ;

    Line_chart = svg.append("g")
        .attr("class", "focus")
        .attr("stroke","#000")
        .attr("strok-width","1px")
        .attr("fill","none")
        //.attr(':v-on:mouseover', 'true')
        //.attr(':v-on:mousemove', 'true')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("clip-path", "url(#clip)") ;
   
  var data = vue_obj.base_info.total_int_data
  var data2 = vue_obj.base_info.total_app_data
  var data3 = vue_obj.base_info.total_hit_data
  var data4 = vue_obj.base_info.total_app_avg_data
  var data5 = vue_obj.base_info.total_int_avg_data
  var data6 = vue_obj.base_info.total_hit_avg_data
  var data7 = vue_obj.base_info.agency_int_avg_data
  var data8 = vue_obj.base_info.agency_hit_avg_data
  var data9 = vue_obj.base_info.agency_app_avg_data

  //for(var k=0; k < data.length; k++){ console.log(Object.values(data[k])) }

  
  var extent = d3.extent(data, function(d) {  return parseDate(d.date); });
  var dateHash = data.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers = x_data.domain();
  d3.timeDays(new Date(vue_obj.base_info.min_date), Date.now())
        .filter(function(date) { return !dateHash[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers.forEach(function(header) {
                emptyRow[header] = null;
            });
            data.push(emptyRow);
        });
  data.sort(function(a, b) { return d3.ascending(a.date, b.date); });


  var extent2= d3.extent(data2, function(d) {  return parseDate(d.date); });
  var dateHash2 = data2.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers2 = x_data.domain();
  d3.timeDays(new Date(vue_obj.base_info.min_date), Date.now())
        .filter(function(date) { return !dateHash2[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers2.forEach(function(header2) {
                emptyRow[header2] = null;
            });
            data2.push(emptyRow);
        });
    data2.sort(function(a, b) { return d3.ascending(a.date, b.date); });


  var extent3= d3.extent(data3, function(d) {  return parseDate(d.date); });
  var dateHash3 = data3.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers3 = x_data.domain();
  d3.timeDays(new Date(vue_obj.base_info.min_date), Date.now())
        .filter(function(date) { return !dateHash3[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers3.forEach(function(header2) {
                emptyRow[header2] = null;
            });
            data3.push(emptyRow);
        });
    data3.sort(function(a, b) { return d3.ascending(a.date, b.date); });

  var extent4= d3.extent(data4, function(d) {  return parseDate(d.date); });
  var dateHash4 = data4.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers4 = x_data.domain();
  d3.timeDays(new Date(vue_obj.base_info.min_date), Date.now())
        .filter(function(date) { return !dateHash4[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers4.forEach(function(header) {
                emptyRow[header] = null;
            });
            data4.push(emptyRow);
        });
    data4.sort(function(a, b) { return d3.ascending(a.date, b.date); });

 var extent5= d3.extent(data5, function(d) {  return parseDate(d.date); });
  var dateHash5 = data5.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers5 = x_data.domain();
  d3.timeDays(new Date(vue_obj.base_info.min_date), Date.now())
        .filter(function(date) { return !dateHash5[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers5.forEach(function(header) {
                emptyRow[header] = null;
            });
            data5.push(emptyRow);
        });
    data5.sort(function(a, b) { return d3.ascending(a.date, b.date); }); 

  var extent6= d3.extent(data6, function(d) {  return parseDate(d.date); });
  var dateHash6 = data6.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers6 = x_data.domain();
  d3.timeDays(new Date(vue_obj.base_info.min_date), Date.now())
        .filter(function(date) { return !dateHash6[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers6.forEach(function(header) {
                emptyRow[header] = null;
            });
            data6.push(emptyRow);
        });
    data6.sort(function(a, b) { return d3.ascending(a.date, b.date); });

  var extent7= d3.extent(data7, function(d) {  return parseDate(d.date); });
  var dateHash7 = data7.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers7 = x_data.domain();
  d3.timeDays(new Date(vue_obj.base_info.min_date), Date.now())
        .filter(function(date) { return !dateHash7[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers7.forEach(function(header) {
                emptyRow[header] = null;
            });
            data7.push(emptyRow);
        });
    data7.sort(function(a, b) { return d3.ascending(a.date, b.date); });


  var extent8= d3.extent(data8, function(d) {  return parseDate(d.date); });
  var dateHash8 = data8.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers8 = x_data.domain();
  d3.timeDays(new Date(vue_obj.base_info.min_date), Date.now())
        .filter(function(date) { return !dateHash8[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers8.forEach(function(header) {
                emptyRow[header] = null;
            });
            data8.push(emptyRow);
        });
    data8.sort(function(a, b) { return d3.ascending(a.date, b.date); });


  var extent9= d3.extent(data9, function(d) {  return parseDate(d.date); });
  var dateHash9 = data9.reduce(function(agg, d) {
          agg[parseDate(d.date)] = true;
          return agg;
      }, {})
  var  headers9 = x_data.domain();
  d3.timeDays(new Date(vue_obj.base_info.min_date), Date.now())
        .filter(function(date) { return !dateHash9[(date)]; })
        .forEach(function(date) {
            var emptyRow = { "date": format_date(date) , "number":0 };
            headers9.forEach(function(header) {
                emptyRow[header] = null;
            });
            data9.push(emptyRow);
        });
    data9.sort(function(a, b) { return d3.ascending(a.date, b.date); });


// common begin
    list_data.push(data);
    list_data.push(data2);
    list_data.push(data3);
    list_data.push(data4);
    list_data.push(data5);
    list_data.push(data6);
    list_data.push(data7);
    list_data.push(data8);
    list_data.push(data9);
    var list_data_max=[];
    var data_max=  d3.max(data , function (d) { return +d.number; }); list_data_max.push(data_max);
    var data2_max= d3.max(data2, function (d) { return +d.number; }); list_data_max.push(data2_max);
    var data3_max= d3.max(data3, function (d) { return +d.number; }); list_data_max.push(data3_max);
    var data4_max= d3.max(data4, function (d) { return +d.number; }); list_data_max.push(data4_max);
    var data5_max= d3.max(data5, function (d) { return +d.number; }); list_data_max.push(data5_max);
    var data6_max= d3.max(data6, function (d) { return +d.number; }); list_data_max.push(data6_max);
    var data7_max= d3.max(data7, function (d) { return +d.number; }); list_data_max.push(data7_max);
    var data8_max= d3.max(data8, function (d) { return +d.number; }); list_data_max.push(data8_max);
    var data9_max= d3.max(data9, function (d) { return +d.number; }); list_data_max.push(data9_max);
    console.log("list_data_max"); console.log(list_data_max);

    total_max_y= d3.max(list_data_max, function(n) { return n; } );
    console.log("total_max_y"); console.log(total_max_y);
    var list_lower_data_max=[];
    // DATA 1 ~ 9 배열을 좌측 y축 (높은 값 축), 우측 y 축 (낮은 값 축) 구분으로 이분함
    for(var i=1; i<=list_data_max.length; i++) {
       if(list_data_max[i-1] <  threshold * total_max_y ) {
           list_lower_data_n.push(i);
           list_lower_data_max.push( list_data_max[i-1]);
	   data_legend_LR[i]="data-legend-right";
       } else {
           list_upper_data_n.push(i);
	   data_legend_LR[i]="data-legend-left";
       };
    };
    lower_max_y= d3.max(list_lower_data_max, function(n) { return n; } );

    console.log("upper right y"); console.log(list_upper_data_n);
    console.log("lower right y"); console.log(list_lower_data_n);
    console.log("lower_max_y"); console.log(lower_max_y);

    // x 축의 최우측은 현재 시간 
    x_data.domain([new Date(vue_obj.base_info.min_date), Date.now()  ]);  
    // x 축의 최우측은 데이타 상의 최근 날짜 (미사용)
    //x_data.domain(d3.extent(data, function(d) { return parseDate(d.date) }));  

    // 좌측 우축 y 축의 기점을 0 으로 할 수도 있고, 서로 다르게 설정할 수도 있다.
    y_left.domain([-1, total_max_y]);
    y_right.domain([-0.1, lower_max_y]);
    //y_left.domain([0, total_max_y]);
    //y_right.domain([0, lower_max_y]);

    old_x_data_domain= x_data.domain();
    new_x_data_domain= x_data.domain();

    // 하단 브러시 차트는 x 축을 공유하고, y축의 도메인은 좌측 y 축(최대치)을 기준 
    x2.domain(x_data.domain());
    y2.domain(y_left.domain());
  

    // 데이타 해석 함수 작성: 좌측 y축인지 우측 y축인지 구분하여 작성 
    for(var i=1; i<=list_data_max.length; i++) {
       if(list_data_max[i-1] <  threshold * total_max_y ) { // 우측 y 축 
if(i==1) line1 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==2) line2 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==3) line3 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==4) line4 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==5) line5 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==6) line6 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==7) line7 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==8) line8 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==9) line9 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
       } else { // 좌측 y 축 
if(i==1) line1 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==2) line2 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==3) line3 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==4) line4 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==5) line5 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==6) line6 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==7) line7 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==8) line8 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
if(i==9) line9 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_left(d.number); });
       };
    };
 
// common end 

    // 상단 차트 x 축 티커  
    focus.append("g")
      .attr("class", "axis axis--x") 
      .attr("transform", "translate(0," + height + ")") 
      .call(xAxis);
    // 상단 차트 좌측 y 축 티커  
    focus.append("g")
      .attr("class", "axis axis--y")
      .attr("stroke","#000000") 
      .attr("stroke-width","1px") 
      .attr("shape-rendering","crispEdges") 
      .call(yAxisLeft) 
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text(axis_y_left_label);
    // 상단 차트 우측 y 축 티커  
    focus.append("g")
      .attr("class", "axis axis--y")
      .attr("stroke","#ff0000") 
      .attr("stroke-width","1px") 
      .attr("shape-rendering","crispEdges") 
      .call(yAxisRight)
      .attr("transform", "translate("+(width-5)+",0)") 
	      .append("text")
      	      .attr("stroke","#ff0000") 
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text(axis_y_right_label);

    // DATA1 .. 9 를 상단 차트에 그림 
    Line_chart.append("path")
        .datum(data)
        .attr("class", "line1")
        .attr("stroke", data_line_color[1])
        .attr(data_legend_LR[1], data_legend_names[1])
        .attr("d", line1);
    Line_chart.append("path")
        .datum(data2)
        .attr("class", "line2")
        .attr("stroke", data_line_color[2])
        .attr(data_legend_LR[2], data_legend_names[2])
        .attr("d", line2);
    Line_chart.append("path")
        .datum(data3)
        .attr("class", "line3")
        .attr("stroke", data_line_color[3])
        .attr(data_legend_LR[3], data_legend_names[3])
        .attr("d", line3) ;
    Line_chart.append("path")
        .datum(data4)
        .attr("class", "line4")
        .attr("stroke", data_line_color[4])
        .style("stroke-dasharray", ("3, 3"))
        .attr(data_legend_LR[4], data_legend_names[4])
        .attr("d", line4);
    Line_chart.append("path")
        .datum(data5)
        .attr("class", "line5")
        .attr("stroke", data_line_color[5])
        .style("stroke-dasharray", ("3, 3"))
        .attr(data_legend_LR[5], data_legend_names[5])
        .attr("d", line5);
    Line_chart.append("path")
        .datum(data6)
        .attr("class", "line6")
        .attr("stroke", data_line_color[6])
        .style("stroke-dasharray", ("3, 3"))
        .attr(data_legend_LR[6], data_legend_names[6])
        .attr("d", line6);
    Line_chart.append("path")
        .datum(data7)
        .attr("class", "line7")
        .attr("stroke", data_line_color[7])
        .style("stroke-dasharray", ("3,1,1,1,3"))
        .attr(data_legend_LR[7], data_legend_names[7])
        .attr("d", line7);
    Line_chart.append("path")
        .datum(data8)
        .attr("class", "line8")
        .attr("stroke", data_line_color[8])
        .style("stroke-dasharray", ("3,1,1,1,3"))
        .attr(data_legend_LR[8], data_legend_names[8])
        .attr("d", line8);
    Line_chart.append("path")
        .datum(data9)
        .attr("class", "line9")
        .attr("stroke", data_line_color[9])
        .style("stroke-dasharray", ("3,1,1,1,3"))
        .attr(data_legend_LR[9], data_legend_names[9])
        .attr("d", line9);


    // DATA1 .. 9 를 하단 브러시 차트에 그림 
    context.append("path")
        .datum(data)
        .attr("class", "sub_line1")
        .attr("stroke", data_line_color[1])
        .attr("d", line_sub_1);
    context.append("path")
        .datum(data2)
        .attr("class", "sub_line2")
        .attr("stroke", data_line_color[2])
        .attr("d", line_sub_2);
    context.append("path")
        .datum(data3)
        .attr("class", "sub_line3")
        .attr("stroke", data_line_color[3])
        .attr("d", line_sub_3);
    context.append("path")
        .datum(data4)
        .attr("class", "sub_line4")
        .attr("stroke", data_line_color[4])
        .style("stroke-dasharray", ("3, 3"))
        .attr("d", line_sub_4);
    context.append("path")
        .datum(data5)
        .attr("class", "sub_line5")
        .attr("stroke", data_line_color[5])
        .style("stroke-dasharray", ("3, 3"))
        .attr("d", line_sub_5);
    context.append("path")
        .datum(data6)
        .style("stroke-dasharray", ("3, 3"))
        .attr("class", "sub_line6")
        .attr("stroke", data_line_color[6])
        .attr("d", line_sub_6);
    context.append("path")
        .datum(data7)
        .style("stroke-dasharray", ("3, 1"))
        .attr("class", "sub_line7")
        .attr("stroke", data_line_color[7])
        .attr("d", line_sub_7);
    context.append("path")
        .datum(data8)
        .style("stroke-dasharray", ("3, 1"))
        .attr("class", "sub_line8")
        .attr("stroke", data_line_color[8])
        .attr("d", line_sub_8);
    context.append("path")
        .datum(data9)
        .style("stroke-dasharray", ("3, 1"))
        .attr("class", "sub_line9")
        .attr("stroke", data_line_color[9])
        .attr("d", line_sub_9);
        

    // 하단 브러시 차트 x 축 티커 
    context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2) 
	  //.selectAll("text")	
	  //.style("text-anchor", "end")
	  //.attr("dx", "-.8em")
	  //.attr("dy", ".15em")
	  //.attr("transform", "rotate(-65)");

    
    // 레전드 표시 

    var left_legend = focus.append("rect")
        .attr("x", left_legend_pos_x)
        .attr("y", left_legend_pos_y)
        .attr("width", left_legend_width) .attr("height", legend_each_height * list_upper_data_n.length + 25) 
  	.attr("stroke","#cccccc") 
  	.attr("stroke-width","2px") 
  	//.attr("stroke-dasharray","3,3")
	.attr("filter","url(#dropshadow)");

    for(var j=0,dx=left_legend_pos_x+40; j<list_upper_data_n.length; j++) {
      focus.append("rect").attr("x",dx-30).attr("y",legend_each_height*(j+1)-5)
  	.attr("stroke",data_line_color[list_upper_data_n[j]])
  	.attr("fill",data_line_color[list_upper_data_n[j]])
	.attr("width",10).attr("height",10);
      focus.append("text").attr("x",dx).attr("y",legend_each_height*(j+1)+5)
  	.attr("stroke",data_line_color[list_upper_data_n[j]])
	.text(data_legend_names[list_upper_data_n[j]]);
    };

    var right_legend = focus.append("rect") 
        .attr("x", right_legend_pos_x)
        .attr("y", right_legend_pos_y)
        .attr("width", right_legend_width) .attr("height", legend_each_height * list_lower_data_n.length + 25) 
  	.attr("stroke","#cccccc") 
  	.attr("stroke-width","2px") 
  	//.attr("stroke-dasharray","3,3") 
	.attr("filter","url(#dropshadow)");

    for(var j=0,dx=right_legend_pos_x+40; j<list_lower_data_n.length; j++) {
      focus.append("rect").attr("x",dx-30).attr("y",legend_each_height*(j+1)-5)
  	.attr("stroke",data_line_color[list_lower_data_n[j]])
  	.attr("fill",data_line_color[list_lower_data_n[j]])
	.attr("width",10).attr("height",10);
      focus.append("text").attr("x",dx).attr("y",legend_each_height*(j+1)+5)
  	.attr("stroke",data_line_color[list_lower_data_n[j]])
	.text(data_legend_names[list_lower_data_n[j]]);
    }; 
     


    // 브러시 영역 설정
    context.append("g")
      .attr("class", "brush") 
      .call(brush)
      .call(brush.move, x_data.range());

    // 줌 영역 설정, 이벤트 핸들러 설정 
    svg.append("rect")
      .attr("class", "zoom")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")") 
      .on("mouseover", function() { mousefocus.style("display", "block"); tooltip.style("display", "block");})
      .on("mouseout", function() { mousefocus.style("display", "none"); tooltip.style("display", "none");}) 
      .on("mousemove", mousemove) 
      .call(zoom);



}
    
function mousemove() {
      var x0 = x_data.invert(d3.mouse(this)[0]).toISOString(),
          yl = y_left.invert(d3.mouse(this)[1]),
          yr = y_right.invert(d3.mouse(this)[1]);
	//console.log("x0 "+x0);
	//console.log("yr "+yr);
	//console.log("yl "+yl);
      var i;
      var data= list_data[1];
      for(i=0; i< data.length; i++) {
         if(data[i].date > x0) break;
      };
      var d0 = data[i - 1];
      var d1 = data[i];
      var d= d1;
      if(d1!==undefined && d0!==undefined) {
        if(x0 - d0.date < d1.date - x0 ) { // round() operation
         d= d0;   i= i - 1;
        };
      };
	//console.log("i "+i);
      var which_data_l;
      var which_data_r;
      var which_data_l_n;
      var which_data_r_n;
      var which_yr_data_n= -1;
      var max_diff_right=1000;
      var xscale= width / data.length;
      //console.log("ul "+list_upper_data_n.length);
      //console.log("ll "+list_lower_data_n.length);
      for(var k= i - 5; k<i+5; k++) {  if(k<0) continue; if(k>=data.length) continue;
      for(var j=0; j<list_lower_data_n.length; j++) {
         var diff= Math.sqrt( (y_right(list_data[ list_lower_data_n[j] ][k].number) - y_right(yr))**2 + (xscale*(i - k))**2 );
         //console.log(list_lower_data_n[j]);
         //console.log(list_data[ list_lower_data_n[j] ]);
         //console.log(list_data[ list_lower_data_n[j] ][k].number); console.log(diff);
         if( diff < max_diff_right) {
	     which_data_r= list_data[ list_lower_data_n[j] ][k]; 
	     which_data_r_n= list_lower_data_n[j];
	     which_yr_data_n= list_lower_data_n[j]; 
	     max_diff_right= diff;
         };
      };
      };
      var which_yl_data_n= -1;
      var max_diff_left=1000;
      for(var k= i - 5; k<i+5; k++) {  if(k<0) continue; if(k>=data.length) continue;
      for(var j=0; j<list_upper_data_n.length; j++) {
         var diff= Math.sqrt( (y_left(list_data[ list_upper_data_n[j] ][k].number) - y_left(yl))**2 + (xscale*(i - k))**2 );
         //console.log(list_upper_data_n[j]);
         //console.log(list_data[ list_upper_data_n[j] ]);
         //console.log(list_data[ list_upper_data_n[j] ][k].number); console.log(diff);
         if( diff < max_diff_left) {
	     which_data_l= list_data[ list_upper_data_n[j] ][k]; 
	     which_data_l_n= list_upper_data_n[j];
	     which_yl_data_n= list_upper_data_n[j];
	     max_diff_left= diff;
         };
      };
      };
//console.log(which_yl_data_n);
//console.log(which_yr_data_n);
//console.log(max_diff_left);
//console.log(max_diff_right);
      //var old_x0x1= old_x_data_domain[1] - old_x_data_domain[0]; 
      //var new_x0x1= new_x_data_domain[1] - new_x_data_domain[0]; 
      //console.log("old x"); console.log(old_x0x1);
      //console.log("new x"); console.log(new_x0x1);
      //console.log("old x0"); console.log(old_x_data_domain[0]);
      //console.log("new x0"); console.log(new_x_data_domain[0]);
      if(max_diff_left < max_diff_right)
      if(which_yl_data_n > -1) { 
        var my_y= y_left(which_data_l.number);
        var my_x= x_data(new Date(which_data_l.date));
        //console.log("1my_x "+my_x); console.log("my_y "+my_y); console.log("y "+which_data_l.number); console.log("h "+height);
        mousefocus.attr("transform", "translate(" + (margin.left+my_x) + "," + (margin.top+my_y) + ")");
	//vertical line
        mousefocus.select(".x-hover-line")
	.attr("stroke", data_line_color[which_data_l_n]) 
	.attr("y2", 0) 
        .attr("y1", height - my_y) 
        .attr("x1", 0) 
        .attr("x2", 0);

	//horizontal line
        mousefocus.select(".y-hover-line")
	.attr("stroke", data_line_color[which_data_l_n]) 
        .attr("y1", 0)
        .attr("y2", 0) 
        .attr("x1", 0) 
        .attr("x2", -my_x);

        mousefocus.select("circle")
	.attr("stroke", data_line_color[which_data_l_n]);

        mousefocus.select(".tt_text1").attr("stroke",data_line_color[which_data_l_n]).text( data_legend_names[which_data_l_n] );
        mousefocus.select(".tt_text2").text( which_data_l.number + "");
        mousefocus.select(".tt_text3").text( which_data_l.date );
        if(my_x>width-50) { mousefocus.select(".tt_text_group").attr('dx',-100); } ;
        if(my_x<width-50) { mousefocus.select(".tt_text_group").attr('dx',0); } ;
        //tooltip.html(txt) .style('display', 'block') .style('left', d3.event.pageX + 20) .style('top', d3.event.pageY - 20);
      };

      if(max_diff_left >= max_diff_right )
      if(which_yr_data_n > -1) { 
        var my_y= y_right(which_data_r.number);
        var my_x= x_data(new Date(which_data_r.date));
        //console.log("2my_x "+my_x); console.log("my_y "+my_y); console.log("y "+which_data_r.number); console.log("h "+height);
        mousefocus.attr("transform", "translate(" + (margin.left+my_x) + "," + (margin.top+my_y) + ")");

	//vertical line
        mousefocus.select(".x-hover-line")
	.attr("stroke", data_line_color[which_data_r_n]) 
	.attr("y2", 0) 
        .attr("y1", height - my_y) 
        .attr("x1", 0) 
        .attr("x2", 0);

	//horizontal line
        mousefocus.select(".y-hover-line")
	.attr("stroke", data_line_color[which_data_r_n]) 
        .attr("y1", 0)
        .attr("y2", 0) 
        .attr("x1", 0) 
        .attr("x2", -my_x);

        mousefocus.select("circle")
	.attr("stroke", data_line_color[which_data_r_n]);

        mousefocus.select(".tt_text1").attr("stroke",data_line_color[which_data_r_n]).text( data_legend_names[which_data_r_n] );
        mousefocus.select(".tt_text2").text( which_data_r.number + "");
        mousefocus.select(".tt_text3").text( which_data_r.date );
        if(my_x>width-50) { mousefocus.select(".tt_text_group").attr('dx',-100); } ;
        if(my_x<width-50) { mousefocus.select(".tt_text_group").attr('dx',0); } ;
        //tooltip.html(txt) .style('display', 'block') .style('left', d3.event.pageX + 20) .style('top', d3.event.pageY - 20);
      };
}

function brushed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
  var s = d3.event.selection || x2.range();
  new_x_data_domain=s.map(x2.invert, x2);
  x_data.domain(s.map(x2.invert, x2));

  //console.log("new x brushed");
  Line_chart.select(".line1").attr("d", line1);
  Line_chart.select(".line2").attr("d", line2);
  Line_chart.select(".line3").attr("d", line3);
  Line_chart.select(".line4").attr("d", line4);
  Line_chart.select(".line5").attr("d", line5);
  Line_chart.select(".line6").attr("d", line6);
  Line_chart.select(".line7").attr("d", line7);
  Line_chart.select(".line8").attr("d", line8);
  Line_chart.select(".line9").attr("d", line9);

  
  focus.select(".axis--x").call(xAxis);
  svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
      .scale(width / (s[1] - s[0]))
      .translate(-s[0], 0));
}

var min_zoom ="";
var flag = true

function zoomed() {
    
 var t = d3.event.transform;
  new_x_data_domain= t.rescaleX(x2).domain();
  //console.log("new x2 domain zoom");
  //console.log(new_x_data_domain);
  if( dateDiff(new_x_data_domain[0] ,new_x_data_domain[1]) > 8 ){
       if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
       x_data.domain( new_x_data_domain );

	  Line_chart.select(".line1").attr("d", line1);
	  Line_chart.select(".line2").attr("d", line2);
	  Line_chart.select(".line3").attr("d", line3);
	  Line_chart.select(".line4").attr("d", line4);
	  Line_chart.select(".line5").attr("d", line5);
	  Line_chart.select(".line6").attr("d", line6);
	  Line_chart.select(".line7").attr("d", line7);
	  Line_chart.select(".line8").attr("d", line8);
	  Line_chart.select(".line9").attr("d", line9);

	  focus.select(".axis--x").call(xAxis);
	  context.select(".brush").call(brush.move, x_data.range().map(t.invertX, t));
  }
  else{
      if(flag==true){
          flag= false;
          min_zoom = t.k
        }
          zoom.scaleExtent([1,min_zoom])
  }
}

function type(d) {
  d.date = parseDate(d.date);
  d.number = +d.number;
  return d;
}

function dateDiff(_date1, _date2) {
    var diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
    var diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);
    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
    var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));
    return diff;
}



 
})
    }
}
</script>
<style >
.column>ul{
    display: block;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    margin-top: 0px;
    margin-left: 0px;
}

.column>ul>li{
   list-style: none;
    height: auto;
    line-height: 16px;
    width: 100%;
    margin-bottom: 18px;
    float: left;
    font-size: 12px;
    }
    .column>ul>li:last-child{
          margin-bottom: 0px;
    }
.column>ul>li>span:nth-child(1){
    display: block;    
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 7px;
        
    }
    .column>ul>li:nth-child(1)>span:nth-child(1){   
        background-color: rgb(148, 103, 189); 
    }
    .column>ul>li:nth-child(2)>span:nth-child(1){   
        background-color: rgb(214, 39, 40);
    } 
    .column>ul>li:nth-child(3)>span:nth-child(1){   
        background-color: rgb(44, 160, 44);
    }
    .column>ul>li:nth-child(4)>span:nth-child(1){   
        background-color: rgb(255, 127, 14);
    } 
     .column>ul>li:nth-child(5)>span:nth-child(1){   
        background-color: rgb(31, 119, 180);
    } 
    .column>ul>li:nth-child(6)>span:nth-child(1){   
        background-color: rgb(255, 127, 14);
    } 
;

    .column>ul>li>span{
        float: left;
        display: block;
        height: 16px;
        line-height: 16px;
        font-size: 12px;

    }
    .column>ul>li>span:nth-child(1){
        display: block;
        float: left;
    }
     .column>ul>li>span:nth-child(2){
        display: block;
        float: left;
    }
    .column{
        float: left;
     
        width:84px;
        height:100%;
    }

.pie>span{
    display: block;
    position: absolute;
    left:39px;
    width: 100px;
    height: 28px;
    font-size: 16px;
    color: #243d68;
    line-height: 28px;
}
  .line1,.line2,.line3,.line4 ,.line5,.line6,.line7,.line8,.line9{
        fill: none;
       
        stroke-width: 1.5px;
    }
    .line1{
        stroke: steelblue;
    }
    .line2{
        stroke: red;
    }
    .line3{
        stroke: black;
    }
    .line4{
        stroke: green;
    }
    .line5{
        stroke: yellow;
    }
    .line6{
        stroke: brown;
    }
    .line7{
        stroke: rosybrown;
    }
    .line8{
        stroke: orangered;
    }
    .line9{
        stroke: purple;
    }
.zoom {
  cursor: move;
  fill: transparent;
  pointer-events: all;
}

.file{
    cursor: pointer;
}
.hidden{
    display: none;
}
td>i{
    margin-top: 1px;
    vertical-align: top;
    cursor: pointer;
}

#list_tbl{
    width: 1112px;
    border-collapse: collapse;
    margin-top: 16px;
    margin-left: 16px;
}
#list_tbl>thead>tr{ 
    height: 40px;
  
}
#list_tbl>thead>tr>td{
    border-top:1px solid #4f5478;
    border-bottom:1px solid #4f5478;
    
    font-size: 14px; 
    color: #1a2f53;
    vertical-align: center;
    padding-left: 14px;
}
#list_tbl>tbody>tr>td{
     font-size: 12px; 
  color: #1a2f53;
  height:56px;
  border-bottom: solid 1px #ced4da;
  padding-left: 16px;
}


#sub_btn{
    width:1112px;
    overflow: auto;
    margin-top: 22px;
    margin-left: 16px;
}
#excel_down{
    display: block;
    font-size: 12px;
    color: #1b66f4;
    float: left;
    cursor: pointer;
    position: absolute;
    top:46px;
    right:16px;
}
#sub_btn>div{
    float: right;
    font-size: 12px;
    color: #243d68;
}
#sub_btn>div>span.num_on{
    font-weight: bold
}
#sub_btn>div>span{
    margin-right: 21px;
    cursor: pointer;
}
#sub_btn>div>span:nth-child(4){
    margin-right: 0px;
}
#tbl_pagination{
    width:1112px;
    margin-left:16px;
    text-align: center
}
#list_view{
    position: relative;
    width: 1144px;
    overflow: auto;
    margin-top: 40px;
 border: solid 1px #ced4da;
 padding-top: 40px;

}
#pie_con{
    overflow: auto;
}
#list{
    font-size: 20px;
  line-height: 1.2;
  letter-spacing: normal;
  color: #1a2f53;
      height:39px;
    width:1112px;
    margin-left:16px;
    line-height: 32px;
  
}
#pie_con{
    margin-top: 21px;
}
 .pie_seg{
    width: 400px;
    height: 320px;
    margin-top:10px;
    border-right:1px solid rgba(206, 212, 218, 0.7);
    float: left;
    position: relative;
    overflow: hidden;
} 
.pie{
    float: left;
    width:300px;;
    height: 197px;
   
}
.pie_seg:nth-child(4){
    margin-right: 0px;
}
#person_num{
  opacity: 0.8;
  font-family: Rubik;
  font-size: 34px;
  font-weight: 300;
  color: #243d68;
  margin-top: 24px;
  margin-left: 8px;
}
#person_num>span{
     font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.75;
  letter-spacing: normal;
  color: #243d68;
}

    .basic{
        width: 474px;
        height: 51px;
        font-size: 20px;
        font-weight: 900;
        color: #1a2f53;
        line-height: 51px;
        padding-left: 18px;
    
    }
    #select_zone{
        margin-top: 40px;
        width: 1144px;;
        height: 51px;;
    }
    #static_content{
        margin-left: 64px;        
        padding-top:40px;
        padding-left: 52px;
    }
    #top_banner{
        width:1224px;;
        overflow: auto;;
        border-bottom:1px solid #a0a3bc;
        margin-top:56px;
    }
    #top_banner>div{
        margin-top:15px;
        float: left;
        position: relative;
        cursor: pointer;
        color: #4f5478;
        font-size: 14px;
        border-bottom:2px solid transparent;
        margin-right:30px;
        padding-bottom:7px;

    }
    #top_banner>.on{
        border-bottom:2px solid #1b49f4;
        color:#1b49f4;
    }

    
    #static_pdf_down{
     width: 120px;
  height: 32px;
  border-radius: 16px;
  border: solid 1px #1b66f4;
        background-color: #ffffff;
        border: solid 1px #1b66f4;
        color: #1b66f4;
        font-size: 12px;
        line-height: 34px;
        text-align: center;
        margin-top:8px;
        float: right;
        cursor: pointer;
    }
    .list_btn{
        cursor: pointer;
        font-size: 15px; 
        color: #7697ab;
        margin: 8px;
    }
    .bold{
         color: #243d68;
        font-weight: bold;
        cursor: default;
    }

    
    #input_box{
        display: inline-block;
        width: 144px;
        height: 32px;
        background-color: #ffffff;
        border: solid 1px #ced4da;
        line-height:32px;
        margin-right:29px;
        float: left!important;
    }
    #input_box>i{
        color:#ced4da   
    }
    #input_box>input{
        width: 115px;
        border:none;
        outline: none;
    }
    #select_zone_2{
        margin-top: 140px;
    }



</style>

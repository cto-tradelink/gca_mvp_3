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
// d3.legend_left.js 
// (C) 2012 ziggy.jonsson.nyc@gmail.com
// MIT licence

(function() {
d3.legend_left = function(g) {
  g.each(function() {
    var g= d3.select(this),
        items = {},
        svg = d3.select(g.property("nearestViewportElement")),
        legendPadding = g.attr("data-style-padding") || 5,
        lb = g.selectAll(".legend-box").data([true]),
        li = g.selectAll(".legend-items").data([true])

    lb.enter().append("rect").classed("legend-box",true)
    li.enter().append("g").classed("legend-items",true)

    svg.selectAll("[data-legend-left]").each(function() {
        var self = d3.select(this)
        items[self.attr("data-legend-left")] = {
          pos : self.attr("data-legend-pos") || this.getBBox().y,
          color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke") 
        }
      })

    items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})

    
    li.selectAll("text")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("text")})
        .call(function(d) { d.exit().remove()})
        .attr("y",function(d,i) { return i+"em"})
        .attr("x","1em")
        .text(function(d) { ;return d.key})
    
    li.selectAll("circle")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("circle")})
        .call(function(d) { d.exit().remove()})
        .attr("cy",function(d,i) { return i-0.25+"em"})
        .attr("cx",0)
        .attr("r","0.4em")
        .style("fill",function(d) { console.log(d.value.color);return d.value.color})  
    
    // Reposition and resize the box
    var lbbox = li[0][0].getBBox()  
    lb.attr("x",(lbbox.x-legendPadding))
        .attr("y",(lbbox.y-legendPadding))
        .attr("height",(lbbox.height+2*legendPadding))
        .attr("width",(lbbox.width+2*legendPadding))
  })
  return g
}
})()

</script>

<script>
// d3.legend_right.js 
// (C) 2012 ziggy.jonsson.nyc@gmail.com
// MIT licence

(function() {
d3.legend_right = function(g) {
  g.each(function() {
    var g= d3.select(this),
        items = {},
        svg = d3.select(g.property("nearestViewportElement")),
        legendPadding = g.attr("data-style-padding") || 5,
        lb = g.selectAll(".legend-box").data([true]),
        li = g.selectAll(".legend-items").data([true])

    lb.enter().append("rect").classed("legend-box",true)
    li.enter().append("g").classed("legend-items",true)

    svg.selectAll("[data-legend-right]").each(function() {
        var self = d3.select(this)
        items[self.attr("data-legend-right")] = {
          pos : self.attr("data-legend-pos") || this.getBBox().y,
          color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke") 
        }
      })

    items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})

    
    li.selectAll("text")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("text")})
        .call(function(d) { d.exit().remove()})
        .attr("y",function(d,i) { return i+"em"})
        .attr("x","1em")
        .text(function(d) { ;return d.key})
    
    li.selectAll("circle")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("circle")})
        .call(function(d) { d.exit().remove()})
        .attr("cy",function(d,i) { return i-0.25+"em"})
        .attr("cx",0)
        .attr("r","0.4em")
        .style("fill",function(d) { console.log(d.value.color);return d.value.color})  
    
    // Reposition and resize the box
    var lbbox = li[0][0].getBBox()  
    lb.attr("x",(lbbox.x-legendPadding))
        .attr("y",(lbbox.y-legendPadding))
        .attr("height",(lbbox.height+2*legendPadding))
        .attr("width",(lbbox.width+2*legendPadding))
  })
  return g
}
})()

</script>

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
    
    var svg = d3.select("#sgv_11_all"),
    margin = {top: 20, right: 20, bottom: 110, left: 40},
    margin2 = {top: 530, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    height2 = +svg.attr("height") - margin2.top - margin2.bottom;
    var parseDate = d3.timeParse("%Y-%m-%d");
    var x_data = d3.scaleTime().range([0, width]),
    x2 = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]), // not used here
    y2 = d3.scaleLinear().range([height2, 0]),
    y3 = d3.scaleLinear().range([height, 0]),
    y4 = d3.scaleLinear().range([height, 0]);

    var y_left  = d3.scaleLinear().range([height, 0]); //lsb1 : left y axis (higher values)
    var y_right = d3.scaleLinear().range([height, 0]); //lsb1 : left y axis (lower values)
   
    var tooltip = d3.select('#tooltip'); 

    var Line_chart;
    var line1;
    var line2;
    var line3;
    var line4;
    var line5;
    var line6;
    var line7;
    var line8;
    var line9;

    var xAxis = d3.axisBottom(x_data),
        xAxis2 = d3.axisBottom(x2),
        yAxisLeft = d3.axisLeft(y_left),
        yAxisRight = d3.axisRight(y_right);

    var list_lower_data_n=[];
    var list_upper_data_n=[];
    var list_data=[];
    var data_legend_LR=[];

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

    function mousemove() {
      var x0 = x_data.invert(d3.mouse(this)[0]),
          yl = y_left.invert(d3.mouse(this)[1]),
          yr = y_right.invert(d3.mouse(this)[1]);
      var i = bisectDate(data, x0, 1);
      var d0 = data[i - 1];
      var d1 = data[i];
      var d;
      if( x0 - d0.date > d1.date - x0 ) {
         d= d1; 
      } else {
         d= d0;   i= i - 1;
      };

      var which_data;
      var which_data_n;
      var which_yr_data_n= -1;
      for(var j=0; j<list_lower_data_n.length; j++) {
         if( Math.abs( list_data[ list_lower_data_n[j] ][i].value - yr ) < 1) {
	     which_data= list_data[ list_lower_data_n[j] ][i]; 
	     which_data_n= list_lower_data_n[j];
	     which_yr_data_n= list_lower_data_n[j]; break;
         };
      };
      var which_yl_data_n= -1;
      for(var j=0; j<list_upper_data_n.length; j++) {
         if( Math.abs( list_data[ list_upper_data_n[j] ][i].value - yr ) < 1) {
	     which_data= list_data[ list_upper_data_n[j] ][i]; 
	     which_data_n= list_upper_data_n[j];
	     which_yl_data_n= list_upper_data_n[j]; break;
         };
      };
      if(which_yl_data_n > -1) { 
        var my_y= y_left(which_data.value);
        var my_x= x_data(which_data.date);
        mousefocus.attr("transform", "translate(" + my_x + "," + my_y + ")");
	//vertical line
        mousefocus.select(".x-hover-line").attr("y1", height);
        mousefocus.select(".x-hover-line").attr("y2", height - my_y);
        mousefocus.select(".x-hover-line").attr("x1", my_x);
        mousefocus.select(".x-hover-line").attr("x2", my_x);

	//horizontal line
        mousefocus.select(".y-hover-line").attr("y1", my_y);
        mousefocus.select(".y-hover-line").attr("y2", my_y);
        mousefocus.select(".y-hover-line").attr("x1", 0);
        mousefocus.select(".y-hover-line").attr("x2", my_x);

        var txt= data_names[which_data_n]+" "+which_data.value + " at "+my_x; 
        mousefocus.select("text").text(txt);
        tooltip.html(txt) .style('display', 'block') .style('left', d3.event.pageX + 20) .style('top', d3.event.pageY - 20);
      };
      if(which_yr_data_n > -1) { 
        var my_y= y_right(which_data.value);
        var my_x= x_data(which_data.date);
        mousefocus.attr("transform", "translate(" + my_x + "," + my_y + ")");
	//vertical line
        mousefocus.select(".x-hover-line").attr("y1", height);
        mousefocus.select(".x-hover-line").attr("y2", height - my_y);
        mousefocus.select(".x-hover-line").attr("x1", my_x);
        mousefocus.select(".x-hover-line").attr("x2", my_x);

	//horizontal line
        mousefocus.select(".y-hover-line").attr("y1", my_y);
        mousefocus.select(".y-hover-line").attr("y2", my_y);
        mousefocus.select(".y-hover-line").attr("x1", 0);
        mousefocus.select(".y-hover-line").attr("x2", my_x);

        var txt= data_names[which_data_n]+" "+which_data.value + " at "+my_x; 
        mousefocus.select("text").text(txt);
        tooltip.html(txt) .style('display', 'block') .style('left', d3.event.pageX + 20) .style('top', d3.event.pageY - 20);
      };
    }

    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("stroke-width","1px")
        .attr("stroke","#000000")
        .attr("fill","none")
        .attr("pointer-events":"all")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .on("mouseover", function() { mousefocus.style("display", null); tooltip.style("display", null);})
        .on("mouseout", function() { mousefocus.style("display", "none"); tooltip.style("display", "none");})
        .on("mousemove", mousemove);

    var brush
    var zoom
    var context = svg.append("g")
        .attr("class", "context")
        .attr("stroke","#000")
        .attr("strok-width","1px")
        .attr("fill","none")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");



    var mousefocus = g.append("g")
        .attr("class", "mousefocus")
        .style("display", "none");

    mousefocus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", 0) 
  	.attr("stroke","#6F257F") 
  	.attr("stroke-width","2px") 
  	.attr("stroke-dasharray","3,3");

    mousefocus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", 0)
        .attr("x2", 0) 
        .attr("y1", 0)
        .attr("y2", 0)
  	.attr("stroke","#6F257F") 
  	.attr("stroke-width","2px") 
  	.attr("stroke-dasharray","3,3");

    mousefocus.append("circle")
        .attr("r", 7.5) 
  	.attr("fill","#F1F3F3") 
  	.attr("stroke","#F1F3F3") 
  	.attr("stroke-width","5px");

    mousefocus.append("text")
        .attr("x", 15)
      	.attr("dy", ".31em");






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

        })

  


         $(document).off("change","#select_zone_2")
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
    $(document).off("change","#grant_sel")
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
$(document).off("click","#top_banner>div:eq(1)")
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

 
  
   
  var parsed_data ;
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

    var total_max_y= d3.max(list_data_max, function(n) { return n; } );
    console.log("total_max_y"); console.log(total_max_y);
    var list_lower_data_max=[];
    var list_lower_data_n=[];
    var list_upper_data_n=[];
    var threshold=0.5;
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
    var lower_max_y= d3.max(list_lower_data_max, function(n) { return n; } );

    console.log("upper right y"); console.log(list_upper_data_n);
    console.log("lower right y"); console.log(list_lower_data_n);
    console.log("lower_max_y"); console.log(lower_max_y);

    x_data.domain([new Date(vue_obj.base_info.min_date), Date.now()  ]);  
    //x_data.domain(d3.extent(data, function(d) { return parseDate(d.date) }));  
    y_left.domain([0, total_max_y]);
    y_right.domain([0, lower_max_y]);

    x2.domain(x_data.domain());
    y2.domain(y_left.domain());
  

    for(var i=1; i<=list_data_max.length; i++) {
       if(list_data_max[i-1] <  threshold * total_max_y ) {
if(i==1) line1 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==2) line2 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==3) line3 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==4) line4 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==5) line5 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==6) line6 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==7) line7 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==8) line8 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==9) line9 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
       } else {
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



    focus.append("g") .attr("class", "axis axis--x") .attr("transform", "translate(0," + height + ")") .call(xAxis);
    focus.append("g")
      .attr("class", "axis axis--y")
      .attr("stroke","#000000") 
      .attr("stroke-width","1px") 
      .attr("shape-rendering","crispEdges") 
      .call(yAxisLeft);
    focus.append("g")
      .attr("class", "axis axis--y")
      .attr("stroke","#ff0000") 
      .attr("stroke-width","1px") 
      .attr("shape-rendering","crispEdges") 
      .call(yAxisRight)
      .attr("transform", "translate("+width+",0)");


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
    context.append("path")
        .datum(data)
        .attr("class", "line1")
        .attr("stroke", data_line_color[1])
        .attr("fill", "none")        
        .attr("d", line_sub_1);
    context.append("path")
        .datum(data2)
        .attr("class", "line2")
        .attr("stroke", data_line_color[2])
        .attr("fill", "none")  
        .attr("d", line_sub_2);
    context.append("path")
        .datum(data3)
        .attr("class", "line3")
        .attr("stroke", data_line_color[3])
        .attr("fill", "none")  
        .attr("d", line_sub_3);
    context.append("path")
        .datum(data4)
        .attr("class", "line4")
        .attr("stroke", data_line_color[4])
        .attr("fill", "none")  
        .style("stroke-dasharray", ("3, 3"))
        .attr("d", line_sub_4);
    context.append("path")
        .datum(data5)
        .attr("class", "line5")
        .attr("stroke", data_line_color[5])
        .attr("fill", "none")  
        .style("stroke-dasharray", ("3, 3"))
        .attr("d", line_sub_5);
    context.append("path")
        .datum(data6)
        .style("stroke-dasharray", ("3, 3"))
        .attr("fill", "none")  
        .attr("class", "line6")
        .attr("stroke", data_line_color[6])
        .attr("d", line_sub_6);
    context.append("path")
        .datum(data7)
        .style("stroke-dasharray", ("3, 1"))
        .attr("fill", "none")  
        .attr("class", "line7")
        .attr("stroke", data_line_color[7])
        .attr("d", line_sub_7);
    context.append("path")
        .datum(data8)
        .style("stroke-dasharray", ("3, 1"))
        .attr("fill", "none")  
        .attr("class", "line8")
        .attr("stroke", data_line_color[8])
        .attr("d", line_sub_8);
    context.append("path")
        .datum(data9)
        .style("stroke-dasharray", ("3, 1"))
        .attr("fill", "none")  
        .attr("class", "line9")
        .attr("stroke", data_line_color[9])
        .attr("d", line_sub_9);
        

    context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);


    context.append("g")
      .attr("class", "brush")
      .attr("fill","none")
      .call(brush)
      .call(brush.move, x_data.range());
    svg.append("rect")
      .attr("class", "zoom")
      .attr("width", width)
      .attr("height", height)
      .attr("fill","transparent")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);


     

  var legend1 = focus.append("g")
    .attr("class","legend")
    .attr("transform","translate(50,30)")
    .style("font-size","16px")
    .call(d3.legend_left)

  setTimeout(function() { 
    legend1
      .style("font-size","20px")
      .attr("data-style-padding",10)
      .call(d3.legend_left)
  },1000)

  var legend2 = focus.append("g")
    .attr("class","legend")
    .attr("transform","translate(550,30)")
    .style("font-size","16px")
    .call(d3.legend_right)

  setTimeout(function() { 
    legend2
      .style("font-size","20px")
      .attr("data-style-padding",10)
      .call(d3.legend_right)
  },1000)




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
        .attr("y", 0);

    Line_chart = svg.append("g")
        .attr("class", "focus")
        .attr("stroke","#000")
        .attr("strok-width","1px")
        .attr("fill","none")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("clip-path", "url(#clip)");
   
  var parsed_data ;
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

    var total_max_y= d3.max(list_data_max, function(n) { return n; } );
    console.log("total_max_y"); console.log(total_max_y);
    var list_lower_data_max=[];
    var list_lower_data_n=[];
    var list_upper_data_n=[];
    var threshold=0.5;
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
    var lower_max_y= d3.max(list_lower_data_max, function(n) { return n; } );

    console.log("upper right y"); console.log(list_upper_data_n);
    console.log("lower right y"); console.log(list_lower_data_n);
    console.log("lower_max_y"); console.log(lower_max_y);

    x_data.domain([new Date(vue_obj.base_info.min_date), Date.now()  ]);  
    //x_data.domain(d3.extent(data, function(d) { return parseDate(d.date) }));  
    y_left.domain([0, total_max_y]);
    y_right.domain([0, lower_max_y]);

    x2.domain(x_data.domain());
    y2.domain(y_left.domain());
  

    for(var i=1; i<=list_data_max.length; i++) {
       if(list_data_max[i-1] <  threshold * total_max_y ) {
if(i==1) line1 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==2) line2 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==3) line3 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==4) line4 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==5) line5 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==6) line6 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==7) line7 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==8) line8 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
if(i==9) line9 = d3.line().x(function (d) { return x_data(parseDate(d.date)); }).y(function (d) { return y_right(d.number); });
       } else {
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

    focus.append("g") .attr("class", "axis axis--x") .attr("transform", "translate(0," + height + ")") .call(xAxis);
    focus.append("g")
      .attr("class", "axis axis--y")
      .attr("stroke","#000000") 
      .attr("stroke-width","1px") 
      .attr("shape-rendering","crispEdges") 
      .call(yAxisLeft);
    focus.append("g")
      .attr("class", "axis axis--y")
      .attr("stroke","#ff0000") 
      .attr("stroke-width","1px") 
      .attr("shape-rendering","crispEdges") 
      .call(yAxisRight)
      .attr("transform", "translate("+width+",0)");

    Line_chart.append("path")
        .datum(data)
        .attr("stroke", data_line_color[1])
        .attr(data_legend_LR[1], data_legend_names[1])
        .attr("d", line1);
    Line_chart.append("path")
        .datum(data2)
        .attr("stroke", data_line_color[2])
        .attr(data_legend_LR[2], data_legend_names[2])
        .attr("d", line2);
    Line_chart.append("path")
        .datum(data3)
        .attr("stroke", data_line_color[3])
        .attr(data_legend_LR[3], data_legend_names[3])
        .attr("d", line3);
    Line_chart.append("path")
        .datum(data4)
        .attr("stroke", data_line_color[4])
        .style("stroke-dasharray", ("3, 3"))
        .attr(data_legend_LR[4], data_legend_names[4])
        .attr("d", line4);
    Line_chart.append("path")
        .datum(data5)
        .attr("stroke", data_line_color[5])
        .style("stroke-dasharray", ("3, 3"))
        .attr(data_legend_LR[5], data_legend_names[5])
        .attr("d", line5);
    Line_chart.append("path")
        .datum(data6)
        .attr("stroke", data_line_color[6])
        .style("stroke-dasharray", ("3, 3"))
        .attr(data_legend_LR[6], data_legend_names[6])
        .attr("d", line6);
    Line_chart.append("path")
        .datum(data7)
        .attr("stroke", data_line_color[7])
        .style("stroke-dasharray", ("3,1,1,1,3"))
        .attr(data_legend_LR[7], data_legend_names[7])
        .attr("d", line7);
    Line_chart.append("path")
        .datum(data8)
        .attr("stroke", data_line_color[8])
        .style("stroke-dasharray", ("3,1,1,1,3"))
        .attr(data_legend_LR[8], data_legend_names[8])
        .attr("d", line8);
    Line_chart.append("path")
        .datum(data9)
        .attr("stroke", data_line_color[9])
        .style("stroke-dasharray", ("3,1,1,1,3"))
        .attr(data_legend_LR[9], data_legend_names[9])
        .attr("d", line9);


    context.append("path")
        .datum(data)
        .attr("class", "line1")
        .attr("stroke", data_line_color[1])
        .attr("d", line_sub_1);
    context.append("path")
        .datum(data2)
        .attr("class", "line2")
        .attr("stroke", data_line_color[2])
        .attr("d", line_sub_2);
    context.append("path")
        .datum(data3)
        .attr("class", "line3")
        .attr("stroke", data_line_color[3])
        .attr("d", line_sub_3);
    context.append("path")
        .datum(data4)
        .attr("class", "line4")
        .attr("stroke", data_line_color[4])
        .style("stroke-dasharray", ("3, 3"))
        .attr("d", line_sub_4);
    context.append("path")
        .datum(data5)
        .attr("class", "line5")
        .attr("stroke", data_line_color[5])
        .style("stroke-dasharray", ("3, 3"))
        .attr("d", line_sub_5);
    context.append("path")
        .datum(data6)
        .style("stroke-dasharray", ("3, 3"))
        .attr("class", "line6")
        .attr("stroke", data_line_color[6])
        .attr("d", line_sub_6);
    context.append("path")
        .datum(data7)
        .style("stroke-dasharray", ("3, 1"))
        .attr("class", "line7")
        .attr("stroke", data_line_color[7])
        .attr("d", line_sub_7);
    context.append("path")
        .datum(data8)
        .style("stroke-dasharray", ("3, 1"))
        .attr("class", "line8")
        .attr("stroke", data_line_color[8])
        .attr("d", line_sub_8);
    context.append("path")
        .datum(data9)
        .style("stroke-dasharray", ("3, 1"))
        .attr("class", "line9")
        .attr("stroke", data_line_color[9])
        .attr("d", line_sub_9);
        

    context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);
    context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, x_data.range());
    svg.append("rect")
      .attr("class", "zoom")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);



  var legend1 = focus.append("g")
    .attr("class","legend")
    .attr("transform","translate(50,30)")
    .style("font-size","12px")
    .call(d3.legend_left)

  setTimeout(function() { 
    legend1
      .style("font-size","20px")
      .attr("data-style-padding",10)
      .call(d3.legend_left)
  },1000)

  var legend2 = focus.append("g")
    .attr("class","legend")
    .attr("transform","translate(550,30)")
    .style("font-size","12px")
    .call(d3.legend_right)

  setTimeout(function() { 
    legend2
      .style("font-size","20px")
      .attr("data-style-padding",10)
      .call(d3.legend_right)
  },1000)





    }
    
function brushed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
  var s = d3.event.selection || x2.range();
  x_data.domain(s.map(x2.invert, x2));

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
  if( dateDiff(t.rescaleX(x2).domain()[0] ,t.rescaleX(x2).domain()[1] ) > 8 ){
       if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
        x_data.domain(t.rescaleX(x2).domain());
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

<template>
    <div id="startup_new_con" class="startup_detail panel_2 hidden">       
        <div class="news_con" id="make_news" style="overflow:auto;"  v-if="check_mypage" >
            <div class="news_ttl"  style="float:left; width:50px; display:inline-block">
                <img class="logo"  :src="'http://13.209.21.165/' +st.logo">
            </div>     
            <div style="float:left">
            <div class="hidden" id="" style="width:100px;height:100px;float:left" v-on:click="click_img_input"><input v-on:change="previewFile_news" id="add_img" type="file" style="opacity:0"></div>
            <textarea class="news_text" id="add_news" style=" outline:none;resize:none; display:inline-block; border:1px solid #ddd; border-bottom:none; padding:10px;;margin-left:24px;width:823px;;height:80px; float:left" placeholder="최근 활동 / 뉴스를 공유하세요!"></textarea>
            <div id="fake_bottom" style="clear:both;width:843px;height:40px; border:1px solid #ddd; border-top:none;margin-left:24px; ">
                <div id="add_image_btn" class="f5" v-on:click="click_img_input" style="margin-left:10px;vertical-align:top;display:inline-block"><img src="/static/img/pic.png" style="float:left;margin-top:6px;margin-left:10px;margin-right:5px;">이미지업로드</div><img id="pre_img" class="hidden" style="width:30px;height:30px;display:inline-block" >
                <div id="add_youtube_btn"  class="f5 link_up" style="margin-left:10px;vertical-align:top;display:inline-block"><img src="/static/img/pic.png" style="float:left;margin-top:6px;margin-left:10px;margin-right:5px;">동영상업로드</div><img id="pre_img2" class="hidden" style="width:30px;height:30px;display:inline-block" >
                <input type="hidden" id="youtube_id">
            </div>     
            <div v-on:click="add_activity($event)" class="add_news f4" style="margin-left:25px; margin-top:10px;cursor:pointer">게시하기</div>            
            </div>
        </div>
        <div class="news_con"  v-for="new_seg in st.news">
            <div class="news_ttl">
                <img class="logo" :src="'http://13.209.21.165/' +st.logo">
                <div class="text_con">
                    <div class="startup_name">{{st.name}}</div>
                    <div class="date">{{new_seg.date}}</div>
                </div>
                
                <div class="more"  v-if="check_mypage" ><i class="fas fa-ellipsis-v"></i>
                    <div class="more_div hidden">
                        <ul>
                            <li v-on:click="modi_news($event,new_seg.id)">수정</li>
                            <li v-on:click="del_news($event,new_seg.id)">삭제</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="new_seg.img"  style="max-width:200px; margin-top:20px;"><img :src="'http://13.209.21.165/'+ new_seg.img" style="max-width:200px;"></div>
            <div v-if="new_seg.youtube"  style="margin-top:20px;"><iframe width="640" height="360" :src="'http://www.youtube.com/embed/'+new_seg.youtube" frameborder="0" allowfullscreen></iframe></div>
            
            <div class="news_text" v-html="new_seg.content" style=" white-space: pre-line;"></div>
            <div class="news_bottom">
                <div class="like_con"><i style="cursor:pointer" v-on:click="like($event)" :data-id="new_seg.id" class="far fa-thumbs-up"></i>{{new_seg.like_num}}명이 좋아합니다.</div>
                <div class="rep_con"><i class="fas fa-comment-alt"></i>{{ new_seg.rep | array_length}}<i style="margin-left:10px;" class="fas fa-sort-down"></i></div>
                <div class="share_con"><i class="fas fa-share-alt"></i>
                <div class="share_div hidden" :data-id="new_seg.id">
                        <ul>
                            <li style="cursor:pointer" v-on:click="share_facebook($event)">페이스북</li>
                            <li style="cursor:pointer"  v-on:click="share_twitter($event)">트위터</li>
                        </ul>
                    </div>
                    </div>                
            </div>
            <div class="reply_con">
                <div class="rep" v-for="rep in new_seg.rep">
                    <img class="rep_logo">
                    <div class="rep_content">
                        <div class="rep_text">{{rep.content}}</div>
                        <div class="rep_date">{{rep.date}}</div>
                    </div>
                </div>
            </div>
            <div class="wr_con"><input class="wr_input" :data-id="new_seg.id"  @keyup.enter="add_rep($event)"  placeholder="댓글을 작성해 보세요."></div> 
        </div>   
          <div id="back_layer" class="hidden">
        </div>
        <div id="up_link" style="z-index:999" class="hidden">
            <div id="pop_hd">
                <span id="pop_ttl">링크 등록</span>
                <span id="x_btn">X</span>
            </div>
            <div id="link_con">
                <input class="in"  id="link_input" type="text">
                <div id="pop_submit">확인</div>
            </div>
        </div>
    </div>
</template>
<script>

function youtubeId(url) {
    var tag = "";
    if(url)  {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var matchs = url.match(regExp);
        if (matchs) {
            tag += matchs[7];
        }
            $("#result").html("유튜브 영상 :  <a target='_blank' href='"+url+"')>"+url+"</a>")

        return tag;
    }
    
}
export default {
    computed:{
        check_mypage:function(){
            if(this.$route.fullPath.indexOf("mypage") == -1){
                return false
            }
            else{
                return true
            }
        }
    },   
    data:function(){
        return{
           st:{}
        }
    },
    methods:{
         previewFile_news:function() {
  var preview = document.getElementById('pre_img');
  var file    = document.getElementById('add_img').files[0];
  var reader  = new FileReader();
  reader.addEventListener("load", function () {
    preview.src = reader.result;
    $("#pre_img").removeClass("hidden")
  }, false);
  if (file) {
    reader.readAsDataURL(file);
  }
        }, 

        click_img_input: function(){
            console.log("here")
            $("#add_img").click()
        },
        share_twitter:function(){
            window.open("https://twitter.com/intent/tweet?text=&url="+this.HOST+this.$route.fullPath)
        },
        share_facebook:function(){
            window.open("http://www.facebook.com/sharer.php?u="+this.HOST+this.$route.fullPath)
        }
        ,
        del_news:function(e,id){
            var result = confirm("해당 소식을 삭제하시겠습니까?")
            if(result==true){
                var formData = new FormData();
                var data = {"id":id}
                console.log(data)
                formData.append('json_data', JSON.stringify(data));    
                this.$http.post(`/vue_del_startup_news/`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
                }).then((result) => {
                this.$http.get(`/vue_get_startup_detail/?id=`+this.st.startup_id)
                .then((result) => {
                    console.log(result)
                    this.st = result.data
                    $(".news_con:eq(0)>div>input").attr("data-id",this.st.news[0].id )
                    $(".more_div").addClass("hidden")
                })})
            }
        },
        modi_news:function(e, id){
            if($(e.path[0]).text() =="수정"){
                $(".news_con[news-id='"+id+"']").find(".news_text").attr("contenteditable",true)
                $(".news_con[news-id='"+id+"']").find(".news_text").focus()
                $(e.path[0]).text("완료")
            }
          else{
               $(".news_con[news-id='"+id+"']").find(".news_text").attr("contenteditable",false)    
                 for(var k=0; k < this.st.news.length ; k++){
                   if( this.st.news[k].id == parseInt(id) ){
                        this.st.news[k].content = $(".news_con[news-id='"+id+"']").find(".news_text").text()
                      var formData = new FormData();
            formData.append('json_data', JSON.stringify(this.st));
                 var file1 = document.querySelector('#add_img');                    
            formData.append("file_news", file1.files[0]);
            this.$http.post(`/vue_update_startup_detail/`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((result) => {
                this.$http.get(`/vue_get_startup_detail/?id=`+this.st.startup_id)
                .then((result) => {
                    this.st = result.data
                    $(".news_con:eq(0)>div>input").attr("data-id",this.startup.news[0].id )
                })})
                $(".more_div").addClass("hidden")
                    }    
                }   
               $(e.path[0]).text("수정")
          }
        }
        ,
        add_activity:function(e){
            console.log($("#add_news").val().replace( /\n/g, '<br \\>' ))
            this.st.news.unshift({
                "content":$("#add_news").val().replace( /\n/g, '<br \\>' ), "like_num":"0", "rep_num":"0",
                "img":$("#add_img").val().replace(/^.*[\\\/]/, ''),"youtube":$("#youtube_id").val()
            })
            $("#add_news").text("")
        var formData = new FormData();
            this.st.file_name=$("#add_img").val().replace(/^.*[\\\/]/, '')
            formData.append('json_data', JSON.stringify(this.st));            
            var file1 = document.querySelector('#add_img');                    
            formData.append("file_news", file1.files[0]);             
            this.$http.post(`/vue_update_startup_detail/`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((result) => {
                this.$http.get(`/vue_get_startup_detail/?id=`+this.st.startup_id)
                .then((result) => {
                    console.log(result)
                    this.st = result.data
                    $(".news_con:eq(0)>div>input").attr("data-id",this.st.news[0].id )
                })
                
        })

        },
        like:function(e){
            var target 
            for(var k=0; k < this.st.news.length ; k++){
                if( this.st.news[k].id == parseInt($(e.path[0]).attr("data-id")) ){ 
                    target = this.st.news[k].id    
                   
                    $.ajax({
                        url: "/vue_set_activity_like/",
                        type:"POST",
                        data:{
                            id:localStorage.getItem("id"),
                            k:target,
                        },
                        success:function(res){
                            console.log(res)
                        }
                    })
                     var formData = new FormData();
            formData.append('json_data', JSON.stringify(this.st));    
            this.$http.post(`/vue_update_startup_detail/`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
                })
            .then((result) => {
                this.$http.get(`/vue_get_startup_detail/?id=`+this.st.startup_id)
                .then((result) => {
                    console.log(result)
                    this.st = result.data
                })
                })                
                }
            }
        },
        add_rep:function(e){          
            
            if($(e.path[0]).val().replace(/(^\s*)|(\s*$)/gi, "") != ""){
                console.log("here")
                for(var k=0; k < this.st.news.length ; k++){
                if( this.st.news[k].id == parseInt($(e.path[0]).attr("data-id")) ){ 
                    // 서버에 전송하는 로그
                    this.st.news[k].rep.push({
                            "logo":"",
                            "content":$(e.path[0]).val(),
                            "origin_date":new Date(),
                            "date": "몇초전"
                    })
                    $(e.path[0]).val("")
                     var formData = new FormData();
            formData.append('json_data', JSON.stringify(this.st));    
            this.$http.post(`/vue_update_startup_detail/`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
                })
            .then((result) => {
                this.$http.get(`/vue_get_startup_detail/?id=`+this.st.startup_id)
                .then((result) => {
                    console.log(result)
                    this.st = result.data;
                })
                })
                }
            }    
            }           
        }
    },
    updated:function(){
        var vue_obj = this
      if(this.$route.fullPath.indexOf("mypage")==-1){
                $(".more").each(function(){
                    $(this).remove()
                })               
            }
            setTimeout(function(){
                 if(vue_obj.$route.fullPath.indexOf("mypage")==-1){
                               $("#make_news").remove()
            }
            },1000)
    },
    mounted: function(){
        var vue_obj = this

        $(document).ready(function(){       
            
<<<<<<< HEAD
         vue_obj.$http.get(`/vue_get_startup_detail/?id=`+vue_obj.$route.params.id)
=======
         vue_obj.$http.get(`${vue_obj.baseURI}/vue_get_startup_detail/?id=`+vue_obj.$route.params.id)
>>>>>>> 1a6c11f90f1fb662cfe1d46b3f18dee3ffb132f2
                .then((result) => {
                    console.log("sss")
                    console.log(result)
                    vue_obj.st = result.data;
                    console.log(vue_obj.st)
                })

            $(document).on("keyup","#add_news", function(e){
                console.log("dasd")
                console.log(e.keycode)
            if ( e.keycode == 13 ){
                console.log("sdf")
                e.preventDefault();
                //add a <br>
                $("#add_news").html($("#add_news").html()+"<br>")
               
                }
            })


        $(document).off("click",".link_up")
         $(document).on("click",".link_up",function(){
             if($("#up_link").hasClass("hidden")){
                 $("#up_link").removeClass("hidden")          
                 $("#back_layer").removeClass("hidden")
                 $("#back_layer").css("position","fixed!important")
                 $("#back_layer").css("width",$(window).width())
                 $("#back_layer").css("height",$(window).height())
                 $("#back_layer").css("top","0px")
                 $("#back_layer").css("left","0px")
             }
             else{
                $("#up_link").addClass("hidden")
                var url_id = youtubeId($("#link_input").val())
                 $("#back_layer").addClass("hidden")
                 $("#back_layer").css("position","fixed!important")
                 $("#back_layer").css("width",0)
                 $("#back_layer").css("height",0)
                 $("#back_layer").css("top","0px")
                 $("#back_layer").css("left","0px")
             }
         })
           $(document).off("click","#x_btn")
          $(document).on("click","#x_btn",function(){
             if($("#up_link").hasClass("hidden")){
                 $("#up_link").removeClass("hidden")
             }
             else{
                $("#up_link").addClass("hidden")
                    $("#back_layer").addClass("hidden")
                 $("#back_layer").css("position","fixed!important")
                 $("#back_layer").css("width",0)
                 $("#back_layer").css("height",0)
                 $("#back_layer").css("top","0px")
                 $("#back_layer").css("left","0px")
             }
         })
    
          $(document).on("click","#pop_submit", function(){
                var url_id = youtubeId($("#link_input").val())
                $("#youtube_id").val(url_id);
                 $.ajax({
            url:'https://www.googleapis.com/youtube/v3/videos?id='+url_id+'&part=contentDetails&key=AIzaSyDQt1e_0DUVFiR8288ALtZWyVRlad45-Rc',
            type:"get",
            success:function(res){
                console.log(res)
                alert("영상이 정상 등록되었습니다.");
                console.log(res.items[0].contentDetails.duration)
                var img ='https://img.youtube.com/vi/'+url_id+'/0.jpg'
                $("#pre_img2").attr("src", img)
                $("#pre_img2").removeClass("hidden")                
                 $("#up_link").addClass("hidden")
                 $("#back_layer").addClass("hidden")
                 $("#back_layer").css("position","fixed!important")
                 $("#back_layer").css("width",0)
                 $("#back_layer").css("height",0)
                 $("#back_layer").css("top","0px")
                 $("#back_layer").css("left","0px")
                }
        })
    })
            $(document).on("click",".rep_con", function(){
                $(this).parent().parent().find(".reply_con").addClass("show")
                $(this).parent().parent().find(".wr_con").addClass("show")
                $(this).parent().parent().find(".wr_con").find("input").focus()
            })
            if(vue_obj.$route.fullPath.indexOf("mypage")==-1){
                console.log(vue_obj.$route.fullPath)
                console.log("eee")
                $(".more").each(function(){
                    $(this).remove()
                })
        
            }
            $(document).on("click",".more", function(){
                $(this).find(".more_div").removeClass("hidden")
            })
            var mouse_event;
            $(document).on("mouseenter",".share_con", function(){
                $(".share_div").addClass("hidden")                
                $(this).find(".share_div").removeClass("hidden")
            })
            $(document).on("mouseleave",".share_div", function(){
                $(this).addClass("hidden")
            })            
            if(vue_obj.$route.fullPath.indexOf("mypage") == - 1){
                $(".more").each(function(){
                    $(this).remove()   
                })            
            }
        })
    },
}
</script>
<style scoped>
.wr_con{
    display: none
}
.wr_con.show{
    display:block!important
}
input:focus {
  outline: none;
}
.wr_input{
    width: 846px;
    height: 32px;
    border-radius: 16px;
    border: solid 1px #ced4da;
    font-size: 12px;
    line-height: 32px;
    padding-left: 16px;
  color: #a0a3bc;
}
.rep{
   margin-bottom: 24px; 
       clear: both;
    overflow: auto;
}
.rep_date{
     font-size: 10px;
  line-height: 1.4; 
  color: #a0a3bc;
}
    .rep_content{
       float: left;
        font-size: 12px;
  line-height: 1.33; 
  color: #1a2f53;
  margin-left: 8px;
  cursor: pointer;
    }
    .reply_con{
        padding-top:17px; 
        width: 862px;
        height: auto;
        overflow: auto;
        border-top: solid 1px #ced4da;
        margin-top: 5px;
        display: none;
    }
    .reply_con.show{
    display:block!important
    }

    .rep_logo{
         float: left;
        width: 24px;
        height: 24px;
        background-color: #d8d8d8;
    }
    .news_bottom{
        margin-top: 40px;
        overflow: auto;
    }
    .like_con{
        float: left;
        font-size: 12px;
        line-height: 1.33;  
        color: #a0a3bc;
    }
    .like_con>i{
        font-size: 20px;
        margin-right:4px;
    }
    .rep_con{
        float: left;
        font-size: 12px;
        line-height: 1.33;
        color: #a0a3bc;
        margin-left: 10px;
    }
    .rep_con>i{
         margin-right:4px;
         font-size: 20px;
    }
    .share_con{
        float: right;
    }
    .news_con{
        position: relative;
        width:968px;
        /* height: auto;
        overflow: auto; */
        background-color: #fff;
        padding: 24px;
        margin-bottom: 24px;
    }
    .news_ttl{
        width: 100%;
        height: 49px;
    }
    .logo{
        width: 49px; 
        height:49px;
        float: left;
        margin-right: 8px;
    }
    .news_ttl>div.text_con{
        float: left;
        
    }
    .startup_name{
        font-size: 16px; 
        color: #a0a3bc;
    }
    .text_con>.date{
        font-size: 12px;
        line-height: 1.33;
        color: #a0a3bc;
        margin-top:5px; 
    }
    .more{
        float: right;
        cursor: pointer;
    }
    .news_text{
      
        font-size: 14px;
        line-height: 1.71;
        color: #1a2f53;
    }
    .more_div{
        padding: 10px;
        border:1px solid #ddd;
        position: absolute;
        right:30px;
        top:20px;

    }
    .more_div>ul>li{
        border-bottom: 1px solid #ddd
    }
    .more_div>ul>li:nth-child(2){
        border-bottom: none
    }
    .share_div{
        padding: 10px;
        border:1px solid #ddd;
        position: absolute;
        right:40px;
        bottom: -33px;
        background-color: #fff;
        z-index: 999;
    }
    .share_div>ul>li{
         border-bottom: 1px solid #ddd
    }
    .share_div>ul>li:nth-child(2){
        border-bottom: none
    }

.add_news{
    width: 106px;
    height: 40px;
    background-color: #1b49f4;
    text-align: center;
    line-height: 40px;
    border-radius: 20px;
    color:#fff;
    clear:both
    }
#add_image_btn,#add_youtube_btn {
    width: 123px;
    height: 30px;
    border-radius: 28px;
    background-color: #e7edfc;  
    cursor: pointer;
    line-height:30px
}
#up_link{
    top:300px;
    left:50%;
    margin-left: -282px;
    position: fixed;
    border:1px solid   #e7edfc;
    width: 564px;
    height: 281px;
    background-color: #ffffff;
}
#link_input{
    width: 411px;
    height: 56px;
    border: solid 1px #ced4da;
    margin-top: 40px;
    margin-left: 80px;
    padding-left: 20px;
}


#pop_hd{
    width:100%;
    height: 56px;
    border-bottom:1px solid   #e7edfc;
}

#link_con{
    height:224px;
    width: 564px;
}
#up_link{
    top:300px;
    left:50%;
    margin-left: -282px;
    position: fixed;
    border:1px solid   #e7edfc;
    width: 564px;
    height: 281px;
    background-color: #ffffff;
}

#pop_ttl{
    display: inline-block;
    float: left;
    line-height: 56px;
    margin-left: 24px;
}
#x_btn{
    display: inline-block;
    float: right;
    line-height: 56px;
    margin-right: 24px;
    cursor: pointer;
}


#pop_submit{
    width: 74px;
    height: 40px;
    border-radius: 28px;
    background-color: #ffffff;
    border: solid 1px #1b66f4;
    text-align: center;
    height: 38px;
    font-size: 14px;
  font-weight: bold;
  line-height: 38px;
  letter-spacing: -0.1px;  
  color: #1b49f4;
  cursor: pointer;
  margin-top:40px;
  margin-left:245px;
}
#pop_submit:hover{
background-color: #1b49f4;
color:#fff;
}

</style>

<template>
   
    <div id="clip_view">
        <app-header></app-header>
        <Header2></Header2>

     
        <div id="content">
        <div id="view_con">
            <div id="view_left" >
                <div id="view_hd">
                    <div id="ttl">{{con.title}}</div>
                    <div id="sub_ttl">
                            <span class="date">{{con.created}}</span>|
                            <span class="name">{{con.user}}</span>|
                            <span class="duration">{{con.play | seconds2time  }}</span>           
                    </div>         
                     
                    <div id="heart_con">
                        <img class="heart" v-if="con.int_clip == 'true'" src="/static/img/like_p.png">
                        <img class="heart" v-else src="/static/img/like_d.png">
                        
                     {{con.int}} </div>   
                </div>
                <div id="view_main">
                    <div id="clip">
                        <div style="margin:24px;padding-top:24px;">
                        <div id="ytplayer"></div>
                        </div>
                    </div>
                  
                </div>
                     <div id="exp_con">
                        <div id="filter_p_con"  style="padding-top:24px;">
                        <div class="filter_p" v-for="t in con.tag"># {{t}}</div>                        
                    </div>
                    <div id="exp" style="padding-top:16px;margin-left:24px;">
                            <div class="sub_ttl">
                                추천 수강 대상
                            </div>
                            {{con.info}}
                        </div>
                        <div id="exp_text" style="margin-top:24px;margin-left:24px;; padding-bottom:24px;"> 
                            <div class="sub_ttl">
                                코스 소개
                            </div>
                            
                            {{con.info}}
                        </div>
                    </div>
            </div>
            <div id="view_right" >
                <RecoClip :another_clip="con.another_clip" :another_course="con.another_course"></RecoClip>
            </div>
        </div>
        </div>
    </div>

    
</template>

<script>
import RecoClip from "./RecoClip.vue"
import AppHeader from "../../Common/Header.vue"
import Header2 from "./Common/HeaderClip.vue"


export default {
    components:{
        Header2, RecoClip,AppHeader
    },
    data:function(){
        return{
            con:{}
        }
    },
    mounted:function(){
        var vue_obj = this
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        function onYouTubePlayerAPIReady(id) {
            var player = new YT.Player('ytplayer', {
                height: '500',
                width: '866',
                videoId: id,
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        }
        var write_log
        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING ) {
                write_log = setInterval(watch_clip_history, 6000);// 6초마다 서버에 로그를 저장한다.
            } else {
                clearInterval(write_log)
            }
            if(event.data == YT.PlayerState.ENDED){
                clearInterval(write_log)
            }
        }

        function watch_clip_history(){
            this.$http.post("/vue_watch_clip_history/",this.qs({
                    "id":localStorage.getItem("id"),
                    "val" : vue_obj.$route.params.id,                    
                }) ).then((res)=>{

                })

        }

        $(document).ready(function(){

            vue_obj.$http.post("/vue_hit_clip_log/",vue_obj.qs({
                    "id":localStorage.getItem("id"),
                    "val" : vue_obj.$route.params.id,                    
                }) ).then((res)=>{

                })
        
            
            $(document).off("click","#heart_con")
            $(document).on("click","#heart_con", function(){
                console.log("here")
                if($("#heart_con>img").attr("src").indexOf("_p") != -1){
                    if(confirm("관심 강의에서 삭제하시겠습니까?")){
                        
                        vue_obj.$http.post("/toggle_int_clip/",vue_obj.qs({
                                "id":localStorage.getItem("id"),
                                "val":vue_obj.$route.params.id
                            }) ).then((res)=>{
                                           alert("성공적으로 삭제 되었습니다.")
                                $("#heart_con>img").attr("src","/static/img/like_d.png")
                                vue_obj.con.int =  parseInt(vue_obj.con.int)  - 1
                            })

                    
                    

                    }
                } else {
                    console.log("add")

                        vue_obj.$http.post("/toggle_int_clip/",vue_obj.qs({
                                "id":localStorage.getItem("id"),
                                "val":vue_obj.$route.params.id
                            }) ).then((res)=>{
                                           alert("성공적으로 등록 되었습니다.")
                                $("#heart_con>img").attr("src","/static/img/like_p.png")
                                vue_obj.con.int =  parseInt(vue_obj.con.int)  + 1
                            })


                }                
            })

            vue_obj.$http.post("/vue_get_clip/", vue_obj.qs({"id":vue_obj.$route.params.id, "user":localStorage.getItem("id")}) )
            .then((res)=>{
                  console.log(res)
                  console.log(res)
                    vue_obj.con = res.data
                    // Load the IFrame Player API code asynchronously.
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    onYouTubePlayerAPIReady(res.data.youtube)
                    // Replace the 'ytplayer' element with an <iframe> and
                    // YouTube player after the API code downloads.
            })

        })
    }
}
</script>

<style scoped>
#filter_p_con{
    margin:24px;
}
.filter_p{
    cursor: pointer;
    display: inline-block;
    border-radius: 20px;
    padding: 0px 16px;
    height: 40px;
    background-color: #f5f8ff;
    opacity: 0.7;
    font-size: 14px;
    letter-spacing: -0.1px;
    color: #1a2a53;
    line-height: 40px;
}

#ytplayer{
    margin:24px;
}
#clip_view{
    width: 100%;
    overflow: auto;
}
#content{
    width:1224px;;
    margin: 0px auto;
}
#view_left{
    width: 912px;
    height: auto;
    overflow: auto;
    float: left;
}
#view_right{
    float: left;
    margin-left: 22px;
}
#view_hd{
    width: 912px;
    height: 118px;
    background-color: #ffffff;
    position: relative;
}
#ttl{
    font-size: 24px;
    line-height: 1.67;
    letter-spacing: -0.6px;
    color: #1a2f53;
    position: absolute;
    height: 40px;
    top:20px;
    left:24px;
}
#sub_ttl{
     width: 500px;
  height: 22px;
  opacity: 0.7;
  font-size: 12px; 
  line-height: 1.83;
  color: #1a2a53;
    position: absolute;
    top:68px;
    left: 24px;;
}
#sub_ttl>span{
    display: inline-block;
    margin-right: 8px;
}

#heart_con{
    position: absolute;
    top:74px;
    left:849px;
}
#heart_con>img{
    width: 16px;
  height: 16px;
}

#view_main{
    margin-top:16px;
    width: 912px;
    min-height: 550px;
    background-color: #ffffff;
}
#exp_con{
    width: 912px;
    height: auto;
    background-color: #fff;
}




</style>

<template>
    <div id="reco_clip">
        <div class="ttl">추천 다음강의</div>
        <div id="clip_con">
            <div class="clip_seg"  :data-clip="an.id" v-for="an in another_clip">
                <a :href="'/clip/'+an.id"> 
                <img :src="an.thumb" class="list_thumb" style="">
                <div class="clip_dur">{{an.play | get_time_format }}</div>
                <div style="float:left">   
                    <div class="clip_ttl">{{an.title | truncate(15) }}</div>
                    <div class="clip_sub_text">{{an.created}} &nbsp;|&nbsp; {{an.user}}</div>
                    
                </div>
                </a>
            </div>
         
        </div>
        <div class="ttl" style="margin-top:26px;">추천 코스</div>
            <div id="course_con">
                <div class="co">
                    <router-link :to="an.entry_point" v-for="an in another_course"> 
                        <div class="co_ttl" ><div class="course_ttl">{{an.title}}</div>
                            <div class="clip_sub_text">{{an.play}} | {{an.created}} &nbsp;|&nbsp; {{an.user}}</div>
                        </div>
                   </router-link>                  
                </div>
            </div>
    </div>
</template>

<script>
export default {
    props:["another_clip","another_course"],
}
</script>

<style scoped>
.course_ttl{
    opacity: 0.8;
    font-size: 14px;
    font-weight: bold;
    color: #1a2a53;
    margin-top:12px;
}
.clip_sub_text{
    margin-top:12px;
    opacity: 0.8;
    font-size: 10px;
    color: #1a2f53;
}
.list_thumb{
     width: 92px;
  height: 56px;
  float: left;
  margin: 8px;
}
#course_con{
    margin-top: 10px;
}
.co_ttl{
    width: 270px;;
    padding-left:16px; 
    font-size: 14px;
    font-weight: bold;
    letter-spacing: -0.1px;
    color: #1a2a53;
    margin-bottom: 6px;
    cursor: pointer;
    height:74px;
    border: solid 1px #e7edfc;
    background-color: #fff;
}
    .co{
        width: 288px;
        height: auto;
   }
    .ttl{
        margin-top: 16px;
        height: 26px;
        font-size: 14px;
        font-weight: bold;
        line-height: 1.86;
        letter-spacing: -0.1px;
        color: #1a2a53;
    }
    #clip_con{
        margin-top: 10px;
      
        width: 288px;
       overflow: auto
    }
    .clip_seg{
        position: relative;
        width: 286px;
        height: 74px;
        cursor: pointer;
        background-color:#fff;
        border:1px solid #e7edfc;
        margin-bottom: 8px;
    }
    .clip_ttl{      
        font-size: 14px;
        letter-spacing: -0.1px;
        color: #1a2a53;
        margin-top:11px;
    }
    .clip_dur{
        opacity: 0.7;
        font-size: 12px;
        position: absolute;
        top:45px;
        left:55px;  
        color: #1a2a53;
        background-color: #000;
        color:#fff;
        padding: 2px 3px;
        font-size:10px;
    }


</style>

<template>
    <div id="home_main">
        <app-header></app-header>
        <div id="intro_register" style="width:100%; height:347px;background-image:url('/static/img/group-6.jpg')" >
            <div id="intro_reg_con" style="width:1224px;height: 347px; margin:0px auto;">
                <div class="big" style="">컨텐츠 스타트업에게 필요한<br >지원사업, 기업정보, 교육을 한 곳에 모았다.</div>
                <div class="small">지원사업에 간단하게 지원하고 쉽게 관리해보세요.</div>
                <div id="reg_btn" @click="go_login" v-if="is_not_logined">가입하기</div>
            </div>
            
        </div>

        <div id="grant_pane">
            <div id="grant_con">
                <div id="grant_ttl" style="color:#fff; margin-bottom:18px">G-CONNECT가 추천하는 지원사업</div>
                <div id="more_grant" style="color:#fff"><router-link to="/grant">더보기<img  style="float:right; margin-left:5px;"  src="/static/img/pluse_w.png"></router-link></div>
                <div id="grant_list" style="padding-top:30px">
                    <div class="gr_list" :key="index" v-if="grantList.length > 0" v-for="(d, index) in grantList"   style="float:left;">
                        <CardWithPoster v-if="d.img" v-bind:item="d"></CardWithPoster>
                        <CardWithoutPoster  v-else v-bind:item="d"></CardWithoutPoster>
                    </div>                    
                </div>
                   <div style="line-height:24px;color:#fff"><img style="float:left; margin-right:8px; margin-right:5px;" src="/static/img/pluse.png">
                   <span style="float:left; display:inline-block"> 필터 등록을 통해 나에게 맞는 지원사업을 추천받아 보세요.</span></div>
                   <div id="add_filter_btn" @click="go_filter_add" class="add_filter_btn">필터등록하러가기 <img style="margin-left:16px;" src="/static/img/arrow_R.png"></div>
            </div>    
        </div>
        <div id="startup" style="height:430px;">
            <div id="startup_ttl">스타트업</div>
            <div id="more_startup"><router-link to="/startup_list">더보기<img  style="float:right; margin-left:5px;margin-top:5px;"  src="/static/img/pluse4.png"></router-link></div>
            <div id="startup_list">
                <StartupCard style="border: solid 1px #e7edfc;width:358px;" :startup="startup" :key="index" v-for="(startup,index) in startupList"></StartupCard>
            </div>
             <div style="line-height:24px;color:#fff"><img style="float:left; margin-right:8px; margin-right:5px;" src="/static/img/pluse.png">
                   <span style="float:left; display:inline-block; color:#1b49f4"> 매번 제출해야하는 회사 기본정보, 회사 소개 매번 지원 할 때마다 쓰는거 귀찮지않나요?</span></div>
                   <div id="add_filter_btn" class="add_filter_btn">필터등록하러가기 <img style="margin-left:16px;" src="/static/img/arrow_R.png"></div>
        </div>
        <div id="channel">
            <div style="background-image:url('/static/img/group-7.png'); width:100%;">
            <div id=channel_con >
            <div id="channel_ttl">채널</div>         
            <div id="more_channel">더보기 <img  style="float:right;margin-left:5px; margin-top:5px;"  src="/static/img/pluse4.png"></div>
            <div id="channel_2_ttl">강의</div>
            <div id="clip_list">
                 <div class="clip_seg_main" v-on:click="go_data_url(clip.entry_point)" :data-url="clip.entry_point"  v-for="clip in clip_on">
                    <img :src="clip.img" style="width:390px; height:227px; float:left">
                        <div class="text_con" style="position:relative">
                         <div class="clip_ttl">{{clip.title}}</div>
                         <div class="clip_sub">{{clip.sub}}</div>
                         <div class="hr"></div>
                         <span class="clip_user"></span>
                         <div class="bottom_text"> {{clip.dur}} | {{clip.date}}</div>
                         <div data-target="clip" class="heart_clip heart_con heart" :data-id="clip.id">
                             <img :data-id="clip.id" src="/static/img/like_d.png"></div>
                         </div>
           
                 </div>
            </div>

            
            </div>
            </div>


        <div id="channel2">
            <div class="channel_con">
            <div class="channel_3_ttl">코스</div>
            <div id="clip_list">
                 <div class="clip_seg_main"  v-on:click="go_data_url(clip.entry_point)"  :data-url="clip.entry_point"  v-for="clip in course_on" style="margin-bottom:40px;">
                    <img :src="clip.img" style="width:390px; height:227px; float:left">
                     <div class="text_con" style="position:relative">
                         <div class="clip_ttl">{{clip.title}}</div>
                         <div class="clip_sub">{{clip.sub}}</div>
                         <div class="hr"></div>
                         <span class="clip_user"></span>
                         <div class="bottom_text"> {{clip.dur}} | {{clip.date}}</div>
                         <div data-target="course" class="heart_course heart  heart_con"  :data-id="clip.id"><img src="/static/img/like_d.png"></div>         
                     </div>
                  
                 </div>
            </div>
            </div>
        
           </div>
             <div id="channel3">

            <div class="channel_con">
            <div class="channel_3_ttl" v-on:click="test">패스</div>
            <div id="clip_list">
                 <div class="clip_seg_main"  v-on:click="go_data_url(clip.entry_point)"  :data-url="clip.entry_point" v-for="clip in path_on" style="margin-bottom:56px;">
                     <img :src="clip.img" style="width:390px; height:227px; float:left">
                     <div class="text_con" style="position:relative">
                         <div class="clip_ttl">{{clip.title}}</div>
                         <div class="clip_sub">{{clip.sub}}</div>
                         <div class="hr"></div>
                         <span class="clip_user"></span>
                         <div class="bottom_text"> {{clip.dur}} | {{clip.date}}</div>
                         <div data-target="path" :data-id="clip.id" class="heart_path heart heart_con"><img src="/static/img/like_d.png"></div>
                     </div>
                   
                 </div>
            </div>
            </div>
        
           </div>
        </div>
        <div id="footer"></div>
        <test2></test2>
    </div>
</template>

<script>
import AppHeader from "@/components/Common/Header.vue"
import CardWithPoster from "@/components/Common/CardWithPoster.vue"
import CardWithoutPoster from "@/components/Common/CardWithoutPoster.vue"
import StartupCard from "@/components/Startup/StartupCard.vue"
import { throws } from 'assert';

var masonry
export default {
    created(){
        this.getGrantList()
        this.getStartupList()
    },
    components: {
        AppHeader,
        CardWithPoster,
        CardWithoutPoster,
        StartupCard,
    },   
    methods: {
        go_filter_add:function(){
            if (localStorage.getItem("user") == "u") {
                    this.$router.push("/mypage/startup?filter=on")
                } else {
                    if (localStorage.getItem("user") == "m" || localStorage.getItem("user") == "ma") {
                        alert("매니저나 기관관리자는 필터 등록을 할 수 없습니다.")
                    } else {
                        alert("로그인을 진행해주세요.")
                    }
                }
        },
        go_login:function(){
            this.$router.push("/login")
        },
        getStartupList:function(){
            this.$http.get(`/vue_get_startup_list_sample/`)
            .then(res=>{                
                this.startupList= res.data
            })
        },
        getPathList:function(){
            this.$http.post(`/vue_sample_path_path/`, {   "id": localStorage.getItem("id") }).then((res)=>{
                this.pathList = res.data.slice()
            })
        },
        getCourseList:function(){
            this.$http.post(`/vue_sample_course_path/`, {   "id": localStorage.getItem("id") }).then((res)=>{
                this.courseList = res.data.slice()
            })
        },
        getClipList:function(){
            this.$http.post(`/vue_sample_list_clip/`, {   "id": localStorage.getItem("id") }).then((res)=>{
                this.clipList = res.data.slice()
            })
        },
        getGrantList:function(){
            this.$http.get(`/get_home_info/`)
            .then(res=>{
                console.log(res.data)
                this.grantList = res.data.sb_set.slice(0,3)
            })
        },       
        test() {
        },
        go_data_url(url) {
            this.$router.push(url)
        }
    },
    data: function() {
       return {
            startupList:[],
            grantList:[],
            clipList:[],
            clip_list: [],
            course_lis: [],
            path_list: [],
            clip_on: [],
            course_on: [],
            path_on: [],
            clip: [{
                    "entry_point": "/clip/123",
                    "id": 51,
                    "tag": "디자인 강의",
                    "user": "힘찬",
                    "img": "/static/img/clip_0.jpg",
                    "title": "AWS 기초",
                    "dur": "09:19",
                    "date": "2018-07-08",
                    "sub": "힘찬이의  aws 교실"
                },
                {
                    "entry_point": "/clip/18",
                    "id": 57,
                    "tag": "개발",
                    "user": "AWS 에반젤리스트",
                    "img": "/static/img/clip_1.jpg",
                    "title": "AWS 스케일 확장",
                    "dur": "08:19",
                    "date": "2018-06-08",
                    "sub": "AWS 에반젤리스트"
                },
                {
                    "entry_point": "/clip/124",
                    "id": 53,
                    "tag": "기획 실무",
                    "user": "AWS 에반젤리스트",
                    "img": "/static/img/clip_3.jpg",
                    "title": "사용례로 알아보는 AWS",
                    "dur": "20:19",
                    "date": "2018-08-08",
                    "sub": "AWS 에반젤리스트"
                },
            ],
            course: [{
                    "entry_point": "/course/view/4/8",
                    "id": 1,
                    "tag": "프론트 엔드",
                    "user": "AWS 에반젤리스트",
                    "img": "/static/img/clip_4.jpg",
                    "title": "AWS 로드밸런서",
                    "dur": "39:19",
                    "date": "2018-07-08",
                    "sub": "AWS 에반젤리스트"
                },
                {
                    "entry_point": "/course/view/3/7",
                    "id": 2,
                    "tag": "회계",
                    "user": "AWS 에반젤리스트",
                    "img": "/static/img/clip_4.jpg",
                    "title": "AWS 로드밸런서 2",
                    "dur": "08:59",
                    "date": "2018-06-08",
                    "sub": "AWS 에반젤리스트"
                },
                {
                    "entry_point": "/course/view/6/21",
                    "id": 7,
                    "user": "AWS 에반젤리스트",
                    "img": "/static/img/clip_5.jpg",
                    "title": "AWS VS AZURE",
                    "dur": "60:19",
                    "date": "2018-08-08",
                    "sub": "AWS 에반젤리스트"
                },
            ],
            path: [{
                    "entry_point": "/path/view/10/6/18",
                    "id": 7,
                    "tag": "세무",
                    "user": "AWS 에반젤리스트",
                    "img": "/static/img/clip_6.jpg",
                    "title": "AWS 하루만에 배우는 워드프레스",
                    "dur": "39:19",
                    "date": "2018-07-08",
                    "sub": "AWS 에반젤리스트"
                },
                {
                    "entry_point": "/path/view/10/6/19",
                    "id": 12,
                    "tag": "데이터 사이언스",
                    "user": "AWS 에반젤리스트",
                    "img": "/static/img/clip_7.jpg",
                    "title": "서버리스 안드로이드 앱",
                    "dur": "08:59",
                    "date": "2018-06-08",
                    "sub": "AWS 에반젤리스트"
                },
                {
                    "entry_point": "/path/view/10/6/20",
                    "id": 1,
                    "tag": "법-노무",
                    "user": "AWS 에반젤리스트",
                    "img": "/static/img/clip_8.jpg",
                    "title": "Android 기초",
                    "dur": "60:19",
                    "date": "2018-08-08",
                    "sub": "AWS 에반젤리스트"
                },
            ]
        }
    },
    mounted: function() {
        // 메인화면 이니시에이션      
        var vue_obj = this
        vue_obj.utils.check_fav(vue_obj)
        vue_obj.clip_on = vue_obj.clip.slice()
        vue_obj.course_on = vue_obj.course.slice()
        vue_obj.path_on = vue_obj.path.slice()          
          
    },
    computed:{
        is_not_logined:function(){            
            return ( localStorage.getItem("login") == "true" )? false :true
        },
    },
}
</script>
<style scoped>
.add_filter_btn{
    width: 174px;
    height: 40px;
    border-radius: 31.5px;
    background-color: #1b49f4;
    display: inline-block;
    line-height: 40px;
    cursor: pointer;
    color: #fff;
    padding-left:23px;
    margin-top:-9px;
    margin-left:16px;
}

#intro_reg_con>.big{
    padding-top:82px;
    line-height: 1.31;
    letter-spacing: -1.5px;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); 
    text-align:center;
    width:528px;
    margin-left:349px;
    font-size:32px;
    color:#fff
}

#reg_btn{
    width: 103px;
    height: 40px;
    background-color: #ffffff;
    text-align: center;
    margin-top: 51px;
    margin-left:558px;
    border:1px solid #1b49f4;
    color:#1b49f4;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    line-height: 40px;
    letter-spacing: -0.1px;
    border-radius:30px;
}

.small{
 width: 560px;
  height: 26px;
  font-family: NotoSansCJKkr;
  font-size: 17px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.65;
  letter-spacing: -0.3px;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    margin-left:349px;
  margin-top:12px;
}


.heart_con{
    position: absolute;
    right: 23px;
    bottom:49px;
}
#footer{
    clear: both;
     width: 100%;
  height: 109px;
  background-color: #1a2f53;
}
.channel_3_ttl{
    padding-top:40px;
    font-size: 17px;
    font-weight: bold;
    line-height: 1.65;
    letter-spacing: -0.3px;
    color: #1a2f53;
    clear: both;
    margin-bottom:25px;
}
#channel2{

    height: 543px;;
    clear:both;
 
}
#channel3{
    background-color :#edf3ff;

    height: auto;
    clear:both;
    height: 540px;;
   
}

.channel_con{
    width:1224px;
    margin:0px auto;
}

.clip_seg_main:hover{
    cursor: pointer;
    box-shadow: 0 2px 4px -1px rgba(206, 212, 218, 0.5), 
    0 0 10px 4px rgba(34, 86, 184, 0.19),
     0 -2px 5px 0 rgba(79, 84, 120,0.26);
}
.heart{
    position: absolute; 
    top:23px;
    right:23px;
}
.clip_user{
    position: absolute;
    top:105px;
    left: 24px;
}
.bottom_text{
    height: 22px;
    opacity: 0.7;
    font-size: 12px;
    line-height: 1.83; 
    color: #1a2a53;
    position: absolute;
    left:24px;
    top:127px;
}

#channel_2_ttl{
    font-size: 17px;
    font-weight: bold;
    line-height: 1.65;
    letter-spacing: -0.3px;
    color: #1a2f53;
    clear: both;
    padding-top:19px;
    margin-bottom:25px;
}
.clip_sub{
    opacity: 0.8;
    font-size: 14px;
    line-height: 1.86;
    letter-spacing: -0.1px;
    color: #1a2a53;
    top:52px;
    left:24px;
    position: absolute;
}
.clip_ttl{
    font-size: 17px;
    font-weight: bold;
    line-height: 1.65;
    letter-spacing: -0.3px;
    color: #1a2f53;
    position: absolute;
    top:16px;
    left:24px;
}
.hr{
    width: 344px;
    height: 1px;
    border-bottom: solid 1px #e7edfc;
    position: absolute;
    top:46px;
    left:24px;
    }
.heart{
    position: absolute;
}
#clip_list{
    clear: both;
}
.text_con{
    background-color: #ffffff;
    border: solid 1px #e7edfc;
    height:181px;
    float: left;
    width:390px;
}
.clip_seg_main>img{
    width: 392px;
    height: 255px;
    background-color: #ffffff;
    border: solid 1px #e7edfc;
    float: left;
    cursor: pointer;
}
.clip_seg_main{
    position: relative;
    width: 392px;
    height:409px;
    float: left;
    margin-right:24px;
    cursor: pointer;
}
.clip_seg_main:nth-child(3){
    margin-right: 0px;
}

#channel{
    width:1224px;;
  
}
#channel_con{
    width:1224px; 
    height: 597px;;
    margin:0px auto;
    position: relative;
    overflow: -webkit-paged-y;
}
#channel{
    widows: 100% ;
    background-color:#fff;
    position: relative;
}

#channel_ttl{
    font-size: 24px;
    letter-spacing: -0.6px;
    color: #1a2f53;
    float: left;
    margin-top:32px;
}
#more_channel{
    float:right;
    opacity: 0.8;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.86;
    letter-spacing: -0.1px;
    text-align: right;
    color: #1b49f4;
    margin-top:29px;
    cursor: pointer;
}
#channel{
    width:100%;
    background-color: #fff;
}
#startup_list{
    width:1224px;
    clear: both;

}
#startup_ttl{
    font-size: 24px;
    line-height: 1.67;
    letter-spacing: -0.6px;
    color: #1a2f53;
    padding-top:40px;
    margin-bottom:16px;
    float: left;
}

#startup{
    margin: 0px auto;
    width:1224px;
    overflow: hidden;
}


#add_filter_con{
    position: relative;
    clear: both;
     width: 1224px;
  height: 127px;
  background-color: #c1d1f7;
}
#add_filter_con>span{
    position: absolute;
    top:28px;
    left:412px;
    font-size: 17px;
    line-height: 1.65;
    letter-spacing: -0.3px;
    color: #1a2f53;
}


#add_filter{
    position:relative;
    width: 1224px;
    height: 127px;
    background-color: #c1d1f7;
}
.gr_list:nth-child(3n){
    margin-right:0px;
}
.gr_list{
    margin-right: 24px;
    margin-bottom:24px;
}

#grant_list{
    width:100%;
    height:auto;
    clear: both;
    padding-top:16px;
}

#grant_pane{
    width:100%;
    background-color: rgba(26,47,83,1);
    height:588px;
}
#grant_con{
    width: 1224px;
    margin: 0px auto;
}
#grant_ttl{
    font-size: 24px;
    line-height: 1.67;
    letter-spacing: -0.6px;
    color: #1a2f53;
    margin-top:48px;
    float: left;
}
#more_grant,#more_startup{
    float:right;
    margin-top:55px;
    opacity: 0.8; 
    font-size: 14px;
    font-weight: bold;
    line-height: 1.86;
    letter-spacing: -0.1px;
    color: #1b49f4;
    cursor: pointer;
}
u{
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
}
</style>

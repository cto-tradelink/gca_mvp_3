<template>
    <div class="course-segment" >
        <img :src="clip.img">
            <div class="text_con" style="position:relative">
            <div class="clip_ttl">{{clip.title}}</div>
            <div class="clip_sub">{{clip.sub}}</div>
            <div class="hr"></div>
            <span class="clip_user"></span>
            <div class="bottom_text"> {{clip.dur}} | {{clip.date}}</div>
            <div data-target="course" class="heart_course heart heart_con"  :data-id="clip.id"><img src="/static/img/like_d.png"></div>         
        </div>
                  
    </div>
</template>

<script>
export default {
    props:{
        clip:{
            type:Object,
            // default:{
            //     img:null,
            //     title:"",
            // }
        },
    }
}
</script>
<style scoped lang="scss">
.course-segment{

    position: relative;
    width: 392px;
    height:409px;
    float: left;
    margin-right:24px;
    cursor: pointer;


    &:hover{
    cursor: pointer;
    box-shadow: 0 2px 4px -1px rgba(206, 212, 218, 0.5), 
    0 0 10px 4px rgba(34, 86, 184, 0.19),
    0 -2px 5px 0 rgba(79, 84, 120,0.26);
    }

    img{
        width:390px;
        height:227px; 
        float:left;
        width: 392px;
        height: 255px;
        background-color: #ffffff;
        border: solid 1px #e7edfc;
        float: left;
        cursor: pointer;
    }  
    .text_con{
    background-color: #ffffff;
    border: solid 1px #e7edfc;
    height:181px;
    float: left;
    width:390px;
    
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
}

</style>

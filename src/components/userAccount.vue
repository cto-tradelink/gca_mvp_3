<template>
     <div>
     <Header></Header>
     <FilterSetting></FilterSetting>
     <div >
     <PicProfile></PicProfile>
     <DetailProfile></DetailProfile>
     </div>
     </div>
</template>

<1cript>
import Header from "./Common/Header.vue"
import FilterSetting from "./Common/FilterSetting.vue"
import PicProfile from "./PicProfile.vue"
import DetailProfile from "./DetailProfile.vue"

export default {
    components:{
        Header,
        FilterSetting,
        PicProfile,DetailProfile
    }
 
}
</script>

<style>

</style>

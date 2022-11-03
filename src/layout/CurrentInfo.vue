<template>
    <div class="app-current-info">
        <InfoPanel/>
    </div>
</template>
<script>
import InfoPanel from '../components/InfoPanel'
export default {
    components:{
        InfoPanel
    }
}
</script>

<style lang="scss" scoped>
.app-current-info {
    position: sticky;
    height: 100vh;
    top: 0;
    
    flex:none;
    overflow: auto;
    padding: 0 0 0 0 ;
}
</style>
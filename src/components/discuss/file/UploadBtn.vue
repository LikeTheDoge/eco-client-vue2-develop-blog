<template>
    <div class="btn">
       <label>
           <a-icon type="upload"></a-icon>
           <input style="display:none" type="file" @change="change">
       </label>
    </div>
</template>

<script>
export default {
    methods:{
        change(e){
            if(e && e.target && e.target.files[0]){
                this.$emit('upload',e.target.files[0])
                e.target.value = ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.btn{
    float: left;
    height: 56px;
    line-height: 36px;
    font-size: 18px;
    width: 50px;
    padding: 10px 0 10px 14px;
    cursor: pointer;
    > *{
        
    cursor: pointer;
    }
    &:hover{
        opacity: 0.8;
    }
}
</style>
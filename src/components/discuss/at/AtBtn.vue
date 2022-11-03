<template>
    <div class="btn">
       <label style="transform:translateY(-2px)" @click="change">
           @
       </label>
    </div>
</template>

<script>
export default {
    methods:{
        change(e){
            this.$emit('at')
        }
    }
}
</script>

<style lang="scss" scoped>
.btn{
    float: left;
    height: 56px;
    line-height: 34px;
    font-size: 18px;
    width: 50px;
    padding: 10px 0 10px 0px;
    cursor: pointer;
    > *{
        
    cursor: pointer;
    font-weight: bold;
    }
    &:hover{
        opacity: 0.8;
    }
}
</style>
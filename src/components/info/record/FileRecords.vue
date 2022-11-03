<template>
    <div :class="{'file-records':true,detail}">
        <div class="file-records-title">
            <div>属性修改记录</div>
        </div>
        <div class="file-records-detail" ref="detail">
            <SelfRecordItem
                :focus="!detail"
                v-for="v in list"
                :key="v"
            />
        </div>
        <div
            @click="toggel"
            class="file-records-extend"
        >
            <e-icon
                family="i_base"
                name="logout-variant"
            ></e-icon>
        </div>
    </div>
</template>
<script>
import SelfRecordItem from "./item/SelfRecordItem.vue";
export default {
    components: { SelfRecordItem },
    data() {
        return {
            detail: false,
            list: new Array(20).fill(null).map(() => Math.random()),
        };
    },
    methods: {
        toggel() {
            this.detail = !this.detail;
        },
    },
    watch:{
      detail(){
        if(this.detail === false){
          this.$refs.detail.scrollTo({top:0,behavior: 'smooth'})
        }
      }
    }
};
</script>
<style lang="scss" scoped>
.file-records {
    height: 124px;
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    overflow: hidden;
    margin-bottom: 32px;
    transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);
    &.detail {
        height: 480px;

        .file-records-detail {
            overflow: auto;
        }
        .file-records-extend {
            margin-top: 8px;
        }
    }
    .file-records-title {
        flex: none;
        font-size: 12px;
        margin-bottom: 10px;
    }
    .file-records-extend {
        height: 24px;
        margin-top: 0;
        background: #eee;
        border-radius: 12px;
        text-align: center;
    }
    .file-records-detail {
        overflow: hidden;
        flex: auto;
        padding-bottom: 24px;
        transition: all 0.6s cubic-bezier(0.17, 0.67, 0.36, 0.99);
        &::-webkit-scrollbar-track {
            background-color: #f5f5f5;
        }

        &::-webkit-scrollbar {
            width: 2px;
            background-color: #f5f5f5;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 1px;
            background-color: var(--color-gray-light);
        }
    }
}
</style>
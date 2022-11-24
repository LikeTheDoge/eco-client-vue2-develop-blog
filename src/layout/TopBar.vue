<template>
    <div :class="{'top-header':true,hidden:!page}">
        <div class="top-header-inner">
            <div class="top-header-bar">
                <div class="top-header-path">
                    
                <router-link
                    to="/"
                >{{path}}</router-link>

                </div>
                <!-- <GlobalSearch /> -->
            </div>
            <div class="top-header-title">
                {{title}}
                <a @click="edit" 
                    class="edit-btn"
                >
                    <EIcon
                        family="i_base"
                        name="upload"
                        :size="20"
                    ></EIcon>
                </a>

            </div>
        </div>

    </div>
</template>

<script>
import GlobalSearch from "../components/GlobalSearch.vue";
import { pageEvent } from "../eventbus/page";
export default {
    data() {
        return { 
            fileId:'',
            title: "", 
            page: null, 
            path: "" , 
            tags:[]
        };
    },
    components: { GlobalSearch },
    methods:{
        edit(){
            if(!this.fileId)return 
            window.open(`/text-editor/markdown/${this.fileId}`,'_blank')
        }
    },
    mounted() {
        pageEvent.$on("update", (page) => {
            this.page = page;
            if (this.page) {
                this.title = page.remark.split(' | ')[0];
                this.path = page.path
                this.fileId = page.fileId
            }else{
                this.fileId = this.title = this.path = ''
                this.tags = []
            }
        });
    },
};
</script>

<style lang="scss" scoped>
.top-header {
    margin-top: 54px;
    margin-bottom: 24px;
    z-index: 10;

    padding: 0 48px;
    transition: all 0.3s ease;
    overflow: hidden;

    .top-header-bar {
        display: flex;
        width: 100%;
        align-items: center;
    }
    .top-header-path {
        flex: auto;
    }
    &.hidden {
        margin-top: 0;
        margin-bottom: 0;
        height: 0;
    }

    .top-header-title {
        font-size: 28px;
        margin: 6px 0 0 0;
        font-weight: bolder;
        color: #000;
        .edit-btn {
            display: inline-block;
            width: 0;
            line-height: 1;
            margin-left: 0;
            overflow: hidden;
            text-align: center;
            transition: all 0.3s ease;
        }

        &:hover .edit-btn {
            width: 26px;
        }
    }
    .top-header-search {
        width: 200px;
        flex: none;
    }
}
</style>
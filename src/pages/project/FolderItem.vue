<template>
    <div :class="{'folder-item':true}">
        <e-file-icon
            :type="'folder'"
            size="48"
        />
        <div class="folder-name">
            {{info.name}}
        </div>
        <div :class="{'upload-bg':true,showTip}"></div>
        <div :class="{'active-bg':true,active}"></div>
    </div>
</template>

<script>
import { FolderInfo } from "../../models/base";
export default {
    props: {
        info: { default: () => new FolderInfo() },
        active: { default: false },
        showTip: { default: false },
    },
};
</script>


<style lang="scss" scoped>
.folder-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    height: 100%;
    cursor: pointer;

    .upload-bg {
        opacity: 0;
        position: absolute;
        z-index: -1;
        left: 0px;
        right: 0px;
        top: 0;
        bottom: 0px;
        border: 1px solid #000;
        background: #666;
        transition: all 0.3s ease;
        border-radius: 16px;
    }
    .showTip.upload-bg {
        opacity: 0.07;
    }

    .active-bg {
        opacity: 0;
        position: absolute;
        z-index: -1;
        left: 0px;
        right: 0px;
        top: 0;
        bottom: 0px;
        border: 1px solid rgb(3, 171, 255);
        background: #6cf;
        transition: all 0.3s ease;
        border-radius: 16px;
    }
    .active.active-bg {
        opacity: 0.1;
    }

    &:hover {
        opacity: 0.8;
    }
    .folder-name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }
}
</style>
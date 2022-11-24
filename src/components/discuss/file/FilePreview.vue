<template>
    <div class="file-previewer">
        <div class="actions">

            <div
                class="btn"
                v-if="file.isPic"
                @click="preview"
            >
                <a-icon type="eye"></a-icon>
            </div>
            <div
                class="btn"
                @click="download"
            >
                <a-icon type="download"></a-icon>
            </div>
        </div>
        <div class="icon">
            <div
                class="image-icon"
                v-if="file.isPic"
                :style="{backgroundImage:`url(${file.downloadUrl})`}"
            ></div>
            <a-icon
                type="file"
                v-else
                class="file-icon"
            ></a-icon>
        </div>
        <div class="file-name">{{file.fileName}}</div>
    </div>
</template>

<script>
export default {
  props: ['file'],
  methods: {
    download () {
      window.open(this.file.downloadUrl)
    },
    preview () {
    //   this.$imagePreview({
    //     initIndex: 0,
    //     isEnableImagePageIndicator:false,
    //     zIndex:999999,
    //     images: [this.file.downloadUrl]
    //   })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.file-previewer {
    float: left;
    width: 72px;
    margin-right: 6px;
    margin-top: 6px;
    height: 76px;
    position: relative;
    overflow: hidden;

    .actions {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 6px;
        // transform: translateY(-100%);
        transition: all 0.2s ease-out;
        opacity: 0;

        .btn {
            cursor: pointer;
            height: 32px;
            width: 28px;
            color: #fff;
            font-size: 18px;
            text-align: center;
            line-height: 32px;
        }

        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
    }

    &:hover .actions {
        transform: translateY(0);
        opacity: 1;
    }

    .icon {
        width: 100%;
        height: 54px;
        font-size: 32px;
        text-align: center;
        padding: 2px;
        border: 1px solid #eee;
        border-radius: 6px;

        > .file-icon {
            margin: 8px 0;
        }

        .image-icon {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            background-size: cover;
        }
    }

    .file-name {
        height: 22px;
        line-height: 22px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        text-align: center;
    }
}
</style>
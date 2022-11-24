<template>
    <div
        class="file-list"
        :style="{height:28 * list.length + 'px'}"
    >
        <flex-row
            :class="{file:true,[v.status]:true}"
            v-for="v in list"
            :key="v.file.fileId"
        >
            <flex-fixed v-if="v.status=='uploading'">
                <a-icon
                    type="loading"
                    style="margin-right:12px"
                ></a-icon>
            </flex-fixed>
            <flex-fill style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
              <div  style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" :title="v.file.fileName">{{v.file.fileName}}</div>
            </flex-fill>
            <flex-fixed>
                <a-button
                    @click="remove(v)"
                    type='link'
                    style="height:28px;line-height:28px"
                    icon="delete"
                ></a-button>
            </flex-fixed>
        </flex-row>
    </div>
</template>

<script>
// import { model } from 'eco-env-tool'
// import { uploadFile } from '../../request/discuss'
// const { File } = model

export default {
  props: ['list', 'dataId','uploadFile'],
  methods: {
    remove (val) {
      this.$emit(
        'update:list',
        this.list.filter((v) => v !== val)
      )
    },
    $$upload (file) {
      const isTooLarge = file.size / 1024 / 1024 > 30;
      if (isTooLarge) {
        return  this.$message.error(`单个附件不能超过30MB!`);
      }
      
      const uploadfile = { fileId: Math.random(), fileName: file.name }
      this.$emit(
        'update:list',
        this.list.concat([
          {
            file: uploadfile,
            status: 'uploading'
          }
        ])
      )
      this.uploadFile(file)
        .then((doneFile) => {
          this.$emit(
            'update:list',
            this.list.map((v) =>
              v.file === uploadfile
                ? {
                  file: doneFile,
                  status: 'done'
                }
                : v
            )
          )
        })
        .catch((e) => {
          this.$message.error('上传失败：' + e.message)
          this.$emit(
            'update:list',
            this.list
              .map((v) => (v.file === uploadfile ? null : v))
              .filter((v) => !!v)
          )
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.file-list {
    transition: all 0.3s ease;
}
.file {
    height: 28px;
    line-height: 28px;
    padding: 0 16px;
    transition: all 0.3s ease;
    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
}
</style>
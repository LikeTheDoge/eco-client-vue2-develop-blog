<template>
    <div
        ref="userlist"
        :style="{
        bottom:bottom+'px',
        left:left+'px',
        display:visible ? 'block':'none'
    }"
        class="at-selecor"
    >
        <flex-row
            class="user-item"
            v-for="(v,i) in list"
            :key="v.uid"
            :class="{user:true,current:i === currentIdx}"
            @mouseover.native="()=>currentIdx = i"
            @click.native="()=>submit(v)"
        >
            <div class="ava">

                <UserAvatar
                    :size="32"
                    :url="v.avatarUrl"
                >
                </UserAvatar>
            </div>

            <flex-fill>
                <div class="username">{{v.nickname}}</div>
                <div class="nickname">{{v.account}}</div>
            </flex-fill>
        </flex-row>

        <div v-if="!list.length" style="text-align:center;padding:12px 0;color:#666">没有找到对应用户</div>
    </div>
</template>

<script>
export default {
  props:['searchAt'],

  data () {
    return {
      visible: false,
      left: 0,
      bottom: 0,
      list: [],
      target: null,
      currentIdx: 0
    }
  },

  watch: {
    async currentIdx () {
      await this.$nextTick()

      if (!this.visible) return

      const curEle =
        this.$refs.userlist.querySelectorAll('.user-item')[this.currentIdx]

      if (!curEle) return

      const scrollMax = curEle.offsetTop
      const scrollMin =
        curEle.offsetTop -
        this.$refs.userlist.clientHeight +
        curEle.clientHeight

      if (this.$refs.userlist.scrollTop < scrollMin) {
        return this.$refs.userlist.scrollTo({
          top: scrollMin,
          behavior: 'smooth'
        })
      }
      if (this.$refs.userlist.scrollTop > scrollMax) {
        return this.$refs.userlist.scrollTo({
          top: scrollMax,
          behavior: 'smooth'
        })
      }
    }
  },

  methods: {
    $$open (target, pos) {
      if (this.target && target.text === this.target.text && this.visible) {
        this.target = target
        return
      }

      const maxLeft = window.innerWidth - 280
      this.target = target
      const { bottom, left } = pos
      this.bottom = window.innerHeight - bottom + 20
      this.left = left > maxLeft ? maxLeft : left
      this.visible = true
      this.searchAt(
          target.text
      ).then((list) => {
        this.list = list
        this.currentIdx = 0
      })
    },

    $$close () {
      this.visible = false
    },

    submit (val) {
      const value = val || this.list[this.currentIdx]
      this.$emit('submit', { target: this.target, user: value })
      this.visible = false
    },

    $$isOpen () {
      return this.visible
    },
    $$next () {
      const lastIdx = this.list.length - 1
      this.currentIdx =
        this.currentIdx < lastIdx ? this.currentIdx + 1 : lastIdx
    },
    $$above () {
      this.currentIdx = this.currentIdx > 0 ? this.currentIdx - 1 : 0
    },
    $$enter () {
      this.submit()
    },
    $$esc () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.at-selecor {
    position: fixed;
    max-height: 300px;
    width: 240px;
    z-index: 1002;
    overflow: auto;
    padding: 4px 0;
    background: #fff;
    box-shadow: 0px 2px 6px 2px rgb(0, 0, 0, 0.1);
}

.user {
    padding: 8px 8px;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s ease-out;

    &.current {
        background: #eee;
    }
}

.nickname {
    opacity: 0.6;
}

.ava {
    padding: 7px 2px;
}
</style>
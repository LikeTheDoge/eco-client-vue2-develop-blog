const scan = (value) => {
    let idx = 0
    let begin = -1

    const atList = []
    const breakWord = /\s/

    // 根据 @ 和 /\s/ 分词
    while (idx < value.length) {
        const val = value[idx]

        // 未匹配模式
        if (begin < 0) {
            if (val === '@') begin = idx
        } else

        // 匹配模式
        {
            if (breakWord.test(val)) {
                atList.push({ begin, end: idx - 1, text: value.substring(begin + 1, idx) })
                begin = -1
            }
        }
        idx++
    }

    // 判断结尾是否有 @
    if (begin >= 0) {
        atList.push({ begin, end: idx, text: value.substring(begin + 1) })
    }

    return atList
}

const hit = (value, idx) => {
    const list = scan(value)
    const target = list.find(({ begin, end }) => (begin <= idx) && (end >= (idx - 1)))
    return target
}

let delayTimeout = null
const delay = (fn) => () => {
    if (delayTimeout) {
        clearTimeout(delayTimeout)
    }

    delayTimeout = setTimeout(() => {
        fn()
        delayTimeout = null
    }, 300)
}


export class TextareaWithAt {
    static toJson(list, users) {
        return list.flatMap(v => {
            if (typeof v === 'string') {

                const value = v
                let idx = 0
                let begin = -1
                let list = []
                const breakWord = /\s/

                let currentText = ''

                const clearCurrent = (isPush = true) => {

                    if (isPush) {
                        list.push(currentText)
                    }
                    let c = currentText
                    currentText = ''
                    return c
                }

                // 根据 @ 和 /\s/ 分词
                while (idx < value.length) {
                    const val = value[idx]

                    if (begin < 0) {
                        // 未匹配模式
                        if (val === '@') {
                            clearCurrent()
                            begin = idx
                        }

                    } else {
                        // 匹配模式
                        if (breakWord.test(val)) {
                            // atList.push({ begin, end: idx - 1, text: value.substring(begin + 1, idx) })


                            list.push({
                                type: '@',
                                nickname: value.substring(begin + 1, idx),
                                text: clearCurrent(false)
                            })

                            begin = -1
                        }
                    }

                    currentText += val

                    idx++
                }

                // 判断结尾是否有 @
                if (begin >= 0) {
                    list.push({
                        type: '@',
                        nickname: value.substring(begin + 1),
                        text: clearCurrent(false)
                    })
                } else {
                    clearCurrent()
                }


                list = list.map(v => {
                    if (typeof v === 'string') {
                        return v
                    } else if (v.type === '@') {
                        const uname = v.nickname
                        const user = users.find(v => v.nickname === uname)

                        if (user) return v
                        else return v.text
                    }
                })

                return list
            } else {
                return [v]
            }
        })
    }


    el = null
    el_copy = null

    onhit = (...argus) => { console.log(argus) }
    unhit = (...argus) => { console.log(argus) }

    install(el, el_copy) {
        this.el = el
        this.el_copy = el_copy
        this.el.oninput = this.el.onclick = delay(() => {
            this.el_copy.scrollTop = this.el.scrollTop

            const sIdx = this.el.selectionStart
            const eIdx = this.el.selectionEnd

            if (sIdx !== eIdx) return

            const target = hit(this.el.value, sIdx)

            console.log('target', target)

            if (target) {

                let range = new Range()
                range.setStart(this.el_copy.childNodes[0], target.begin)
                range.setStart(this.el_copy.childNodes[0], target.begin)

                const pos = range.getBoundingClientRect()

                this.onhit(target, pos)
            } else {
                this.unhit()
            }
        })
    }

    createAt() {
        this.el_copy.scrollTop = this.el.scrollTop

        const sIdx = this.el.selectionStart
        const eIdx = this.el.selectionEnd

        if (sIdx !== eIdx) return

        const target = hit(this.el.value, sIdx)

        console.log('target', target)

        if (target) {

            let range = new Range()
            range.setStart(this.el_copy.childNodes[0], target.begin)
            range.setStart(this.el_copy.childNodes[0], target.begin)

            const pos = range.getBoundingClientRect()

            this.onhit(target, pos)

            return true
        } else {
            this.unhit()

            return false
        }
    }

    filterUsers(list = []) {
        const atlist = scan(this.el.value)
        return list.filter(s => atlist.find(v => v.text === s.nickname))
    }
}
export class IdxDBOption {
    name = "file-manage"
    version = 1
    cols = []
    requset = null
    db = null
    open() {
        return new Promise((res, rej) => {
            this.requset = window.indexedDB.open(this.name, this.version);
            this.requset.onerror = (evt) => {
                // this.error(evt)
                throw evt
                rej('db error')
            }
            this.requset.onsuccess = () => {
                console.log('onsuccess')
                this.db = this.requset.result
                res(this)
            };
            this.requset.onupgradeneeded = (event) => {
                console.log('onupgradeneeded')
                var db = event.target.result;
                var transaction = event.target.transaction
                this.cols.forEach(v => { v.update(db, transaction) })
            };
        })
    }
}

export class IdxDBColumn {
    name = 'name'
    option = {}

    data = () => new Array(5000).fill('val').map((n, i) => `${n}-${i}`)
    update(db, transaction) {
        let old = []
        const create_store = () => {
            console.log('update')
            const store = db.createObjectStore(this.name, this.option)
            const upper = store.transaction.oncomplete


            store.transaction.oncomplete = (...argus) => {
                if (upper) upper.apply(null, argus)
                const data = this.data(old)
                console.log(data)
                const transaction = db.transaction(this.name, "readwrite")
                const store = transaction.objectStore(this.name);
                data.forEach((item) => {
                    console.log('add item')
                    store.add(item)
                });
                transaction.oncomplete = () => {
                    console.log('add item oncomplete')
                }
            };
        }
        if (db.objectStoreNames.contains(this.name)) {
            console.log('blank')
            const store = transaction.objectStore(this.name);
            store.getAll().onsuccess = (event) => {
                console.log('get item complete')
                old = event.target.result
                console.log(old)
                db.deleteObjectStore(this.name)
                create_store()
            }

        } else {
            console.log('init')
            create_store()
        }

    }
}
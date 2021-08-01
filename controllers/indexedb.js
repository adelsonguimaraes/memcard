class indexeddb {
    constructor () {
        // window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        // window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
        // window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

        this.SUPPORT = (window.indexedDB);
        this.DBNAME = 'memcard';
        this.VERSION = 1;
        this.CON = null;
        this.DB = null;

        this.MODELS = this.models();
        this.open();
        this.createStories ();
    }

    open () {
        return new Promise((resolve, reject) => {
            this.CON = window.indexedDB.open(this.DBNAME, this.VERSION);
            this.CON.onsuccess = async e => {
                this.DB = e.target.result;
                console.log('o banco foi aberto com sucesso!', e.target.result);
                resolve(this.DB);
            };
            this.CON.onerror = e => {
                console.error('ocorreu um erro ao tentar abrir o banco de dados', e.target.errorCode);
                reject(e.target.error);
            };
        });
    }

    createStories () {
        this.CON.onupgradeneeded = e => {
            this.DB = e.target.result;
            this.MODELS.forEach(model => {
                const objetcStore = this.DB.createObjectStore(model.name, {keyPath: "id"});
                model.indexes.forEach(i => {
                    objetcStore.createIndex(i.description, i.index, {unique: i.unique});
                });
            });
        };
    }
    
    async getStore (store) {
        const DB = await this.open();
        const r = DB.transaction([store], "readwrite").objectStore(store);
        return r;
    }

    add (store, data) {
        return new Promise( async (resolve, reject) => {
            const transaction = await this.getStore(store);
            const request = await transaction.add(data);

            request.onsuccess = e => {
                resolve(e.target.result);
            };
            request.onerror = e => {
                console.error("Ocorreu um erro ao Adicionar", e.target.error);
                reject(e.target.error);
            };
        });
    }
    
    update (store, data) {
        return new Promise( async (resolve, reject) => {
            const transaction = await this.getStore(store);
            const request = await transaction.put(data);
            request.onsuccess = e => {
                resolve(e.target.result);
            };
            request.onerror = e => {
                console.error("Ocorreu um erro ao Atualizar", error);
                reject(e.target.error);
            };

        });
    }

    get (store, id) {
        return new Promise( async (resolve, reject) => {
            const transaction = await this.getStore(store);
            const request = await transaction.get(parseInt(id));
            
            request.onsuccess = e => {
                resolve(e.target.result);
            };
            request.onerror = e => {
                console.error("Ocorreu um erro no Get", e.target.error);
                reject(e.target.error);
            };
        });
    }

    getAll (store) {
        return new Promise( async (resolve, reject) => {
            const transaction = await this.getStore(store);
            const request = transaction.getAll();
            request.onsuccess = e => {
                resolve(e.target.result);
            };
            request.onerror = e => {
                console.error("Ocorreu um erro no GetAll", e.target.error);
                reject(e.target.error);
            };
        });
    }

    async getBy (store, by, value) {
        return new Promise ( async (resolve, reject) => {
            const transaction = await this.getStore(store);
            const index = await transaction.index(by);
            
            const request = await index.getAll(value);

            request.onsuccess = e => {
                resolve(e.target.result);
            };
            request.onerror = e => {
                console.error("Ocorreu um erro no GetBy", e.target.error);
                reject(e.target.error);
            };
        });
    }

    remove (store, id) {
        return new Promise( async (resolve, reject) => {
            const transaction = await this.getStore(store);
            const request = transaction.delete(parseInt(id));
            
            request.onsuccess = e => {
                resolve(e.target.result);
            };
            request.onerror = e => {
                console.error("Ocorreu um erro no GetAll", e.target.error);
                reject(e.target.error);
            };
        });
    }

    // modelos do banco de dados
    models () {
        return [
            {
                "name": "deck",
                "indexes": [
                    {"description":"id", "index": "id", "unique": true},
                    {"description":"nome", "index": "nome", "unique": false},
                    {"description":"nivel", "index": "nivel", "unique": false},
                    {"description":"data_cadastro", "index": "data_cadastro", "unique": false}
                ]
            },
            {
                "name": "card",
                "indexes": [
                    {"description":"id", "index": "id", "unique": true},
                    {"description":"iddeck", "index": "iddeck", "unique": false},
                    {"description":"frente", "index": "frente", "unique": false},
                    {"description":"verso", "index": "verso", "unique": false},
                    {"description":"nivel", "index": "nivel", "unique": false},
                    {"description":"data_cadastro", "index": "data_cadastro", "unique": false}
                ]
            }
        ];
    }
}
const INDEXEDDB = new indexeddb();
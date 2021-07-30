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
        this.CON = window.indexedDB.open('memcard', this.VERSION);
        this.CON.onsuccess = e => {
            this.DB = e.target.result;
            console.log('o banco foi aberto com sucesso!', e.target.result);
        };
        this.CON.onerror = e => {
            console.error('ocorreu um erro ao tentar abrir o banco de dados', e.target.errorCode);
        };
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
    
    getStore (store) {
        return this.DB.transaction([store], "readwrite").objectStore(store);
    }

    add (store, data) {
        this.CON = this.getStore(store).add(data);
        this.CON.onsuccess = e => {
            console.log("Adicionado o item com sucesso", data);
        };
        this.CON.onerror = e => {
            console.error("Ocorreu um erro ao Adicionar", error);
        };
    }
    
    update (store, data) {
        this.CON = this.getStore(store).put(data);
        this.CON.onsuccess = e => {
            console.log("Atualizado o item com sucesso", data);
        };
        this.CON.onerror = e => {
            console.error("Ocorreu um erro ao Atualizar", error);
        };
    }

    get (store, id) {
        this.CON = this.getStore(store).get(parseInt(id));
        this.CON.onsuccess = e => {
            return e.target.result;
        };
        this.CON.onerror = e => {
            console.error("Ocorreu um erro ao Getar", error);
        };
    }

    getAll (store) {
        this.CON = this.getStore(store).getAll();
        this.CON.onsuccess = e => {
            return e;
        };
        this.CON.onerror = e => {
            console.error("Ocorreu um erro no GetAll", error);
        };
        
    }

    remove (store, id) {
        this.CON = this.getStore(store).delete(parseInt(id));
        this.CON.onsuccess = e => {
            console.log('Removido com sucesso', id);
        };
        this.CON.onerror = e => {
            console.error("Ocorreu um erro ao remover", error);
        };
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
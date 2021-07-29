class indexedb {
    constructor () {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

        this.SUPPORT = (window.indexedDB);
        this.DBNAME = 'memcard';
        this.VERSION = 1;
        this.CON = null;

        this.STORE = store();

        this.open();
    }

    open () {
        this.CON = window.indexedDB.open('memcard', this.VERSION);
        this.CON.onsuccess(e => {
            console.log('o banco foi aberto com sucesso!', e.target.result);
        });
        this.CON.onerror(e => {
            console.error('ocorreu um erro ao tentar abrir o banco de dados', e.target.errorCode);
        });
    }

    upgrade (store) {
        this.CON.onupgradeneeded(e => {
            const DB = e.target.result;
            const objetcStore = DB.createObjectStore(store.name, {KeyPath: "id"});
            store.forEach(e => {
                objetcStore.createIndex(e.description, e.index, {unique: e.unique});
            });
        });
    }
    
    createStories () {
        this.STORE.forEach(e => {
            this.upgrade(e);
        });
    }
    
    store () {
        return [
            {
                "name": "decks",
                "indexes": [
                    {"description":"id", "index": "id", "unique": true},
                    {"description":"id", "index": "nome", "unique": false},
                    {"description":"id", "index": "datacadastro", "unique": false}
                ]
            },
            {
                "name": "card",
                "indexes": [
                    {"description":"id", "index": "id", "unique": true},
                    {"description":"id", "index": "iddeck", "unique": false},
                    {"description":"id", "index": "front", "unique": false},
                    {"description":"id", "index": "back", "unique": false},
                    {"description":"id", "index": "datacadastro", "unique": false}
                ]
            }
        ];
    }
}
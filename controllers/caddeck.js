class caddeck {
    constructor () {
        this.INPUT = document.querySelector('input');
        this.OBJ = null;
        this.getHash();
    }

    async getHash() {
        let id = window.location.hash.replace('#', '');
        if (id!==null) {
            this.OBJ = await INDEXEDDB.get('deck', id);
            this.INPUT.value = this.OBJ.name;
        }
    }

    cadastrar () {
        if (this.INPUT.value==='') alert("Prrencha um nome para cadastrar o deck!");
        
        const dt = new Date();
        const ano = dt.getFullYear();
        const mes = (dt.getMonth()+1<10) ? '0'+(dt.getMonth()+1) : dt.getDate()+1;
        const dia = (dt.getDate()<10) ? '0'+(dt.getDate()) : dt.getDate();

        // cadastrando o deck no indexedDB
        INDEXEDDB.add('deck', {
            id: dt.getTime(),
            name: this.INPUT.value,
            nivel: 1,
            data_cadastro: `${ano}-${mes}-${dia}`
        });

        // redirecionamento
        window.location.replace('./');
    }
}
const CADDECK = new caddeck();
class caddeck {
    constructor () {
        this.INPUT = document.querySelector('input');
        this.OBJ = null;
        this.reset();
        this.getHash();
    }

    reset () {
        this.OBJ = {
            id: null,
            name: null,
            data_cadastro: null
        };
    }

    async getHash() {
        // pegando id do deck do sessionStorage
        const id = sessionStorage.getItem('iddeck');
        
        // --- se o hash não for um numero válido
        if (isNaN(parseInt(id))) return false;

        // getando por id
        this.OBJ = await INDEXEDDB.get('deck', id);
        // se for undefined
        if (this.OBJ===undefined) return false;
        
        this.INPUT.value = this.OBJ.name;
    }

    async cadastrar () {
        if (this.INPUT.value==='') return alert("Prencha um nome para salvar o deck!");
        
        if (this.OBJ.id===null) {

            const dt = new Date();
            const ano = dt.getFullYear();
            const mes = (dt.getMonth()+1<10) ? '0'+(dt.getMonth()+1) : dt.getDate()+1;
            const dia = (dt.getDate()<10) ? '0'+(dt.getDate()) : dt.getDate();

            this.OBJ.id = dt.getTime();
            this.OBJ.name = this.INPUT.value;
            this.OBJ.nivel = 1;
            this.OBJ.data_cadastro = `${ano}-${mes}-${dia}`;

            // cadastrando o deck no indexedDB
            await INDEXEDDB.add('deck', this.OBJ);
        }else{
            
            this.OBJ.name = this.OBJ.name = this.INPUT.value;
            // cadastrando o deck no indexedDB
            await INDEXEDDB.update('deck', this.OBJ);
        }

        // redirecionamento
        window.location.replace('./');
    }
}
const CADDECK = new caddeck();
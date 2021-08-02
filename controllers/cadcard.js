class cadcard {
    constructor () {
        this.INPUT = document.querySelector('input');
        this.FRENTE = document.querySelector('textarea[name=frente]');
        this.VERSO = document.querySelector('textarea[name=verso]');
        this.OBJ = null;
        this.reset();
        this.getHash();
    }

    reset () {
        this.OBJ = {
            id: null,
            iddeck: null,
            frente: null,
            verso: null,
            nivel: null,
            data_cadastro: null
        };
    }

    async getHash() {
        // --- pegando hash da url
        const iddeck = parseInt(sessionStorage.getItem('iddeck'));
        const id = parseInt(sessionStorage.getItem('idcard'));
        
        // --- se o hash não for um numero válido
        if (isNaN(iddeck)) return window.location.replace('./');

        this.OBJ.iddeck = iddeck;
        
        // --- se não existir id no params
        if (isNaN(id)) return false;

        this.OBJ.id = id;

        // getando por id
        this.OBJ = await INDEXEDDB.get('card', this.OBJ.id);
        // se for undefined
        if (this.OBJ===undefined) {
            sessionStorage.removeItem('idcard');
            return this.reset();
        }

        this.FRENTE.value = this.OBJ.frente;
        this.VERSO.value = this.OBJ.verso;
    }

    async cadastrar () {
        if (this.FRENTE.value==='' || this.VERSO.value==='') return alert("Prencha os campos para salvar o card!");
        
        if (this.OBJ.id===null) {

            const dt = new Date();
            const ano = dt.getFullYear();
            const mes = (dt.getMonth()+1<10) ? '0'+(dt.getMonth()+1) : dt.getDate()+1;
            const dia = (dt.getDate()<10) ? '0'+(dt.getDate()) : dt.getDate();

            this.OBJ.id = dt.getTime();
            this.OBJ.frente = this.FRENTE.value;
            this.OBJ.verso = this.VERSO.value;
            this.OBJ.nivel = 1;
            this.OBJ.data_cadastro = `${ano}-${mes}-${dia}`;

            // cadastrando o deck no indexedDB
            await INDEXEDDB.add('card', this.OBJ);
        }else{
            
            this.OBJ.frente = this.FRENTE.value;
            this.OBJ.verso = this.VERSO.value;
            // cadastrando o deck no indexedDB
            await INDEXEDDB.update('card', this.OBJ);
        }

        // redirecionamento
        window.location.replace(`./card.html?iddeck=${this.OBJ.iddeck}`);
    }
}
const CADCARD = new cadcard();
class caddeck {
    constructor () {
        this.INPUT = document.querySelector('input');
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
    }
}
const CADDECK = new caddeck();
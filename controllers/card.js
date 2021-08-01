class card {
    constructor () {
        this.EL = document.querySelector('div.box ul');
        this.LISTA = [];
        this.IDDECK = null;
        this.getHash();
    }

    async getHash() {
        // --- pegando hash da url
        const params = new URLSearchParams(window.location.search);
        const iddeck = parseInt(params.get('iddeck'));
        
        // --- se o hash não for um numero válido
        if (isNaN(iddeck)) return window.location.replace('./');

        this.IDDECK = iddeck;

        // getando por id
        this.LISTA = await INDEXEDDB.getBy('card', 'iddeck', iddeck);
        // se for undefined
        if (this.LISTA.length<=0) return false;
        
        this.mount();
    }

    mount () {
        let string = '';
        for (const e of this.LISTA) {

            // lógica nível
            let nivel = '';
            if (e.nivel === 1) {
                nivel += `
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o"></i>
                    <i class="fa fa-star-o"></i>
                `;
            }else if (e.nivel === 2) {
                nivel = `
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o"></i>
                `;
            }else{
                nivel = `
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                `;
            }

            string += `
                <li onclick="CARD.opcoes(${e.id})">
                    <div class="panel">
                        <div class="panel-top">
                            <a>${e.frente.substr(0, 10)}..</a>
                            <a>
                                ${nivel}
                            </a>
                        </div>
                        <div class="panel-bottom">
                            <a>${e.verso.substr(0, 10)}..</a>
                        </div>
                    </div>
                </li>
            `;
        }

        this.EL.innerHTML = string;
    }

    opcoes (id) {
        this.LISTA.forEach(e => {
            if (parseInt(e.id) === parseInt(id)) {
                const string = `
                    <li>
                        <a href="./cadcard.html?iddeck=${e.iddeck}&id=${e.id}">EDITAR</a>
                    </li>
                    <li>
                        <a class="link-red" onclick="deletar(${e.id})">DELETAR</a>
                    </li>
                `;

                MODAL.show(string);
            }
        });
    }

    novo () {
        window.location.replace(`./cadcard.html?iddeck=${this.IDDECK}`);
    }
}
const CARD = new card();
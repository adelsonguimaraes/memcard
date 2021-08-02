class app {
    constructor () {
        this.EL = document.querySelector('div.box ul');
        this.LISTA = [];
        this.get();
    }

    async get () {
        this.LISTA = await INDEXEDDB.getAll('deck');
        this.EL.innerHTML = '';
        this.mount();
    }

    async mount () {
        let string = '';
        
        for (const e of this.LISTA) {
            
            // consultando os cards
            const cards = await INDEXEDDB.getBy ("card", "iddeck", e.id);
            const total = cards.length;

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
                <li onclick="APP.opcoes(${e.id})">
                    <div class="panel">
                        <div class="panel-top">
                            <a>${e.name}</a>
                            <a>
                                ${nivel}
                            </a>
                        </div>
                        <div class="panel-bottom">
                            <a>Cards: ${total}</a>
                        </div>
                    </div>
                </li>
            `;
        };

        this.EL.innerHTML = string;
    }

    opcoes (id) {
        this.LISTA.forEach(e => {
            if (parseInt(e.id) === parseInt(id)) {
                const string = `
                    <li>
                        <a href="./caddeck.html?id=${id}">EDITAR</a>
                    </li>
                    <li>
                        <a href="./card.html?iddeck=${id}">CARDS</a>
                    </li>
                    <li>
                        <a href="./game.html?iddeck=${id}">JOGAR</a>
                    </li>
                    <li>
                        <a class="link-red" onclick="APP.deletar(${id})">DELETAR</a>
                    </li>
                `;

                MODAL.show(string);
            }
        });
    }

    async deletar (id) {
        const c = confirm("Deseja remover todo o deck?");

        if (c) {
            const cards = await INDEXEDDB.getBy('card', 'iddeck', id);
            for (const e of cards) {
                const r = await INDEXEDDB.remove('card', e.id);
            }

            const r = await INDEXEDDB.remove ('deck', id);

            window.location.reload();
        }
    }
}
const APP = new app();
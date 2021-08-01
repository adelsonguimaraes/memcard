class app {
    constructor () {
        this.EL = document.querySelector('div.box ul');
        this.LISTA = [];
        this.get();
    }

    get () {
        setTimeout(() => {
            const request = INDEXEDDB.getAll('deck');
            request.onsuccess = e => {
                this.LISTA = e.target.result;
                this.mount();
            }
            request.onerror = e => {
                console.error(e);
            }
        }, 500);
    }

    mount () {
        let string = '';
        this.LISTA.forEach(e => {
            
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
                            <a>Cards: ?</a>
                        </div>
                    </div>
                </li>
            `;
        });

        this.EL.innerHTML = string;
    }

    opcoes (id) {
        this.LISTA.forEach(e => {
            if (parseInt(e.id) === parseInt(id)) {
                const string = `
                    <li>
                        <a href="./caddeck.html#${id}">EDITAR</a>
                    </li>
                    <li>
                        <a href="./card.html#${id}">CARDS</a>
                    </li>
                    <li>
                        <a href="./game.html#${id}">JOGAR</a>
                    </li>
                    <li>
                        <a class="link-red" onclick="deletar(${id})">DELETAR</a>
                    </li>
                `;

                MODAL.show(string);
            }
        });
    }
}
const APP = new app();
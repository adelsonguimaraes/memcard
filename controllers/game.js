class game {
    constructor () {
        // toda vez que instancia esse metodo é chamado
        this.CONTENT = document.querySelector('div.content');
        this.CARD = document.querySelector('div.card');
        this.INDEX = 0;
        this.FLIP = false;
        this.IDDECK = 0;
        this.LISTA = [];
        this.get();
        this.flipCard();
        this.clickOK();
        this.clickNO();
    }

    async get() {
        // --- pegando hash da url
        const params = new URLSearchParams(window.location.search);
        const iddeck = parseInt(params.get('iddeck'));
        
        // --- se o hash não for um numero válido
        if (isNaN(iddeck)) return window.location.replace('./');

        this.IDDECK = iddeck;
        
        // getando por id
        this.LISTA = await INDEXEDDB.getBy('card', 'iddeck', this.IDDECK);
        // se for undefined
        if (this.LISTA.length<=0) return false;

        this.mountCard();
    }

    mountCard () {
        console.log(this.LISTA[this.INDEX]);

        this.CARD.classList.remove('card-flip');
        this.CARD.querySelector('div.front').innerText = this.LISTA[this.INDEX].frente;
        this.CARD.querySelector('div.back').innerText = this.LISTA[this.INDEX].verso;
    }

    flipCard () {
        this.CARD.addEventListener('click', e => {
            this.CARD.classList.add('card-flip');
            this.FLIP = true;
        });
    }

    clickOK () {
        document.querySelector('button.btn-green').addEventListener('click', e => {
            if (!this.FLIP) return alert('Vire a carta antes!');
            this.INDEX = (this.LISTA[this.INDEX+1] === undefined) ? 0 : (this.INDEX+1);
            this.mountCard();
            this.FLIP = false;
        });
    }
    clickNO () {
        document.querySelector('button.btn-red').addEventListener('click', e => {
            if (!this.FLIP) return alert('Vire a carta antes!');

            this.INDEX = (this.LISTA[this.INDEX+1] === undefined) ? 0 : (this.INDEX+1);
            this.mountCard();
            this.FLIP = false;
        });
    }
}
const GAME = new game();
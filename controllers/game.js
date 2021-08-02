class game {
    constructor () {
        // toda vez que instancia esse metodo é chamado
        this.CONTENT = document.querySelector('div.content');
        this.CARD = document.querySelector('div.card');
        this.INDEX = 0;
        this.FLIP = false;
        this.DECK = null;
        this.LISTA = [];
        this.ERROR = 0;
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

        this.DECK = await INDEXEDDB.get('deck', iddeck);

        // getando lista por id do deck e nivel do deck
        this.LISTA = await INDEXEDDB.getBy('card', ('iddeck', 'nivel'), (this.DECK.id, this.DECK.nivel));

        // se for undefined
        if (this.LISTA.length<=0) {
            alert('Nenhuma carta localizada no Deck!');
            return window.location.replace('./');
        }

        this.mountCard();
    }

    mountCard () {
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

    async clickOK () {
        document.querySelector('button.btn-green').addEventListener('click', async e => {
            if (!this.FLIP) return alert('Vire a carta antes!');

            // subindo a carta de nível
            const card = this.LISTA[this.INDEX];
            if (card.nivel<3) card.nivel++;

            const request = await INDEXEDDB.update('card', card);

            // removendo da lista
            this.LISTA.splice(this.INDEX, 1);

            // se acabar os cards
            if (this.LISTA.length<=0) return this.finish();

            this.INDEX = (this.LISTA[this.INDEX+1] === undefined) ? 0 : (this.INDEX+1);
            this.mountCard();
            this.FLIP = false;
        });
    }
    clickNO () {
        document.querySelector('button.btn-red').addEventListener('click', e => {
            if (!this.FLIP) return alert('Vire a carta antes!');

            if (this.DECK.nivel>1) this.ERROR++;

            // baixando a carta de nível
            const card = this.LISTA[this.INDEX];
            if (card.nivel>1) card.nivel--;

            // se acabar os cards
            if (this.LISTA.length<=0) return this.finish();

            this.INDEX = (this.LISTA[this.INDEX+1] === undefined) ? 0 : (this.INDEX+1);
            this.mountCard();
            this.FLIP = false;
        });
    }
    async finish () {
        // lógica de nivel da carta
        if (this.DECK.nivel<3 && this.ERROR<=0)  {
            // sobe o nivel do deck
            this.DECK.nivel++;
        }else if (this.DECK.nivel>1 && this.ERROR>0) {
            // desce o nivel do deck
            this.DECK.nivel--;
        }

        // atualiza deck
        await INDEXEDDB.update('deck', this.DECK);

        alert(`Deck chegou ao fim, nível atual: ${this.DECK.nivel}`);

        window.location.replace('./');
    }
}
const GAME = new game();
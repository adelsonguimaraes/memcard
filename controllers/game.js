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
        const iddeck = parseInt(sessionStorage.getItem('iddeck'));
        
        // --- se o hash não for um numero válido
        if (isNaN(iddeck)) return window.location.replace('./');

        this.DECK = await INDEXEDDB.get('deck', iddeck);

        // adicionando nome do DECK no titulo
        document.querySelector('div.content div.title').innerHTML = this.DECK.name;

        // getando lista por id do deck e nivel do deck
        this.LISTA = await INDEXEDDB.getBy('card', ('iddeck', 'nivel'), (this.DECK.id, this.DECK.nivel));

        // se for undefined
        if (this.LISTA.length<=0) {
            alert('Nenhuma carta localizada no Deck!');
            return window.location.replace('./');
        }

        this.mountCard();
    }

    getNivel (e) {
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
         return nivel;
    }

    mountCard () {
        this.CARD.classList.remove('card-flip');
        this.CARD.querySelector('div.front').innerText = this.LISTA[this.INDEX].frente;

        // motando o nivel do card
        this.CARD.querySelector('div.nivel').innerHTML = this.getNivel(this.LISTA[this.INDEX]);

        // um pequeno atraso no preenchimento da resposta do card enquanto é girado
        // ao clicar em acerto ou erro
        setTimeout(()=>{
            this.CARD.querySelector('div.back').innerText = this.LISTA[this.INDEX].verso;
        }, 500);
    }

    flipCard () {
        this.CARD.addEventListener('click', e => {
            this.CARD.classList.add('card-flip');
            this.FLIP = true;
            this.audioFlip();
        });
    }

    audioFlip () {
        const audio = new Audio('./audio/page.mp3');
        audio.volume = .8;
        audio.play();
    }

    audioConfirm () {
        const audio = new Audio('./audio/confirm.mp3');
        audio.volume = .8;
        audio.play();
    }

    audioCancel () {
        const audio = new Audio('./audio/cancel.mp3');
        audio.volume = .8;
        audio.play();
    }

    async clickOK () {
        document.querySelector('button.btn-green').addEventListener('click', async e => {
            if (!this.FLIP) return alert('Vire a carta antes!');

            this.audioConfirm();

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
    async clickNO () {
        document.querySelector('button.btn-red').addEventListener('click', async e => {
            if (!this.FLIP) return alert('Vire a carta antes!');

            this.audioCancel();

            // baixando a carta de nível
            const card = this.LISTA[this.INDEX];

            // se o card tiver nível acima do 1
            if (card.nivel>1) {
                // baixa o level
                card.nivel--;
                // removendo da lista
                this.LISTA.splice(this.INDEX, 1);
                // contamos como erro
                this.ERROR++;
            }

            // salvando no banco
            const request = await INDEXEDDB.update('card', card);

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
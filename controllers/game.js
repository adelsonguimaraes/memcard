class game {
    constructor () {
        // toda vez que instancia esse metodo é chamado
        this.CONTENT = document.querySelector('div.content');
        this.CARD = document.querySelector('div.card');
        this.INDEX = 0;
        this.FLIP = false;
        this.DATA = [
            {
                id: 1,
                pergunta: 'Para que serve a função splice no JavaScript ?',
                resposta: 'Adiciona ou remove elementos do array.'
            },
            {
                id: 2,
                pergunta: 'Para que serve a função split no JavaScript ?',
                resposta: 'Converter string em array separando por um determinado caracter.'
            },
            {
                id: 3,
                pergunta: 'No PHP para que serve a função array_column?',
                resposta: 'Extrair de um Array uma coluna expecífica para um novo array.'
            }
        ];
        this.mountCard();
        this.flipCard();
        this.clickOK();
        this.clickNO();
    }

    mountCard () {
        this.CARD.classList.remove('card-flip');
        this.CARD.querySelector('div.front').innerHTML = this.DATA[this.INDEX].pergunta;
        
        setTimeout(() => {
            this.CARD.querySelector('div.back').innerHTML = this.DATA[this.INDEX].resposta;
        }, 500);
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
            this.INDEX = (this.DATA[this.INDEX+1] === undefined) ? 0 : (this.INDEX+1);
            this.mountCard();
            this.FLIP = false;
        });
    }
    clickNO () {
        document.querySelector('button.btn-red').addEventListener('click', e => {
            if (!this.FLIP) return alert('Vire a carta antes!');
            this.INDEX = (this.DATA[this.INDEX+1] === undefined) ? 0 : (this.INDEX+1);
            this.mountCard();
            this.FLIP = false;
        });
    }
}
const GAME = new game();
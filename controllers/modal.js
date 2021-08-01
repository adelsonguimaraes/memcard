class modal {
    constructor () {
        
    }

    show (opcoes) {

        let el = document.querySelector('div.modal');
        if (el !== null) el.remove();
        
        el = `
            <div class="modal">
                <a class="close" onclick="MODAL.close()">X</a>
                <div class="modal-content">
                    <ul>
                        ${opcoes}
                    </ul>
                </div>
            </div>
        `;

        document.querySelector('body').innerHTML += el;
    }

    close () {
        let el = document.querySelector('div.modal');
        if (el !== null) el.remove();
    }
}
const MODAL = new modal();
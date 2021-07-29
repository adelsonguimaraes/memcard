class menu {
    constructor() {
        const CONTROL = this;

        this.PAGE = '';
        this.MENU = document.querySelector('div.menu');
        this.create();
        this.getPage();

        document.querySelector('div.btn_show').addEventListener('click', function(e) {
            if (e.target != this) return; // evitar o click no elemento pai
            CONTROL.showMenu();
        });
        document.querySelector('div.menu').addEventListener('click', function (e) {
            if (e.target != this) return; // evitar o click no elemento pai
            CONTROL.closeMenu();
        });
    }

    create () {
        this.MENU.innerHTML = `
            <div class="btn_show"></div>
            <div class="menu_content">
                <h3 onclick=MENU.navigate("")>
                    <span class="tmem">MEM</span><span class="tcard">CARD</span>
                </h3>
                <ul>
                    <li>
                        <a onclick=MENU.navigate("deck.html")>MEU DECK</a>
                    </li>
                    <li><a>ITEM 2</a></li>
                </ul>
            </div>
        `;
    }

    getPage () {
        const split = window.location.pathname.split('/');
        this.PAGE = split[split.length-1];
    }

    showMenu () {
        this.MENU.classList.add('show_menu');
    }
    closeMenu () {
        this.MENU.classList.remove('show_menu');
    }
    navigate (menu) {
        if (this.PAGE === menu) return false;
        this.PAGE = menu;
        window.location.replace(`./${menu}`);
    }
}
const MENU = new menu();
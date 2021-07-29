const stores = [
    {
        "name": "decks",
        "indexes": [
            {"description":"id", "index": "id", "unique": true},
            {"description":"id", "index": "nome", "unique": false},
            {"description":"id", "index": "datacadastro", "unique": false}
        ]
    },
    {
        "name": "card",
        "indexes": [
            {"description":"id", "index": "id", "unique": true},
            {"description":"id", "index": "iddeck", "unique": false},
            {"description":"id", "index": "front", "unique": false},
            {"description":"id", "index": "back", "unique": false},
            {"description":"id", "index": "datacadastro", "unique": false}
        ]
    }
]
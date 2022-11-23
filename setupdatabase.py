from server import db, Todo

db.create_all()

todos = [
    Todo("make coffee"),
    Todo("go errands"),
    Todo("meet friends")
]

db.session.add_all(todos)
db.session.commit()

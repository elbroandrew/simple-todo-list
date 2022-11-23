from flask import Flask, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)


class Todo(db.Model):
    __tablename__ = "todos"

    id = db.Column(db.Integer, primary_key=True)
    todo = db.Column(db.Text)

    def __init__(self, todo):
        self.todo = todo


@app.route('/', methods=['GET'])
def index():
    return redirect(url_for('static', filename='index.html'))


if __name__ == '__main__':
    app.run(debug=True)

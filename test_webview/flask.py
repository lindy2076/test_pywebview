from flask import Flask, render_template, jsonify, request, Response

from . import __name__
import test_webview.utils as utils


flask_app = Flask(__name__)


@flask_app.route('/')
def main():
    return render_template("main.html")


@flask_app.route('/mcs')
def guide():
    return render_template("moscow.html")


@flask_app.route('/api/msc/', methods=["GET"])
def msc():
    data = utils.get_moscow()
    return jsonify(data)

@flask_app.route('/api/spb/', methods=["GET"])
def spb():
    data = utils.get_spb()
    return jsonify(data)

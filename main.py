
from flask import Flask, render_template

app = Flask(__name__)
@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/

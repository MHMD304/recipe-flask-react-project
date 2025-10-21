from main import creat_app
from config import DevConfig

if __name__ == "__main__":
    app = creat_app(DevConfig)
    app.run(debug=True)
    
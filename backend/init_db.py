from main import creat_app
from config import DevConfig
from exts import db

app = creat_app(DevConfig)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("Database initialized (SQLite dev.db)")

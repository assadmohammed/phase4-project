
from config import create_app  


app = create_app()

# Blueprints
from routes import app_blueprint 
app.register_blueprint(app_blueprint, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True)

# app.py
from config import create_app  # Import create_app from config

# Create the Flask app using the factory function
app = create_app()

# Register Blueprints
from routes import app_blueprint  # Import routes from routes.py
app.register_blueprint(app_blueprint, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True)

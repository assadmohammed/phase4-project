from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token,get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from model import db, User, Package, Booking, Review,ContactUs
from datetime import datetime,timedelta

# Define the blueprint for the routes
app_blueprint = Blueprint('app', __name__)

# Route to get all users (protected with JWT)
@app_blueprint.route('/users', methods=['GET'])
@jwt_required()  # Protect this route with JWT authentication
def get_users():
    users = User.query.all()
    return jsonify([user.to_json() for user in users])

# Route to create a new user
@app_blueprint.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    # Ensure all required fields are provided
    if not all(field in data for field in ['first_name', 'last_name', 'email', 'password', 'is_admin']):
        return jsonify({"message": "Missing required fields"}), 400
    
    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already exists"}), 400

    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        password=data['password'],

        email=data['email'],
        is_admin=data['is_admin']
    )
    new_user.set_password(data['password'])  # Hash the password before saving

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.to_json()), 201

# Route to log in and get JWT token
from datetime import timedelta

# Route to log in and get JWT token
@app_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):  # Check hashed password
        # Set the expiration time to 3 days
        access_token = create_access_token(identity=f"{user.id}", expires_delta=timedelta(days=3))
        return jsonify({
            'message': 'Login successful!',
            'access_token': access_token,
            'user': user.to_json(),
            'admin_status': 'Admin' if user.is_admin else 'Not Admin'
        }), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Route to get all packages
@app_blueprint.route('/packages', methods=['GET'])
def get_packages():
    packages = Package.query.all()
    return jsonify([package.to_json() for package in packages])

# Route to create a new package (protected with JWT)
@app_blueprint.route('/packages', methods=['POST'])
  # Protect this route with JWT authentication
def create_package():
    data = request.get_json()
    new_package = Package(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        duration=data['duration'],
        start_date=datetime.strptime(data['start_date'], '%Y-%m-%d')  # Assuming date is passed in 'YYYY-MM-DD'
    )
    db.session.add(new_package)
    db.session.commit()
    return jsonify(new_package.to_json()), 201

# Route to get all bookings (protected with JWT)
@app_blueprint.route('/bookings', methods=['GET'])
@jwt_required()  # Protect this route with JWT authentication
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([booking.to_json() for booking in bookings])

# Route to create a new booking (protected with JWT)
@app_blueprint.route('/bookings', methods=['POST'])
@jwt_required()  # Protect route with JWT authentication
def create_booking():
    data = request.get_json()
    user_id = get_jwt_identity()  # Extract user ID from token

    # Ensure required fields are provided
    if not all(field in data for field in ['package_id']):
        return jsonify({"message": "Missing required fields"}), 400

    # Check if the package exists
    package = Package.query.get(data['package_id'])
    if not package:
        return jsonify({"message": "Package not found"}), 404

    # Parse booking date (if provided), otherwise use the current date
    if 'booking_date' in data:
        try:
            booking_date = datetime.strptime(data['booking_date'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"message": "Invalid date format. Use YYYY-MM-DD"}), 400
    else:
        booking_date = datetime.utcnow().date()  # Default to today's date

    # Create a new booking
    new_booking = Booking(
        user_id=user_id,
        package_id=data['package_id'],
        booking_date=booking_date,  # Now allows custom date
        status="Pending"  # Default status
    )

    db.session.add(new_booking)
    db.session.commit()

    return jsonify(new_booking.to_json()), 201


# Route to create a new review (protected with JWT)
@app_blueprint.route('/reviews', methods=['POST'])
@jwt_required()  # Protect this route with JWT authentication
def create_review():
    data = request.get_json()
    new_review = Review(
        user_id=data['user_id'],
        package_id=data['package_id'],
        rating=data['rating'],
        comment=data.get('comment')
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_json()), 201

@app_blueprint.route('/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()

    # Ensure all required fields are provided
    if not all(field in data for field in ['name', 'email', 'description']):
        return jsonify({"message": "Missing required fields"}), 400
    
    new_contact = ContactUs(
        name=data['name'],
        email=data['email'],
        description=data['description'],
        user_id=data.get('user_id')  # Optional user_id
    )
    
    db.session.add(new_contact)
    db.session.commit()
    
    return jsonify(new_contact.to_json()), 201

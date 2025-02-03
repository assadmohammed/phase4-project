from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from config import db

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False) 
    is_admin = db.Column(db.Boolean, default=False)


    def __repr__(self):
        return f'<User {self.name}>'

    def to_json(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name":self.last_name,
            "password":self.password,
            "email": self.email,
            "is_admin": self.is_admin
        }

    
    def set_password(self, password):
        self.password = generate_password_hash(password)

    
    def check_password(self, password):
        return check_password_hash(self.password, password)

# Travel Package 
class Package(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    price = db.Column(db.Float, nullable=False)
    duration = db.Column(db.Integer, nullable=False)  
    start_date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Package {self.name}>'

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "duration": self.duration,
            "start_date": self.start_date.isoformat()
        }

# Booking Model
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    package_id = db.Column(db.Integer, db.ForeignKey('package.id'), nullable=False)
    booking_date = db.Column(db.Date, default=datetime.utcnow)
    status = db.Column(db.String(50), default='Pending')

    user = db.relationship('User', backref=db.backref('bookings', lazy=True))
    package = db.relationship('Package', backref=db.backref('bookings', lazy=True))

    def __repr__(self):
        return f'<Booking {self.id}>'

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "package_id": self.package_id,
            "booking_date": self.booking_date.isoformat(),
            "status": self.status
        }

# Review Model
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    package_id = db.Column(db.Integer, db.ForeignKey('package.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # 1-5 stars
    comment = db.Column(db.String(500), nullable=True)
    date = db.Column(db.Date, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('reviews', lazy=True))
    package = db.relationship('Package', backref=db.backref('reviews', lazy=True))

    def __repr__(self):
        return f'<Review {self.id}>'

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "package_id": self.package_id,
            "rating": self.rating,
            "comment": self.comment,
            "date": self.date.isoformat()
        }
    
class ContactUs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  

    user = db.relationship('User', backref=db.backref('contact_requests', lazy=True))

    def __repr__(self):
        return f'<ContactUs {self.id}>'

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "description": self.description,
            "user_id": self.user_id
        }


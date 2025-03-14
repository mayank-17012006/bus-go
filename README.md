Bus-Go 🚍💨

Bus-Go is a modern and efficient bus booking platform designed to help users search, book, and track buses in real-time. It offers a seamless and intuitive interface, secure payments, and live tracking features, making bus travel more convenient than ever!

🚀 Features

🔐 User Authentication

Login & Registration (with email & password)

Google Authentication for quick sign-in

MongoDB Integration to securely store user data

🚌 Bus Search & Booking

Real-time Bus Data (routes, timings, prices)

Dynamic Seat Selection with real-time availability

Filters & Sorting (AC/non-AC, sleeper, price range, etc.)

💳 Payments & Transactions

Secure Online Payments (UPI, credit/debit card, net banking)

Transaction History to track past bookings

Easy Cancellations & Refunds

📍 Live Bus Tracking

GPS-Enabled Tracking for real-time location

ETA Updates for accurate arrival predictions

📂 User Dashboard

Manage Bookings (view current & past bookings)

Download Tickets for offline use

Profile & Preferences management

🎨 Smooth Animations

GSAP-powered animations for enhanced UI experience

Loading screens, page transitions, and hover effects

🛠 Tech Stack

Frontend:

React.js

Tailwind CSS

GSAP (for animations)

Backend:

Node.js & Express.js

MongoDB (Database)

Firebase Authentication / OAuth

Google Maps API (for live tracking)

Razorpay / Stripe (for payments)

🚀 Getting Started

1️⃣ Clone the Repository

git clone https://github.com/yourusername/Bus-Go.git
cd Bus-Go

2️⃣ Install Dependencies

npm install  # For backend dependencies
cd client && npm install  # For frontend dependencies

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
FIREBASE_API_KEY=your_firebase_api_key
RAZORPAY_KEY=your_razorpay_key

4️⃣ Run the Application

npm run dev  # Runs both frontend & backend

🛠 API Endpoints (Backend)

Endpoint

Method

Description

/api/auth/register

POST

User registration

/api/auth/login

POST

User login

/api/buses/search

GET

Search for available buses

/api/bookings/create

POST

Create a new booking

/api/payments/initiate

POST

Start payment process

More detailed API documentation coming soon! 🚀

💡 Future Enhancements

Mobile App (React Native)

AI-powered Route Recommendations

Multi-language Support

Dark Mode

📜 License

This project is licensed under the MIT License.

📞 Contact

For any queries or contributions, feel free to open an issue or contact me at:

📧 Email: your.email@example.com

🐦 Twitter: @yourusername

🔗 LinkedIn: Your Profile

🚀 Bus-Go: Simplifying Your Travel Experience! 🎉

// src/pages/ContactUs.jsx
import React from "react";

function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Section */}
            <div className="flex justify-center">
              <img
                src="/contact.jpg"
                alt="Contact Smart Hostel"
                className="w-full max-w-md rounded-lg shadow-2xl transform hover:scale-105 transition duration-300"
              />
            </div>
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-xl text-gray-700">
                We'd love to hear from you! Whether you're a student, staff, or
                just curious about <strong>Smart Hostel</strong>, feel free to
                reach out.
              </p>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Our Contact Info
                </h2>
                <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2">
                  <li>📧 Email: support@smarthostel.com</li>
                  <li>📞 Phone: +91 98765 43210</li>
                  <li>
                    📍 Address: Smart Hostel HQ, Tech Park, Bangalore, India
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Working Hours
                </h2>
                <p className="text-lg text-gray-700">
                  Monday to Friday: 9:00 AM – 6:00 PM
                  <br />
                  Saturday: 10:00 AM – 2:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-600">
          © {new Date().getFullYear()} Smart Hostel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Contact;

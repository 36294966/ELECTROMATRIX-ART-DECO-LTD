import { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS SDK

function BookingForm() {
  const [formData, setFormData] = useState({
    eventType: '',
    visitors: '',
    location: '',
    name: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // EmailJS service to send email
    emailjs
      .send(
        'service_xxx', // Your EmailJS service ID
        'template_xxx', // Your EmailJS template ID
        formData, // Data to be sent
        'user_xxx' // Your EmailJS user ID (you get this after signing up)
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Booking submitted successfully!');
          // Clear form data after submission
          setFormData({
            eventType: '',
            visitors: '',
            location: '',
            name: '',
            phone: '',
          });
        },
        (error) => {
          console.error('FAILED...', error);
          alert('Failed to submit booking. Please try again.');
        }
      );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-2xl bg-orange-500 rounded-lg shadow-lg p-8 transition-shadow duration-300 hover:shadow-xl hover:scale-105 hover:bg-orange-400 cursor-pointer">
        <h2 className="text-4xl mb-6 text-center font-bold text-white">Book Your Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="eventType">
              Event Type
            </label>
            <input
              type="text"
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              placeholder="e.g., Wedding, Conference"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="visitors">
              Number of Visitors
            </label>
            <input
              type="number"
              id="visitors"
              name="visitors"
              value={formData.visitors}
              onChange={handleChange}
              placeholder="e.g., 50"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              min={1}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Venue or Address"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., +1234567890"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;


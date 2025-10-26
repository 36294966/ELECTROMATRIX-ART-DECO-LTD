import emailjs from 'emailjs-com';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function BookingForm() {
  const [formData, setFormData] = useState({
    eventType: '',
    visitors: '',
    location: '',
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS configuration
    const serviceID = 'service_frkoy3v';
    const templateID = 'template_xogdeho';
    const userID = 'dxl0q8newYK3gu9Z7';

    // Create a detailed message with all user information
    const userDetails = `
🎉 NEW EVENT BOOKING RECEIVED! 🎉

📋 EVENT DETAILS:
• Event Type: ${formData.eventType}
• Number of Visitors: ${formData.visitors}
• Location: ${formData.location}

👤 CUSTOMER INFORMATION:
• Full Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}

📅 BOOKING INFORMATION:
• Submitted: ${new Date().toLocaleString()}
• Booking ID: BK-${Date.now()}

Please contact the customer within 24 hours to confirm this booking.
    `;

    // Template parameters - simplified and focused on sending to admin
    const templateParams = {
      // This is the main message that will be sent to YOU
      message: userDetails,
      subject: `NEW BOOKING: ${formData.eventType} by ${formData.name}`,
      
      // Include individual fields as well
      event_type: formData.eventType,
      visitors: formData.visitors,
      location: formData.location,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      booking_time: new Date().toLocaleString(),
      booking_id: `BK-${Date.now()}`
    };

    console.log('Sending booking details:', templateParams);

    // Send email using EmailJS
    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(
        (response) => {
          console.log('SUCCESS!', response);
          alert('Booking submitted successfully! We have received your details.');
          
          // Clear form data after successful submission
          setFormData({
            eventType: '',
            visitors: '',
            location: '',
            name: '',
            phone: '',
            email: ''
          });
        },
        (error) => {
          console.error('EmailJS Error Details:', error);
          console.error('Error Text:', error.text);
          
          // More specific error messages
          if (error.text.includes('Service not found')) {
            alert('Service configuration error. Please contact support.');
          } else if (error.text.includes('Template not found')) {
            alert('Template configuration error. Please contact support.');
          } else if (error.text.includes('User ID')) {
            alert('Configuration error. Please contact support.');
          } else {
            alert('Failed to submit booking. Please try again or contact us directly.');
          }
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="relative p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-2xl bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-4xl mb-6 text-center font-bold text-white drop-shadow-lg">Book Your Event</h2>
        <p className="text-blue-100 text-center mb-8 text-lg">
          Fill out the form below and we'll get back to you within 24 hours
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-bold text-white text-lg" htmlFor="eventType">
              Event Type
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full p-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white/90 backdrop-blur-sm"
              required
            >
              <option value="">Select Event Type</option>
              <option value="Wedding">Wedding</option>
              <option value="Conference">Conference</option>
              <option value="Birthday Party">Birthday Party</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Seminar">Seminar</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold text-white text-lg" htmlFor="visitors">
              Number of Visitors
            </label>
            <input
              type="number"
              id="visitors"
              name="visitors"
              value={formData.visitors}
              onChange={handleChange}
              placeholder="e.g., 50"
              className="w-full p-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white/90 backdrop-blur-sm"
              required
              min={1}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-white text-lg" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Venue or Address"
              className="w-full p-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white/90 backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-white text-lg" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full p-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white/90 backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-white text-lg" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your-email@example.com"
              className="w-full p-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white/90 backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-white text-lg" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., +1234567890"
              className="w-full p-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white/90 backdrop-blur-sm"
              required
            />
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                bg-gradient-to-r from-yellow-500 to-yellow-600 
                text-white px-10 py-4 rounded-2xl font-bold text-lg 
                transition-all duration-300 transform
                hover:from-yellow-600 hover:to-orange-500
                border-2 border-yellow-400
                shadow-2xl hover:shadow-3xl
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              `}
            >
              {isSubmitting ? 'Sending...' : 'Submit Booking'}
            </button>
          </div>
        </form>

        {/* Contact Information */}
        <div className="mt-8 p-4 bg-blue-500/30 rounded-xl border-2 border-blue-400">
          <p className="text-white text-center text-lg font-semibold">
            📞 Prefer to talk directly? Call us at: <span className="text-yellow-300">+254 714 287 705</span>
          </p>
        </div>
      </div>

      {/* WhatsApp fixed button - Same as Home page */}
      <a
        href="https://wa.me/254714287705"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 md:bottom-10 md:right-6 bg-green-500 text-white p-4 md:p-6 rounded-full shadow-2xl hover:bg-green-400 transition-all transform hover:scale-110 z-50"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-2xl md:text-4xl" />
      </a>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes colorChange {
          0% { color: #3b82f6; }
          25% { color: #ef4444; }
          50% { color: #10b981; }
          75% { color: #8b5cf6; }
          100% { color: #3b82f6; }
        }
        @keyframes blinkBackground {
          0% { background-color: #3b82f6; }
          50% { background-color: #bfdbfe; }
          100% { background-color: #3b82f6; }
        }
        @keyframes borderColorCycle {
          0% { border-color: #3b82f6; }
          25% { border-color: #ef4444; }
          50% { border-color: #10b981; }
          75% { border-color: #8b5cf6; }
          100% { border-color: #3b82f6; }
        }
        .animate-blink {
          animation: blinkBackground 15s infinite;
        }
        .animate-borderColor {
          animation: borderColorCycle 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default BookingForm;


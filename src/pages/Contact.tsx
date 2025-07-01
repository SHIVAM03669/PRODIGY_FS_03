import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      {submitted ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-green-600 font-semibold">
          Thank you for reaching out! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="input-field"
            rows={5}
            required
          />
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      )}
    </main>
  );
};

export default Contact; 
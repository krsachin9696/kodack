import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import QueryKeys from '../../constants/queryKeys';
import __contactUs from './services';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { mutate: contactUs, status: contactUsStatus } = useMutation({
    mutationFn: () => __contactUs(formData),
    mutationKey: [QueryKeys.CONTACT_US],
    onSuccess: () => {
      toast.info("Form submitted successfully");
      setFormData({ name: '', email: '', subject: '', message: '' });
    },
    onError: (error: AxiosError<ErrorResponseProps>) => {
      toast.error(error.response?.data?.error || 'Submission Error');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactUs();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center text-white">
      <div className="w-full max-w-md shadow-lg bg-gray-900 border border-gray-700 rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-white"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-white"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block font-medium mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-white"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter the subject"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-medium mb-2">Message</label>
            <textarea
              id="message"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 text-white"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={5}
            ></textarea>
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

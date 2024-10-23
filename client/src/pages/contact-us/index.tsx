import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import QueryKeys from '../../constants/queryKeys';
import __contactUs from './services';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import {
  CircularProgress,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { defaultStyles } from '../../constants/defaultStyles';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate: contactUs, status: contactUsStatus } = useMutation({
    mutationFn: () => __contactUs(formData),
    mutationKey: [QueryKeys.CONTACT_US],
    onSuccess: () => {
      toast.info("Form submitted successfully");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    },
    onError: (error: AxiosError<ErrorResponseProps>) => {
      toast.error(error.response?.data?.error || 'Submission Error');
    },
  });

  // Validate form fields before submission
  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: '', email: '', subject: '', message: '' };

    if (!formData.name) {
      newErrors.name = 'Full Name is required';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else {
      // Basic email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
        isValid = false;
      }
    }
    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }
    if (!formData.message) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Reset error for the field when the user starts typing again
    setErrors({ ...errors, [e.target.id]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form before calling mutation
    if (validateForm()) {
      contactUs();
    }
  };

  return (
    <div className="min-h-screen flex px-[10%]">
      <div className="hidden md:flex w-1/2 text-white flex-col p-10 bg-[url('/bgsvg.svg')] bg-no-repeat bg-contain bg-center">
        <h1 className="font-protest font-bold text-6xl mb-10 text-blue-400 p-10">
          KODACK
        </h1>
      </div>

      <div className="flex w-full md:w-1/2 justify-center items-center">
        <form
          className="p-10 rounded-lg w-11/12 max-w-lg flex-col space-y-1"
          style={{
            border: '1px solid rgba(51, 60, 77, 0.6)',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
            Contact Us
          </h1>

          {isSubmitted ? (
            <div className="text-center">
              <Typography variant="h6" className="text-blue-400 mb-4">
                Thank you for contacting us!
              </Typography>
            </div>
          ) : contactUsStatus === 'pending' ? (
            <div className="text-center">
              <CircularProgress color="primary" />
              <Typography variant="body1" className="mt-4">Submitting...</Typography>
            </div>
          ) : (
            <>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                id="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                sx={defaultStyles.inputStyles}
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                id="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={defaultStyles.inputStyles}
              />

              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                error={!!errors.subject}
                helperText={errors.subject}
                sx={defaultStyles.inputStyles}
              />

              <FormControl fullWidth variant="outlined" sx={defaultStyles.inputStyles}>
              <InputLabel
               htmlFor="outlined-adornment-message"
               error={!!errors.message}
               sx={{
               color: errors.message ? 'error.main' : 'white', // White text by default, error color if there's an error
               }}
               >
               Message
               </InputLabel>
               <OutlinedInput
               id="message"
               value={formData.message}
               onChange={handleChange}
               multiline
               rows={5}
               error={!!errors.message}
               label="Message"
               sx={{ color: 'white' }} // This makes the text inside the input white
               />
              {errors.message && (
             <Typography variant="caption" color="error">
              {errors.message}
             </Typography>
            )}
          </FormControl>
              <Button
                fullWidth
                variant="contained"
                size="small"
                color="primary"
                className="mt-4 mb-4"
                sx={{ padding: 2 }}
                type="submit"
              >
                Send Message
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

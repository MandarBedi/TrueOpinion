import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { contactSchema } from '../utils/validation';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import FormField from '../components/Common/FormField';
import Button from '../components/Common/Button';
import Card from '../components/Common/Card';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  BoltIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch('/api/public/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
        
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        formik.resetForm();
      } catch (error) {
        toast.error('Failed to send message. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const supportTopics = [
    {
      title: 'Getting Started',
      description: 'Learn how to create an account and start your first consultation',
      icon: UserGroupIcon,
      color: 'blue'
    },
    {
      title: 'Account & Billing',
      description: 'Manage your account settings and billing information',
      icon: ShieldCheckIcon,
      color: 'green'
    },
    {
      title: 'Medical Consultations',
      description: 'Information about our consultation process and services',
      icon: HeartIcon,
      color: 'red'
    },
    {
      title: 'Privacy & Security',
      description: 'Learn about how we protect your medical information',
      icon: ShieldCheckIcon,
      color: 'purple'
    }
  ];

  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@trueopinion.com',
      icon: EnvelopeIcon,
      color: 'blue'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 24/7',
      icon: ChatBubbleLeftRightIcon,
      color: 'green'
    },
    {
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      contact: '+1 (555) 123-4567',
      icon: PhoneIcon,
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      purple: 'from-purple-500 to-purple-600',
      yellow: 'from-yellow-500 to-yellow-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-20 lg:py-32">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 animate-fade-in">
                <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                We're here to help you succeed
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Contact & Support
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto animate-slide-up leading-relaxed">
                We're here to help you get the most out of True Opinion. Find answers to common questions or contact our support team.
              </p>
            </div>
          </div>
        </section>

        {/* Support Topics */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                <HeartIcon className="w-4 h-4 mr-2" />
                How Can We Help?
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get the Support You Need
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our comprehensive support system ensures you have access to the help you need, when you need it.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {supportTopics.map((topic, index) => (
                <div key={index} className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                  <div className="flex items-start">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(topic.color)} rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <topic.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{topic.description}</p>
                      <a href="/faq" className="text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                        Learn more 
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                Contact Our Team
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Multiple Ways to Reach Us
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the method that works best for you. We're available 24/7 to help with your questions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(method.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{method.description}</p>
                  <p className="text-primary-600 font-semibold">{method.contact}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border border-primary-200">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-3">
                      <EnvelopeIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Get in Touch</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3 group">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <EnvelopeIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">support@trueopinion.com</p>
                        <p className="text-gray-600">info@trueopinion.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 group">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <PhoneIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Phone</h4>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-gray-600">+1 (555) 987-6543</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 group">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MapPinIcon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Address</h4>
                        <p className="text-gray-600">
                          123 Medical Center Drive<br />
                          Healthcare City, HC 12345<br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 group">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ClockIcon className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Business Hours</h4>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 mt-6 border border-yellow-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mr-3">
                      <StarIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Need Quick Answers?</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Check out our frequently asked questions for immediate answers to common queries.
                  </p>
                  <button className="w-full bg-white text-yellow-600 border border-yellow-300 rounded-xl px-6 py-3 font-semibold hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105">
                    View FAQ
                  </button>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-3">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Send us a Message</h3>
                  </div>
                  
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Full Name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.name}
                        touched={formik.touched.name}
                        required
                      />

                      <FormField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                        required
                      />
                    </div>

                    <FormField
                      label="Subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.subject}
                      touched={formik.touched.subject}
                      required
                    />

                    <FormField
                      label="Message"
                      name="message"
                      type="textarea"
                      rows={6}
                      placeholder="Please describe your question or concern in detail..."
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.message}
                      touched={formik.touched.message}
                      required
                    />

                    <button
                      type="submit"
                      disabled={!formik.isValid || loading}
                      className="group w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl px-8 py-4 font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <EnvelopeIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      {loading ? 'Sending...' : 'Send Message'}
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
                <StarIcon className="w-4 h-4 mr-2" />
                Common Questions
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Quick answers to the most common questions about our platform and services.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I upload my medical documents?</h3>
                <p className="text-gray-600 leading-relaxed">
                  You can upload your medical documents securely through your dashboard. We accept PDF, JPG, and PNG files up to 10MB each.
                </p>
              </div>
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How long does a consultation take?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Most consultations are completed within 24-48 hours. Premium plans offer faster turnaround times of 12-24 hours.
                </p>
              </div>
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Is my medical information secure?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we use bank-level encryption and are fully HIPAA compliant to protect your medical information.
                </p>
              </div>
              <div className="text-center mt-8">
                <a href="/faq" className="group inline-flex items-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <StarIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  View All FAQs
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
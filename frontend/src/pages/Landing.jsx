import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CookieConsent from '../components/Common/CookieConsent';
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  BoltIcon,
  LockClosedIcon,
  CreditCardIcon,
  DocumentCheckIcon,
  StarIcon,
  CheckCircleIcon,
  HeartIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

const Landing = () => {
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    reviews: 0,
    rating: 0
  });

  useEffect(() => {
    // Fetch real stats from backend
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/public/stats');
        const data = await response.json();
        
        // Use the stats directly from backend
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Use default stats on error
        setStats({
          doctors: 50,
          patients: 1000,
          reviews: 500,
          rating: 4.8
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main>
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
                <HeartIcon className="w-4 h-4 mr-2" />
                Trusted by 1000+ patients worldwide
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Get a True Opinion
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto animate-slide-up leading-relaxed">
                Connect with top doctors and specialists for expert advice on your health concerns. 
                Fast, secure, and completely confidential.
              </p>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-3xl mx-auto">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                  <div className="text-3xl font-bold text-white">{stats.doctors}+</div>
                  <div className="text-sm opacity-90">Expert Doctors</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                  <div className="text-3xl font-bold text-white">{stats.patients}+</div>
                  <div className="text-sm opacity-90">Happy Patients</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                  <div className="text-3xl font-bold text-white">{stats.reviews}+</div>
                  <div className="text-sm opacity-90">Reviews</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center justify-center mb-1">
                    <StarIcon className="w-5 h-5 text-yellow-300 fill-current" />
                    <span className="text-3xl font-bold ml-1">{stats.rating}</span>
                  </div>
                  <div className="text-sm opacity-90">Average Rating</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/register/patient" 
                  className="group inline-flex items-center px-8 py-4 text-lg font-semibold bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <BoltIcon className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Get Started Today
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link 
                  to="/how-it-works"
                  className="group inline-flex items-center px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                >
                  <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Learn How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                Why Choose Our Platform?
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your Health, Our Priority
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get expert opinions from verified specialists with complete privacy and security. 
                We're here to make healthcare accessible and trustworthy.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserGroupIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Expert Doctors</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Consult with experienced and verified professionals across various specialties. 
                  All doctors are carefully vetted for expertise and credentials.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-200">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LockClosedIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Secure & Confidential</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Your health information is protected with bank-level encryption and consultations 
                  are completely confidential. HIPAA compliant for your peace of mind.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-yellow-200">
                <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ClockIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Quick Turnaround</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Receive expert opinions and recommendations within 24-48 hours. 
                  Premium plans offer even faster response times for urgent cases.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <DocumentCheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Easy Upload</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Simply upload your medical reports and get expert analysis from specialists. 
                  Support for PDF, JPG, and PNG files up to 10MB each.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-200">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CreditCardIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Secure Payments</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Pay securely through UPI with transparent pricing set by doctors. 
                  No hidden fees, clear pricing before you proceed.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-red-200">
                <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Verified Specialists</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  All doctors are verified professionals with proven expertise in their fields. 
                  Regular credential verification ensures quality care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
                <StarIcon className="w-4 h-4 mr-2" />
                Patient Testimonials
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What Our Patients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real stories from patients who found clarity and confidence through our platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "The second opinion I received gave me confidence in my treatment plan. 
                  The doctor was thorough and explained everything clearly. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    SP
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Patel</div>
                    <div className="text-sm text-gray-600">Cardiology Patient</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "Fast, professional, and secure. The consultation helped me understand my 
                  diagnosis better and explore treatment options I hadn't considered."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    MK
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Michael Kumar</div>
                    <div className="text-sm text-gray-600">Neurology Patient</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "Excellent service! The doctor was knowledgeable and took time to explain 
                  everything. The platform is user-friendly and the process was seamless."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    RJ
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Rahul Joshi</div>
                    <div className="text-sm text-gray-600">Orthopedics Patient</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Your Expert Opinion?
            </h2>
            <p className="text-xl opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of patients who trust True Opinion for their medical consultations. 
              Get started today and experience the difference expert care can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register/patient"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <BoltIcon className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Get Started Today
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Landing;
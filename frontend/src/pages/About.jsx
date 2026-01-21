import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CookieConsent from '../components/Common/CookieConsent';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About True Opinion
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing how people access expert medical opinions,
              making quality healthcare advice accessible to everyone.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At True Opinion, we believe everyone deserves access to expert
                  medical advice. Our platform connects patients with verified
                  specialists to provide second opinions that can make a real
                  difference in healthcare decisions.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  We're committed to making quality medical consultations
                  accessible, affordable, and convenient for patients worldwide.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register/patient" className="btn btn-primary">
                    Get Started
                  </Link>
                  <Link to="/contact" className="btn btn-secondary">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="bg-primary-50 rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Patient Care
                    </h3>
                    <p className="text-gray-600">
                      Putting patients first with compassionate care
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Expert Opinions
                    </h3>
                    <p className="text-gray-600">
                      Verified specialists providing quality advice
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Secure & Private
                    </h3>
                    <p className="text-gray-600">
                      Your health information is protected
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Fast & Efficient
                    </h3>
                    <p className="text-gray-600">
                      Quick turnaround times for opinions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quality
                </h3>
                <p className="text-gray-600">
                  We maintain the highest standards of medical expertise and
                  professional conduct.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Privacy
                </h3>
                <p className="text-gray-600">
                  Your health information is protected with the highest security
                  standards.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Compassion
                </h3>
                <p className="text-gray-600">
                  We approach every case with empathy and understanding for our
                  patients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  VR
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Vaibhavsing Rajput
                </h3>
                <p className="text-primary-600 mb-2">Team Member</p>
                <p className="text-gray-600">
                  Contributing to the development and success of True Opinion platform.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  YS
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Yash Somani
                </h3>
                <p className="text-primary-600 mb-2">Team Member</p>
                <p className="text-gray-600">
                  Contributing to the development and success of True Opinion platform.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  SK
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Saurabh Kasture
                </h3>
                <p className="text-primary-600 mb-2">Team Member</p>
                <p className="text-gray-600">
                  Focused on building robust and scalable healthcare technology solutions.
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  MB
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mandar Bedi
                </h3>
                <p className="text-primary-600 mb-2">Team Member</p>
                <p className="text-gray-600">
                  Committed to delivering quality healthcare solutions and user satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Get Your Expert Opinion?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of patients who trust True Opinion for their
              medical consultations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register/patient"
                className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100"
              >
                Get Started Today
              </Link>
              <Link
                to="/contact"
                className="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Learn More
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

export default About;

import React, { useState } from 'react';
import { Shield, Target, Users, Award, ChevronRight, Phone, Crosshair, Swords, Shield as ShieldIcon, Menu, Mail, X } from 'lucide-react';
import { IMAGES } from './config/images';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        program: '',
        message: '',
      });
      
      alert('Thank you for your interest! We will contact you shortly.');
    } catch (error) {
      console.error('Error:', error);
      alert('Sorry, there was an error submitting your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToStory = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const storySection = document.getElementById('our-story');
    storySection?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToPrograms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const programsSection = document.getElementById('programs');
    programsSection?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">ACDT</h1>
                <p className="text-xs sm:text-sm text-gray-600">Advanced Civil Defense Training</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-red-600">Home</a>
              <a href="#programs" onClick={scrollToPrograms} className="text-gray-700 hover:text-red-600">Programs</a>
              <a href="#our-story" onClick={scrollToStory} className="text-gray-700 hover:text-red-600">About Us</a>
              <a href="#contact" className="text-gray-700 hover:text-red-600">Contact</a>
              <button 
                onClick={scrollToContact}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Start Training
              </button>
            </nav>
            <button 
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-gray-700 hover:text-red-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                <a href="#programs" onClick={scrollToPrograms} className="text-gray-700 hover:text-red-600 py-2">Programs</a>
                <a href="#our-story" onClick={scrollToStory} className="text-gray-700 hover:text-red-600 py-2">About Us</a>
                <a href="#contact" className="text-gray-700 hover:text-red-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                <button 
                  onClick={scrollToContact}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full mt-2"
                >
                  Start Training
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div 
        className="relative min-h-[100svh] flex items-center justify-center pt-16 sm:pt-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${IMAGES.hero.url}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center text-white px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">ACDT</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto">
            Professional civil defense training, specializing in advanced personal protection and comprehensive defense techniques
          </p>
          <button 
            onClick={scrollToContact}
            className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-semibold flex items-center mx-auto"
          >
            Start Training <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16">Why Choose ACDT</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <Shield className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-red-600" />
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Expert Instruction</h3>
              <p className="text-gray-600">Learn from professionals with extensive international training experience</p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-red-600" />
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Proven Techniques</h3>
              <p className="text-gray-600">Master effective personal protection and defense strategies</p>
            </div>
            <div className="text-center sm:col-span-2 md:col-span-1">
              <Award className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-red-600" />
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Professional Training</h3>
              <p className="text-gray-600">Access state-of-the-art facilities and expert instruction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="programs" className="bg-gray-100 py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16">Our Training Programs</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src={IMAGES.programs.kravMaga.url}
                alt={IMAGES.programs.kravMaga.alt}
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Advanced Self-Defense</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive training program covering both unarmed and armed defense techniques. 
                  Master practical self-defense skills while improving your physical conditioning and 
                  situational awareness.
                </p>
                <button 
                  onClick={scrollToContact}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img 
                src={IMAGES.programs.firearms.url}
                alt={IMAGES.programs.firearms.alt}
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Personal Protection</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive training in personal protection techniques, from situational awareness 
                  to advanced defensive strategies for civilian applications.
                </p>
                <button 
                  onClick={scrollToContact}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg sm:col-span-2 md:col-span-1">
              <img 
                src={IMAGES.programs.cqb.url}
                alt={IMAGES.programs.cqb.alt}
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Advanced Defense Training</h3>
                <p className="text-gray-600 mb-6">
                  A comprehensive, integrated defense program designed to equip civilians with practical skills for real-world scenarios. This intensive training seamlessly blends multiple defensive disciplines, combining hand-to-hand combat techniques with advanced firearms proficiency.
                </p>
                <button 
                  onClick={scrollToContact}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16">Advanced Training Features</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <Crosshair className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-3">Scenario Training</h3>
              <p className="text-gray-600">
                Practice in realistic environments designed to simulate real-world situations
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <Swords className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-3">Integrated Defense Skills</h3>
              <p className="text-gray-600">
                Learn comprehensive personal protection and self-defense techniques
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg sm:col-span-2 md:col-span-1">
              <ShieldIcon className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-3">Dynamic Response Training</h3>
              <p className="text-gray-600">
                Develop quick decision-making skills for high-pressure situations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Founded by three seasoned professionals from Israel, our team brings decades of expertise in personal protection and defense training to the international stage. Our roots in Israeli defense methodologies, combined with extensive global experience, allow us to offer a unique and comprehensive approach to civilian defense education.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our backgrounds encompass various specializations—from advanced self-defense techniques to tactical training and specialized instruction. We've collaborated with leading experts worldwide to develop our unique training approach, integrating the most effective elements from multiple disciplines.
              </p>
              <p className="text-gray-700 leading-relaxed">
                At the core of our work is a deep understanding of what it takes to perform at the highest level—discipline, precision, and adaptability. Whether you're seeking personal protection training, security consulting, or skill development, we're here to deliver expert instruction shaped by real-world experience and international best practices.
              </p>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={IMAGES.story.url}
                  alt={IMAGES.story.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-4 sm:p-6 rounded-lg shadow-lg">
                <p className="text-xl sm:text-2xl font-bold">20+ Years</p>
                <p className="text-xs sm:text-sm">Combined Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Form */}
      <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Start Your Training Journey</h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8">
              Fill out the form below to get more information about our training programs
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="program" className="block text-sm font-medium mb-2">Interested Program *</label>
              <select
                id="program"
                required
                value={formData.program}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              >
                <option value="" className="bg-gray-900">Select a program</option>
                <option value="advanced-self-defense" className="bg-gray-900">Advanced Self-Defense</option>
                <option value="personal-protection" className="bg-gray-900">Personal Protection</option>
                <option value="advanced-defense" className="bg-gray-900">Advanced Defense Training</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">Additional Information</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                placeholder="Tell us about your training goals and any specific requirements..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-semibold flex items-center justify-center"
            >
              {isSubmitting ? 'Sending...' : 'Submit Request'} <ChevronRight className="ml-2" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">ACDT</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Advanced Civil Defense Training</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Professional defense training for civilians, focusing on real-world applications and comprehensive skill development.
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#programs" onClick={scrollToPrograms} className="hover:text-white">Programs</a></li>
                <li><a href="#our-story" onClick={scrollToStory} className="hover:text-white">About Us</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="#programs" onClick={scrollToPrograms} className="hover:text-white">Training Schedule</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="mailto:chefinstructor@acdtraining.com" className="flex items-center hover:text-white">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  chefinstructor@acdtraining.com
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} ACDT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
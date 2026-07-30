import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, Phone, Clock, MapPin, Calendar, Users, Award, 
  Search, ShieldAlert, Sun, Moon, Menu, X, ArrowRight, CheckCircle2, 
  Stethoscope, Activity, Building2, UserCheck, FileText, Send, MessageSquare
} from 'lucide-react';

// --- DATA TYPES ---
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  image: string;
}

interface Department {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

// --- MOCK DATA ---
const DEPARTMENTS: Department[] = [
  { id: 'cardiology', name: 'Cardiology', desc: 'Comprehensive heart care, diagnostics, and advanced cardiac surgery.', icon: <HeartPulse className="w-8 h-8 text-sky-600" /> },
  { id: 'neurology', name: 'Neurology', desc: 'Expert care for brain, spinal cord, and nerve disorders.', icon: <Activity className="w-8 h-8 text-sky-600" /> },
  { id: 'orthopedics', name: 'Orthopedics', desc: 'Advanced bone, joint, and sports injury treatments.', icon: <Building2 className="w-8 h-8 text-sky-600" /> },
  { id: 'pediatrics', name: 'Pediatrics', desc: 'Specialized healthcare for infants, children, and adolescents.', icon: <UserCheck className="w-8 h-8 text-sky-600" /> },
  { id: 'dermatology', name: 'Dermatology', desc: 'Comprehensive skin care, cosmetics, and medical procedures.', icon: <Stethoscope className="w-8 h-8 text-sky-600" /> },
  { id: 'emergency', name: 'Emergency Care', desc: '24/7 trauma care with rapid response medical teams.', icon: <ShieldAlert className="w-8 h-8 text-red-500" /> },
];

const DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', experience: '14+ Years', availability: 'Mon - Fri', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300' },
  { id: '2', name: 'Dr. Robert Chen', specialty: 'Neurology', experience: '10+ Years', availability: 'Tue - Sat', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300' },
  { id: '3', name: 'Dr. Elena Rostova', specialty: 'Pediatrics', experience: '8+ Years', availability: 'Mon - Thu', image: 'https://images.unsplash.com/photo-1594824813566-78a0d0a5e888?auto=format&fit=crop&q=80&w=300' },
  { id: '4', name: 'Dr. Marcus Vance', specialty: 'Orthopedics', experience: '16+ Years', availability: 'Wed - Sun', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Appointment Form State
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', department: 'Cardiology', doctor: 'Dr. Sarah Jenkins', date: '', time: '' });

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setFormData({ name: '', email: '', phone: '', department: 'Cardiology', doctor: 'Dr. Sarah Jenkins', date: '', time: '' });
    }, 4000);
  };

  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesDept = selectedDept === 'all' || doc.specialty.toLowerCase() === selectedDept.toLowerCase();
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Top Banner */}
      <div className="bg-sky-900 text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1 text-sky-300" /> Emergency: 1-800-555-0199</span>
            <span className="hidden md:flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-sky-300" /> 123 Healthcare Blvd, Medical City</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="hidden sm:flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-sky-300" /> 24/7 OPD & Emergency</span>
            <button onClick={() => setDarkMode(!darkMode)} className="p-1 rounded bg-sky-800 hover:bg-sky-700 transition">
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className={`sticky top-0 z-40 backdrop-blur-md border-b ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <HeartPulse className="w-8 h-8 text-sky-600" />
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">MediCare</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
              {['Home', 'About Us', 'Doctors', 'Departments', 'Appointment', 'Emergency', 'Services', 'Patient Portal', 'Contact'].map((item) => {
                const pageId = item.toLowerCase().replace(/\s+/g, '');
                return (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(pageId)}
                    className={`transition-colors hover:text-sky-600 ${currentPage === pageId ? 'text-sky-600 font-semibold' : darkMode ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center">
              <button onClick={() => setCurrentPage('appointment')} className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-full font-medium text-sm transition shadow-md shadow-sky-600/20">
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg text-slate-600 dark:text-slate-300">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 pt-2 pb-6 space-y-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            {['Home', 'About Us', 'Doctors', 'Departments', 'Appointment', 'Emergency', 'Services', 'Patient Portal', 'Contact'].map((item) => {
              const pageId = item.toLowerCase().replace(/\s+/g, '');
              return (
                <button
                  key={item}
                  onClick={() => { setCurrentPage(pageId); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2 px-3 rounded-lg text-sm font-medium hover:bg-sky-50 dark:hover:bg-slate-800"
                >
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* --- PAGE CONTENT ROUTER --- */}
      <main className="min-h-[70vh]">

        {/* 1. HOME PAGE */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <section className={`relative py-20 lg:py-28 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-b from-sky-50 to-white'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 px-3 py-1.5 rounded-full text-xs font-semibold">
                    <Award className="w-4 h-4" />
                    <span>#1 Rated Multi-Specialty Hospital</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                    Advanced Healthcare <br />
                    <span className="text-sky-600">Driven by Compassion</span>
                  </h1>
                  <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Providing world-class medical excellence with state-of-the-art diagnostic technology and expert doctors committed to your family's health.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button onClick={() => setCurrentPage('appointment')} className="bg-sky-600 hover:bg-sky-700 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-sky-600/30 flex items-center justify-center space-x-2 transition">
                      <span>Book Appointment</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button onClick={() => setCurrentPage('emergency')} className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-7 py-3.5 rounded-xl font-semibold flex items-center justify-center space-x-2 transition">
                      <ShieldAlert className="w-5 h-5" />
                      <span>Emergency 24/7</span>
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
                    alt="MediCare Hospital" 
                    className="rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 object-cover h-[420px] w-full"
                  />
                </div>
              </div>
            </section>

            {/* Hospital Highlights */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "24/7 Emergency", desc: "Immediate care for critical situations", icon: <ShieldAlert className="w-8 h-8 text-red-500" /> },
                  { title: "Expert Doctors", desc: "50+ board-certified specialists", icon: <Users className="w-8 h-8 text-sky-600" /> },
                  { title: "Modern Equipment", desc: "Next-gen diagnostic technology", icon: <Activity className="w-8 h-8 text-sky-600" /> },
                  { title: "Trusted Care", desc: "Over 100,000 satisfied patients", icon: <Award className="w-8 h-8 text-sky-600" /> }
                ].map((item, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border transition hover:shadow-lg ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Departments */}
            <section className={`py-16 ${darkMode ? 'bg-slate-800/50' : 'bg-slate-100/60'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold mb-3">Our Core Specialties</h2>
                  <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Delivering comprehensive care across multi-specialty disciplines.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {DEPARTMENTS.slice(0, 6).map((dept) => (
                    <div key={dept.id} className={`p-6 rounded-2xl border transition hover:-translate-y-1 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                      <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-900/30 w-fit mb-4">{dept.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                      <p className={`text-sm mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{dept.desc}</p>
                      <button onClick={() => setCurrentPage('departments')} className="text-sky-600 font-semibold text-sm flex items-center hover:underline">
                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. ABOUT US PAGE */}
        {currentPage === 'aboutus' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold mb-4">About MediCare Hospital</h1>
              <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Founded in 1998, MediCare Hospital has grown from a neighborhood clinic into a premier regional medical center serving over 100,000 patients annually.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h3 className="text-2xl font-bold mb-3 text-sky-600">Our Mission</h3>
                <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>To enhance the health and well-being of our community by delivering compassionate, accessible, and high-quality clinical care using state-of-the-art medical technology.</p>
              </div>
              <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h3 className="text-2xl font-bold mb-3 text-sky-600">Our Vision</h3>
                <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>To be the recognized leader in healthcare excellence, clinical research, and patient-centered healing in the region.</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. DOCTORS PAGE */}
        {currentPage === 'doctors' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold mb-2">Our Medical Specialists</h1>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Find the right doctor and book your consultation.</p>
              </div>
              
              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search doctor or specialty..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-9 pr-4 py-2.5 rounded-xl border text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-sky-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'}`}
                  />
                </div>
                <select 
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className={`px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'}`}
                >
                  <option value="all">All Departments</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="orthopedics">Orthopedics</option>
                </select>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDoctors.map((doc) => (
                <div key={doc.id} className={`rounded-2xl border overflow-hidden transition hover:shadow-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <img src={doc.image} alt={doc.name} className="h-48 w-full object-cover" />
                  <div className="p-5 space-y-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300">
                      {doc.specialty}
                    </span>
                    <h3 className="font-bold text-lg pt-1">{doc.name}</h3>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Exp: {doc.experience} • {doc.availability}</p>
                    <button 
                      onClick={() => {
                        setFormData({ ...formData, doctor: doc.name, department: doc.specialty });
                        setCurrentPage('appointment');
                      }}
                      className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-xl text-sm font-semibold transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. APPOINTMENT PAGE */}
        {currentPage === 'appointment' && (
          <div className="max-w-3xl mx-auto px-4 py-12">
            <div className={`p-8 rounded-3xl border shadow-xl ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
              <h1 className="text-3xl font-extrabold mb-2">Book an Appointment</h1>
              <p className={`text-sm mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Fill in the details below to schedule your consultation.</p>

              {bookingSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Appointment Scheduled Successfully!</h4>
                    <p className="text-sm mt-1">We have sent a confirmation email to <strong>{formData.email}</strong>. Our team will contact you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Full Name</label>
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full p-3 rounded-xl border text-sm ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'}`} placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Phone Number</label>
                      <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={`w-full p-3 rounded-xl border text-sm ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'}`} placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Email Address</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full p-3 rounded-xl border text-sm ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'}`} placeholder="john@example.com" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Department</label>
                      <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className={`w-full p-3 rounded-xl border text-sm ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'}`}>
                        {DEPARTMENTS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Preferred Doctor</label>
                      <select value={formData.doctor} onChange={(e) => setFormData({...formData, doctor: e.target.value})} className={`w-full p-3 rounded-xl border text-sm ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'}`}>
                        {DOCTORS.map(doc => <option key={doc.id} value={doc.name}>{doc.name} ({doc.specialty})</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Date</label>
                      <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className={`w-full p-3 rounded-xl border text-sm ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'}`} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Time Slot</label>
                      <input required type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className={`w-full p-3 rounded-xl border text-sm ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'}`} />
                    </div>
                  </div>

                  <button type="submit" className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition">
                    Confirm Appointment
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 5. EMERGENCY PAGE */}
        {currentPage === 'emergency' && (
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
            <div className="bg-red-500 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">24/7 Rapid Response</span>
                <h1 className="text-3xl font-extrabold">Emergency Medical Hotline</h1>
                <p className="text-red-100">For life-threatening conditions, please call our direct trauma response center immediately.</p>
              </div>
              <a href="tel:18005550199" className="bg-white text-red-600 font-extrabold px-8 py-4 rounded-2xl text-xl shadow-lg hover:bg-red-50 transition flex items-center space-x-2">
                <Phone className="w-6 h-6" />
                <span>1-800-555-0199</span>
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h3 className="font-bold text-xl mb-3 flex items-center"><ShieldAlert className="w-5 h-5 text-red-500 mr-2" /> Ambulance Dispatch</h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>GPS-enabled modern ICU ambulances stationed across the city for fast response times.</p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition">
                  Request Ambulance
                </button>
              </div>
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h3 className="font-bold text-xl mb-3 flex items-center"><Activity className="w-5 h-5 text-sky-600 mr-2" /> Blood Bank Status</h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>24/7 availability for all rare blood groups and component transfusion services.</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  All Blood Types Available
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 6. PATIENT PORTAL PAGE */}
        {currentPage === 'patientportal' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between border-b pb-6 mb-6 border-slate-200 dark:border-slate-700">
                <div>
                  <h1 className="text-2xl font-bold">Patient Portal</h1>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Welcome back, Alex Morgan</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 text-xs font-semibold">Patient ID: #MC-88219</span>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Upcoming Appointments</h3>
                <div className={`p-4 rounded-xl border flex justify-between items-center ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <h4 className="font-bold text-sm">Dr. Sarah Jenkins (Cardiology)</h4>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>August 12, 2026 • 10:30 AM</p>
                  </div>
                  <span className="text-xs font-semibold text-sky-600 bg-sky-50 dark:bg-sky-950 px-3 py-1 rounded-full">Confirmed</span>
                </div>

                <h3 className="font-bold text-lg pt-4">Recent Medical Reports</h3>
                <div className="space-y-2">
                  {['Blood Work Panel - July 2026', 'Echocardiogram Diagnostic - May 2026'].map((doc, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border flex justify-between items-center text-sm ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="flex items-center"><FileText className="w-4 h-4 mr-2 text-sky-600" /> {doc}</span>
                      <button className="text-xs font-semibold text-sky-600 hover:underline">Download PDF</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. OTHER PAGES PLACEHOLDER (DEPARTMENTS, SERVICES, CONTACT) */}
        {['departments', 'services', 'contact'].includes(currentPage) && (
          <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-6">
            <h1 className="text-4xl font-extrabold capitalize">{currentPage} Page</h1>
            <p className={`max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Providing complete medical excellence and infrastructure to support your health journey.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left pt-6">
              {[1, 2, 3].map(i => (
                <div key={i} className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <h3 className="font-bold mb-2">Specialized Unit #{i}</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Fully equipped unit staffed with experienced board-certified clinicians.</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Floating Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => alert("Connecting to MediCare Live Assistant...")} className="bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-2xl flex items-center space-x-2 transition">
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      {/* Footer */}
      <footer className={`border-t mt-20 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-900 text-slate-300 border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white">
              <HeartPulse className="w-6 h-6 text-sky-400" />
              <span className="text-xl font-bold">MediCare</span>
            </div>
            <p className="text-xs text-slate-400">Leading multi-specialty healthcare provider dedicated to superior clinical outcomes and compassionate patient care.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentPage('aboutus')} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => setCurrentPage('doctors')} className="hover:text-white">Our Doctors</button></li>
              <li><button onClick={() => setCurrentPage('appointment')} className="hover:text-white">Book Appointment</button></li>
              <li><button onClick={() => setCurrentPage('emergency')} className="hover:text-white">Emergency Services</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Departments</h4>
            <ul className="space-y-2 text-xs">
              <li>Cardiology</li>
              <li>Neurology & Spine</li>
              <li>Orthopedics</li>
              <li>Pediatrics Care</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Newsletter</h4>
            <p className="text-xs mb-3">Subscribe for health tips and updates.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="px-3 py-2 rounded-l-lg bg-slate-800 text-white text-xs border-none focus:outline-none w-full" />
              <button className="bg-sky-600 hover:bg-sky-700 px-3 rounded-r-lg text-white"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 text-center py-4 text-xs text-slate-500">
          © {new Date().getFullYear()} MediCare Hospital. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

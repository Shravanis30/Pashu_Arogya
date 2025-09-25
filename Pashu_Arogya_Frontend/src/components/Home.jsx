import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaChartLine, FaUserCheck, FaLock, FaBrain, FaUsers, FaArrowRight, FaDatabase, FaClock, FaTachometerAlt, FaExclamationTriangle, FaFlask, FaCheck } from 'react-icons/fa';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
// import Hero1 from "../../public/Page1.pjg"
// import Hero2 from "../../public/Page2.pjg"
// import Hero3 from "../../public/Page3.pjg"
// Custom component for the Image Carousel
const HeroCarousel = ({ navigate }) => {
    const images = [
        { src: '/Page2.jpg', alt: 'Farm Monitoring', title: 'Real-time Monitoring of Livestock Health' },
        { src: '/Page1.jpg', alt: 'Vet Verification', title: 'Ensuring Prescriptions are Safe and Compliant' },
        { src: '/Page3.jpg', alt: 'Data Analytics', title: 'Data-Driven Governance for Animal Welfare' },
        { src: '/Page4.jpg', alt: 'Data Analytics', title: 'Data-Driven Governance for Animal Welfare' },
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 4000); // Auto-scroll every 4 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <header className="relative h-[85vh] overflow-hidden">
            {/* Carousel Slides */}
            {images.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover filter brightness-50"
                    />
                </div>
            ))}

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                <FaShieldAlt className="text-orange-400 text-7xl mx-auto mb-4 animate-bounce" />
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Digital Farm Management Portal</h1>
                <p className="text-xl md:text-2xl max-w-3xl mb-10 drop-shadow-md">
                    Comprehensive livestock monitoring and regulatory oversight system for government authorities
                </p>
                <div className="space-x-6">
                    <button
                        onClick={() => navigate('/landing')}
                        className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-orange-600 transition-colors shadow-2xl"
                    >
                        Authority Login
                    </button>
                    <a href="#features" className="bg-white text-blue-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-200 transition-colors shadow-2xl">
                        Learn More
                    </a>
                </div>
            </div>

            {/* Carousel Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-white bg-opacity-50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </header>
    );
};


const Home = () => {
    const navigate = useNavigate();

    const features = [
        { title: 'Real-time Monitoring', desc: 'Monitor antimicrobial usage trends, compliance status, and critical alerts across all registered farms in real time.', icon: FaChartLine, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-500' },
        { title: 'Vet Verification System', desc: 'Streamlined workflow for verifying and approving veterinarian registrations with automated certificate issuance.', icon: FaUserCheck, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-500' },
        { title: 'Blockchain Transparency', desc: 'Tamper-proof records of all prescriptions, treatments, and compliance data stored on blockchain ledger.', icon: FaLock, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-500' },
        { title: 'AI-Powered Analytics', desc: 'Advanced anomaly detection and predictive analytics for compliance monitoring and risk forecasting.', icon: FaBrain, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-500' },
        { title: 'Advanced Dashboards', desc: 'Interactive dashboards with filters for species, regions, and time periods for comprehensive data analysis.', icon: FaTachometerAlt, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-500' },
        { title: 'Role-Based Access', desc: 'Hierarchical access control for Central, State, and District authorities with appropriate data visibility.', icon: FaUsers, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-500' },
    ];

    const techStack = [
        { title: 'Cloud Database', subtitle: 'AWS DynamoDB for scalable data storage', icon: FaDatabase, color: 'text-blue-500' },
        { title: 'AI/ML Analytics', subtitle: 'TensorFlow & Keras for predictive insights', icon: FaBrain, color: 'text-purple-500' },
        { title: 'Blockchain Security', subtitle: 'Immutable record keeping', icon: FaLock, color: 'text-green-500' },
        { title: 'Real-Time Updates', subtitle: 'Instant alerts and notifications', icon: FaClock, color: 'text-red-500' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Nav Bar (Simplified as a top bar) */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-10 py-3 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <FaShieldAlt className="text-orange-500 text-xl" />
                    <span className="text-xl font-semibold text-gray-800">Digital Farm Portal</span>
                </div>
                <div className="space-x-4 flex items-center">
                    <a href="#" className="text-gray-600 hover:text-orange-500">Home</a>
                    <a href="#features" className="text-gray-600 hover:text-orange-500">Features</a>
                    <a href="#about" className="text-gray-600 hover:text-orange-500">About</a>
                    <button
                        onClick={() => navigate('/landing')} // Navigate to the Authority Level Selection page
                        className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                    >
                        Authority Login
                    </button>
                </div>
            </nav>

            {/* 1. HERO SECTION (Auto-scrolling Image Carousel) */}
            <HeroCarousel navigate={navigate} />

            {/* 2. NEW: MRL and AMU Information Section */}
            <section className="py-20 bg-orange-50">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-10">
                        <span className="text-sm font-bold text-orange-600 bg-orange-200 px-3 py-1 rounded-full inline-block">GOVERNANCE & SAFETY</span>
                        <h2 className="text-4xl font-bold text-gray-800">Monitoring MRL and Fighting AMR in Livestock</h2>

                        <p className="text-gray-700 leading-relaxed">
                            The portal is designed to monitor **Maximum Residue Limits (MRL)** and **Antimicrobial Usage (AMU)** in livestock, tackling a critical public health issue. Our goal is to ensure a safer food supply by tracking every treatment.
                        </p>

                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <FaExclamationTriangle className="text-xl text-red-500 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold">The Challenge: Antibiotic Residues</h3>
                                    <p className="text-sm">Today, 16-21% of milk in India still shows antibiotics, and misuse has led to 39% of livestock *E. coli* becoming drug resistant.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <FaFlask className="text-xl text-blue-500 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold">Our Solution: End-to-End Tracking</h3>
                                    <p className="text-sm">We record and track the types, dosages, frequency, and reasons for antimicrobial usage, integrating with veterinary logs for compliance validation.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                {/* FIXED: Replaced FaCheckLine with FaCheck */}
                                <FaCheck className="text-xl text-green-500 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold">Compliance & Safety</h3>
                                    <p className="text-sm">The system aligns with FSSAI, WHO, and OIE standards, boosting India's food safety and export credibility.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-2xl">
                        <img
                            src="/Page8.png"
                            alt="Livestock Monitoring"
                            // W-full ensures it takes 100% of the column width
                            // H-full ensures it takes 100% of the column height, scaling well within the grid
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Comprehensive Authority Portal Features</h2>
                    <p className="text-gray-500 mb-12">Advanced tools for real-time monitoring, compliance tracking, and data-driven decision making</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className={`p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 ${feature.border}`}>
                                <div className={`p-3 rounded-full ${feature.bg} inline-block mb-4`}>
                                    <feature.icon className={`text-3xl ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Access Levels Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Authority Access Levels</h2>
                    <p className="text-gray-500 mb-12">Hierarchical data access based on administrative jurisdiction</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Central Authority Card */}
                        <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-red-500">
                            <FaShieldAlt className="text-red-500 text-3xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Central Authority</h3>
                            <p className="text-gray-600 text-sm mb-4">National-level oversight with access to all states' data and comprehensive analytics.</p>
                            <ul className="text-left text-sm text-gray-700 space-y-1">
                                <li className="flex items-center"><FaArrowRight className="text-xs mr-2 text-green-500" /> All states data visibility</li>
                                <li className="flex items-center"><FaArrowRight className="text-xs mr-2 text-green-500" /> National policy insights</li>
                                <li className="flex items-center"><FaArrowRight className="text-xs mr-2 text-green-500" /> Cross-state comparisons</li>
                            </ul>
                        </div>
                        {/* State Authority Card */}
                        <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-green-500">
                            <FaShieldAlt className="text-green-500 text-3xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">State Authority</h3>
                            <p className="text-gray-600 text-sm mb-4">State-level monitoring with access to all districts within the state jurisdiction.</p>
                            <ul className="text-left text-sm text-gray-700 space-y-1">
                                <li className="flex items-center"><FaArrowRight className="text-xs mr-2 text-green-500" /> All districts data access</li>
                                <li className="flex items-center"><FaArrowRight className="text-xs mr-2 text-green-500" /> State-wide analytics</li>
                                <li className="flex items-center"><FaArrowRight className="text-xs mr-2 text-green-500" /> District comparisons</li>
                            </ul>
                        </div>
                        {/* District Authority Card */}
                        <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-orange-500">
                            <FaShieldAlt className="text-orange-500 text-3xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">District Authority</h3>
                            <p className="text-gray-600 text-sm mb-4">District-level oversight with access to all villages and local farm data.</p>
                            <ul className="text-left text-sm text-gray-700 space-y-1">
                                <li className="flex items-center"><FaArrowRight className="text-xs mr-2 text-green-500" /> Village-level data access</li>
                                <li className="flex items-center"><FaArrowRight className="text-xs mr-2 text-green-500" /> Local farm monitoring</li>
                                <li className="flex items-center"><FaArrowRight className="text-xs mr-2 text-green-500" /> Ground-level insights</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Stack Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Advanced Technology Stack</h2>
                    <p className="text-gray-500 mb-12">Built with cutting-edge technologies for scalability, security, and performance</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {techStack.map((tech, index) => (
                            <div key={index} className="p-6 text-center">
                                <tech.icon className={`text-5xl mx-auto mb-3 ${tech.color}`} />
                                <h3 className="text-lg font-semibold text-gray-800">{tech.title}</h3>
                                <p className="text-gray-600 text-sm">{tech.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white p-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-3">Digital Farm Management Portal</h3>
                        <p className="text-sm opacity-80">Comprehensive livestock monitoring and regulatory oversight system enabling data-driven governance and compliance management.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-1 text-sm opacity-80">
                            <li><a href="#">Home</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Contact</h4>
                        <p className="text-sm opacity-80 flex items-center"><AiOutlineMail className="mr-2" /> support@digitalfarm.gov.in</p>
                        <p className="text-sm opacity-80 flex items-center mt-2"><AiOutlinePhone className="mr-2" /> 1800-XXX-XXXX</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs opacity-60">
                    &copy; 2024 Digital Farm Management Portal. Government of India. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;
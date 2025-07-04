import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-cyan-500 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HD</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Harshdeepsinh Blog
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Exploring the world of web development, sharing insights, tutorials, and the latest trends in technology.
            </p>
            <div className="flex space-x-4 pt-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-slate-300 hover:text-white transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300 mr-0 group-hover:mr-3 rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-slate-300 hover:text-white transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300 mr-0 group-hover:mr-3 rounded-full"></span>
                  Articles
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-slate-300 hover:text-white transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300 mr-0 group-hover:mr-3 rounded-full"></span>
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full mr-3"></span>
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-white transition-all duration-300 flex items-center group"
                >
                  <span className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </span>
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-white transition-all duration-300 flex items-center group"
                >
                  <span className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </span>
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-white transition-all duration-300 flex items-center group"
                >
                  <span className="w-5 h-5 mr-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </span>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Harshdeepsinh Blog. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
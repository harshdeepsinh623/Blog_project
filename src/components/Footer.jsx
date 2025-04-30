import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Dev Blog</h3>
            <p className="text-gray-600">Exploring the world of web development, one post at a time.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-blue-600">Articles</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">GitHub</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Dev Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
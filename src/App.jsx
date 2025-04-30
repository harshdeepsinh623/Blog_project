import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import './App.css';

const Home = () => {
  const [featuredPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and start building awesome applications.",
      date: "2025-04-30"
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      excerpt: "A comprehensive guide to using Tailwind CSS in your projects.",
      date: "2025-04-29"
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Welcome to Dev Blog</h1>
        <p className="text-xl text-gray-600 mb-8">Exploring the world of web development, one post at a time.</p>
        <Link 
          to="/blog" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore Articles
        </Link>
      </div>

      <div className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-blue-600 hover:text-blue-700">Read More →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Our Blog</h1>
      <p className="text-gray-600 text-lg mb-4">
        Welcome to our blog! We're passionate about sharing knowledge and insights
        about web development, programming, and technology.
      </p>
      <p className="text-gray-600 text-lg">
        Our team of experienced developers and tech enthusiasts are here to bring
        you the latest trends, tutorials, and best practices in the world of
        software development.
      </p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

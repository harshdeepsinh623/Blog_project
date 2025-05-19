import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import AddBlog from './components/AddBlog';
import Hero from './components/Hero';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

// Sample data for initial blog posts
const initialPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and start building awesome applications.",
    date: "2025-04-30",
    author: "Alex Johnson",
    content: "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM when data changes. In this tutorial, we'll cover the fundamentals of React, including components, props, state, and hooks.",
    image: "https://devbeep.com/wp-content/uploads/2022/11/React-JS.jpg",
    tags: ["React", "JavaScript", "Web Development"]
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    excerpt: "A comprehensive guide to using Tailwind CSS in your projects.",
    date: "2025-04-29",
    author: "Sarah Wilson",
    content: "Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without ever leaving your HTML. In this guide, we'll explore how to set up Tailwind in your project, use its utility classes effectively, and customize it to fit your design needs.",
    image: "https://miro.medium.com/v2/resize:fit:1081/1*GGyybFt9PbH5StBDgLb2gQ.png",
    tags: ["CSS", "Tailwind", "Frontend"]
  },
  {
    id: 3,
    title: "Building RESTful APIs with Node.js",
    excerpt: "Learn how to create robust backend services using Node.js and Express.",
    date: "2025-04-27",
    author: "Michael Chen",
    content: "Node.js is a powerful runtime for building server-side applications with JavaScript. Combined with Express, it provides a great foundation for creating RESTful APIs. This tutorial walks through setting up a Node.js server, defining routes, connecting to a database, and implementing CRUD operations.",
    image: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1721464681/catalog/1689187904932249600/p1baciyspypyoqolxtuh.jpg",
    tags: ["Node.js", "API", "Backend"]
  }
];

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  
  useEffect(() => {
    // Get blog posts from localStorage or use initial data
    const storedPosts = localStorage.getItem('blogPosts');
    const posts = storedPosts ? JSON.parse(storedPosts) : initialPosts;
    
    // Display 3 most recent posts as featured
    setFeaturedPosts(posts.slice(0, 3));
  }, []);

  return (
    <div>
      <Hero />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-4">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                    src={post.image} 
                    alt={`Featured blog post thumbnail for ${post.title}`} 
                    className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags && post.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-blue-600 hover:text-blue-700 font-medium">Read More →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const teamMembers = [
    {
      image: "https://www.shutterstock.com/image-photo/using-laptop-show-icon-address-600nw-2521386695.jpg"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">About Our Blog</h1>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 grid grid-cols-1 gap-1">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-132 h-132 rounded-full object-cover mx-auto mb-2"
                />
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="md:w-1/2">
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              Welcome to Harshdeepsinh Blog! We're passionate about sharing knowledge and insights
              about web development, programming, and technology.
            </p>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Our team of experienced developers and tech enthusiasts are here to bring
              you the latest trends, tutorials, and best practices in the world of
              software development.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="font-semibold">200+ Articles</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="font-semibold">50k+ Readers</span>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="font-semibold">Global Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  // Initialize blog posts in localStorage if they don't exist
  useEffect(() => {
    if (!localStorage.getItem('blogPosts')) {
      localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/add-blog" element={<PrivateRoute><AddBlog /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
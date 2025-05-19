import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { currentUser, logout, getWatchlist, removeFromWatchlist } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Simulated blog posts data (in a real app, this would come from Firebase)
    const posts = [
      {
        id: 1,
        title: "Getting Started with React",
        excerpt: "Learn the basics of React and start building awesome applications.",
        date: "2025-04-30",
        readTime: "5 min read",
        category: "Development"
      },
      {
        id: 2,
        title: "Mastering Tailwind CSS",
        excerpt: "A comprehensive guide to using Tailwind CSS in your projects.",
        date: "2025-04-29",
        readTime: "8 min read",
        category: "Design"
      },
      {
        id: 3,
        title: "Modern Web Development",
        excerpt: "Explore the latest trends in web development.",
        date: "2025-04-28",
        readTime: "12 min read",
        category: "Technology"
      }
    ];
    setBlogPosts(posts);

    // Load user's watchlist
    const loadWatchlist = async () => {
      try {
        const watchlistIds = await getWatchlist();
        setWatchlist(watchlistIds);
      } catch (err) {
        setError('Failed to load watchlist');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWatchlist();
  }, [getWatchlist]);

  const handleRemoveFromWatchlist = async (blogId) => {
    try {
      await removeFromWatchlist(blogId);
      setWatchlist(prev => prev.filter(id => id !== blogId));
    } catch (err) {
      setError('Failed to remove from watchlist');
      console.error(err);
    }
  };

  const watchlistItems = blogPosts.filter(post => watchlist.includes(post.id));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Development': 'bg-blue-100 text-blue-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Technology': 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and watchlist</p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-sm">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                  {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {currentUser?.displayName || 'User'}
              </h2>
              <p className="text-gray-600 mb-6">{currentUser?.email}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{watchlistItems.length}</div>
                  <div className="text-sm text-blue-800">Watchlist</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    {currentUser?.metadata?.creationTime ? 
                      Math.floor((new Date() - new Date(currentUser.metadata.creationTime)) / (1000 * 60 * 60 * 24)) : 0}
                  </div>
                  <div className="text-sm text-purple-800">Days Member</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Link 
                  to="/" 
                  className="block w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Back to Home
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Account Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Account Details</h3>
              <div className="space-y-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Display Name</p>
                    <p className="text-gray-600">{currentUser?.displayName || 'Not set'}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Email Address</p>
                    <p className="text-gray-600">{currentUser?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Member Since</p>
                    <p className="text-gray-600">
                      {currentUser?.metadata?.creationTime ? 
                        formatDate(currentUser.metadata.creationTime) : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Watchlist Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">My Watchlist</h2>
              <p className="text-gray-600 mt-1">Your saved articles and posts</p>
            </div>
            <div className="text-2xl">📚</div>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-50 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                      <div className="flex space-x-4">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="ml-6 space-y-2">
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : watchlistItems.length > 0 ? (
            <div className="space-y-6">
              {watchlistItems.map(post => (
                <div key={post.id} className="group bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-102">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm">{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {formatDate(post.date)}
                      </div>
                    </div>
                    <div className="ml-6 flex flex-col space-y-3">
                      <Link 
                        to={`/blog/${post.id}`}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-center font-semibold"
                      >
                        Read
                      </Link>
                      <button 
                        onClick={() => handleRemoveFromWatchlist(post.id)}
                        className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Your watchlist is empty</h3>
              <p className="text-gray-600 mb-6">Start exploring and add interesting articles to your watchlist!</p>
              <Link 
                to="/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
              >
                Explore Articles
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
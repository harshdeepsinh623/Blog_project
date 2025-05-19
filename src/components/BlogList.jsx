import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BlogList = () => {
  const [sortBy, setSortBy] = useState('newest');
  const { currentUser, addToWatchlist, removeFromWatchlist, getWatchlist } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posts] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and start building awesome applications.",
      content: "React is a powerful JavaScript library for building user interfaces...",
      date: "2025-04-30"
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      excerpt: "A comprehensive guide to using Tailwind CSS in your projects.",
      content: "Tailwind CSS is a utility-first CSS framework that can speed up your development...",
      date: "2025-04-29"
    },
    {
      id: 3,
      title: "Modern Web Development",
      excerpt: "Explore the latest trends in web development.",
      content: "The web development landscape is constantly evolving...",
      date: "2025-04-28"
    }
  ]);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      }
      return new Date(a.date) - new Date(b.date);
    });
  }, [posts, sortBy]);

  useEffect(() => {
    // Load user's watchlist when component mounts
    const loadWatchlist = async () => {
      if (currentUser) {
        try {
          const watchlistIds = await getWatchlist();
          setWatchlist(watchlistIds);
        } catch (error) {
          console.error('Error loading watchlist:', error);
        }
      }
    };
    
    loadWatchlist();
  }, [currentUser, getWatchlist]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Latest Articles</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-gray-600">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-1 bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      
      <div className="grid gap-6">
        {sortedPosts.map(post => (
          <article key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{post.date}</span>
              <div className="flex space-x-2">
                {currentUser && (
                  <button 
                    onClick={async (e) => {
                      e.preventDefault(); // Prevent navigation
                      setLoading(true);
                      try {
                        if (watchlist.includes(post.id)) {
                          await removeFromWatchlist(post.id);
                          setWatchlist(prev => prev.filter(id => id !== post.id));
                        } else {
                          await addToWatchlist(post.id);
                          setWatchlist(prev => [...prev, post.id]);
                        }
                      } catch (error) {
                        console.error('Error updating watchlist:', error);
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className={`flex items-center space-x-1 px-3 py-2 rounded ${watchlist.includes(post.id) ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'}`}
                  >
                    <svg className="w-4 h-4" fill={watchlist.includes(post.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span className="sr-only">{watchlist.includes(post.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                  </button>
                )}
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
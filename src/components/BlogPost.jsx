import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser, addToWatchlist, removeFromWatchlist, getWatchlist } = useAuth();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get posts from localStorage or use empty array if none exist
    const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const foundPost = storedPosts.find(p => p.id === parseInt(id));
    setPost(foundPost);
    
    // Check if post is in user's watchlist
    const checkWatchlist = async () => {
      if (currentUser) {
        try {
          const watchlist = await getWatchlist();
          setIsInWatchlist(watchlist.includes(parseInt(id)));
        } catch (error) {
          console.error('Error checking watchlist:', error);
        }
      }
    };
    
    checkWatchlist();
  }, [id, currentUser, getWatchlist]);

  if (!post) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <article className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>

        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
        <div className="flex items-center text-gray-600 mb-8 border-b pb-4">
          <span className="font-medium">{post.author}</span>
          <span className="mx-2">•</span>
          <span>{post.date}</span>
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Share this article</h2>
            {currentUser && (
              <button 
                onClick={async () => {
                  setLoading(true);
                  try {
                    if (isInWatchlist) {
                      await removeFromWatchlist(post.id);
                      setIsInWatchlist(false);
                    } else {
                      await addToWatchlist(post.id);
                      setIsInWatchlist(true);
                    }
                  } catch (error) {
                    console.error('Error updating watchlist:', error);
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className={`flex items-center space-x-1 px-4 py-2 rounded ${isInWatchlist ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                <svg className="w-5 h-5" fill={isInWatchlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>{isInWatchlist ? 'Saved to Watchlist' : 'Save to Watchlist'}</span>
              </button>
            )}
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-700">Twitter</button>
            <button className="text-blue-600 hover:text-blue-700">LinkedIn</button>
            <button className="text-blue-600 hover:text-blue-700">Facebook</button>
          </div>
        </div>
      </article>
      <BackToTop />
    </>
  );
};

export default BlogPost;
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    // Simulating fetching post data
    const posts = [
      {
        id: 1,
        title: "Getting Started with React",
        content: `React is a powerful JavaScript library for building user interfaces. It allows you to create reusable UI components that manage their own state.

In this article, we'll cover:
- Setting up a React project
- Understanding components
- State and props
- Hooks and their usage
- Best practices for React development`,
        date: "2025-04-30",
        author: "Harshdeepsinh Gohil"
      },
      {
        id: 2,
        title: "Mastering Tailwind CSS",
        content: `Tailwind CSS is a utility-first CSS framework that can speed up your development process significantly.

Key topics covered:
- Setting up Tailwind CSS
- Understanding utility classes
- Responsive design with Tailwind
- Custom configuration
- Performance optimization`,
        date: "2025-04-29",
        author: "Harshdeepsinh Gohil"
      },
      {
        id: 3,
        title: "Modern Web Development",
        content: `The web development landscape is constantly evolving with new tools and technologies.

We'll explore:
- Modern JavaScript features
- Popular frameworks and libraries
- Build tools and bundlers
- Development workflows
- Testing and deployment strategies`,
        date: "2025-04-28",
        author: "Harshdeepsinh Gohil"
      }
    ];

    const foundPost = posts.find(p => p.id === parseInt(id));
    setPost(foundPost);
  }, [id]);

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
          <h2 className="text-2xl font-bold mb-4">Share this article</h2>
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
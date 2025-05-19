import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const AddBlog = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    image: '/api/placeholder/800/400'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get existing posts or initialize empty array
      const existingPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
      
      // Create new post object
      const newPost = {
        id: Date.now(), // Use timestamp as unique ID
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        author: currentUser?.displayName || 'Anonymous User',
        image: formData.image,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Convert comma-separated tags to array
      };
      
      // Add new post to beginning of array (newest first)
      const updatedPosts = [newPost, ...existingPosts];
      
      // Save to localStorage
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      toast.success('Blog post published successfully!');
      navigate('/blog');
    } catch (error) {
      toast.error('Failed to publish blog post');
      console.error('Error saving blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Create New Blog Post</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-gray-700 font-medium mb-2">Excerpt</label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief summary of your post"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your blog post content here..."
              required
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter tags separated by commas (e.g., React, JavaScript, Web Development)"
            />
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="px-6 py-2 mr-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
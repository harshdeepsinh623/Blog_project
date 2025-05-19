import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Harshdeepsinh Blog</h1>
            <p className="text-xl mb-8 text-blue-100">
              Exploring the world of web development, one post at a time.
              Join our community of developers and tech enthusiasts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/blog" 
                className="inline-block bg-white text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Explore Articles
              </Link>
              <Link 
                to="/add-blog" 
                className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition-colors font-medium"
              >
                Write a Post
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <div className="bg-white p-1 rounded-lg shadow-xl">
              <img 
                src="https://myvistage.com/hub/wp-content/uploads/sites/4/2022/11/22_222_0098-Tech-trends-Blog-1024x686-1.jpg" 
                alt="Blog Hero" 
                className="rounded-lg rounded-full" 
              />
            </div>
          </div>
        </div>
        
        <div className="mt-12 md:mt-16 flex justify-center gap-6 md:gap-8 flex-wrap">
          <div className="text-center px-4 py-2">
            <div className="text-3xl md:text-4xl font-bold">200+</div>
            <div className="text-blue-200 text-sm md:text-base">Articles</div>
          </div>
          <div className="text-center px-4 py-2">
            <div className="text-3xl md:text-4xl font-bold">50k+</div>
            <div className="text-blue-200 text-sm md:text-base">Monthly Readers</div>
          </div>
          <div className="text-center px-4 py-2">
            <div className="text-3xl md:text-4xl font-bold">100+</div>
            <div className="text-blue-200 text-sm md:text-base">Contributors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
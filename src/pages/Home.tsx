import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
import axios from "axios";

// Define an interface for the post object
interface Post {
  _id: string; // Assuming _id is a string
  title: string;
  content: string;
  category: string;
  image: string;
  // Add other properties as needed
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Provide type annotation for posts

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts/all');
        console.log(res.data);
        setPosts(res.data); // Set fetched posts in the state
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlog();
  }, []);

  // Define state to toggle between showing full content and truncated content
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);

  // Function to toggle the expansion state of a post
  

  // Function to check if a post is expanded
  const isExpanded = (postId: string) => expandedPosts.includes(postId);

  // Function to truncate the content to show only a few lines
  const truncateContent = (content: string, maxLength: number) =>
    content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-cover" src={new URL(post.image).toString()} alt="Blog Post" />

            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              {/* Show truncated content if not expanded */}
              <div className="text-sm text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: isExpanded(post._id) ? post.content : truncateContent(post.content, 150) }} />
              {/* Show "Read More" button if content is truncated */}
              
              {/* Link to the post detail page */}
              <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline ml-2">
                Continue Reading
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

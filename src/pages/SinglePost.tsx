import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment'; // For date formatting
import axios, { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  author: string;
  publishedAt: string; // Assuming publishedAt is a string in ISO 8601 format
  image: string;
}

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>(); // Define postId as string
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [id, setId] = useState('')
  const access = useSelector((state: RootState) => state.user.token);
  const navigate = useNavigate();
  const userId = useSelector((state:RootState)=>state.user.id)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response: AxiosResponse<Post> = await axios.get<Post>(`http://localhost:5000/api/post/${postId}`, {
          headers: {
            Authorization: access,
          },
        });
        console.log(response.data); // Log the response data

        setTitle(response.data.title);
        setContent(response.data.content);
        setDate(response.data.publishedAt);
        setImage(response.data.image);
        setAuthor(response.data.author);
        setId(response.data.authorId)
        setIsAuthor(response.data.author === id); // Assuming userId is retrieved from the Redux store or auth context
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [postId, access, userId]);
   // Include postId, access, and userId in the dependency array

  const handleEdit = () => {
    // Navigate to the edit page with postId as a parameter
    navigate(`/edit/${postId}`);
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend to delete the post
      await axios.delete(`http://localhost:5000/api/post/${postId}`, {
        headers: {
          Authorization: access,
        },
      });
      // Redirect to the home page or a different page after successful deletion
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        {isAuthor && (
          <div className="mb-4">
            <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        )}
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500 mb-2">By {author} | Published {moment(date).fromNow()}</p>
        <img src={image} alt="Blog Post" className="w-full h-auto rounded-lg mb-4" />
        <div className="text-lg" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default BlogPost;

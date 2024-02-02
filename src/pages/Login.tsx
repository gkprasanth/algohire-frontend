import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setToken, setUser, setEmail, setId } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedState = useSelector((state: RootState) => state.user);
  console.log(savedState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<{ email: string, name: string, access_token: string, id:string }>('http://localhost:5000/api/auth/login', formData);

      dispatch(setAuth());
      dispatch(setEmail(response.data.email));
      dispatch(setUser(response.data.name));
      dispatch(setToken(response.data.access_token));
      dispatch(setId(response.data.id));

      setFormData({
        email: '',
        password: ''
      });
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  from-blue-500 to-indigo-500">
      <form className="bg-white shadow-md rounded px-9 w-[30%] pt-6 pb-8 mb-4" onSubmit={handleSubmit} >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username"  >
            email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

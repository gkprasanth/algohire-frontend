import React, { useState, FormEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { categories } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "../store";


const Write: React.FC = () => {
    const state: any = useLocation().state || {};
    const [value, setValue] = useState<string>(state?.desc || "");
    const [title, setTitle] = useState<string>(state?.title || "");
    const [link, setLink] = useState<string>(state?.link || "");
    const [cat, setCat] = useState<string>(state?.cat || "");
    // const navigate = useNavigate();

    const author = useSelector((state: RootState) => state.user.id);

    const handleClick = async (e: FormEvent) => {
        e.preventDefault();
        console.log(cat)
        try {
            const response = await axios.post("http://localhost:5000/api/posts/create", {
                title: title,
                content: value, // Use the value directly without sanitizing to preserve line breaks and formatting
                author: author,
                image: link,
                category: cat
            });

            console.log("Post created successfully:", response.data);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="add mx-auto w-3/4 mt-10">
            <div className="content">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full border rounded px-3 py-2 mb-4"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="block w-full border rounded px-3 py-2 mb-4"
                />
                <div className="editorContainer border rounded mb-4">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={{ toolbar: true }} // Enable toolbar for basic text editing
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1 className="mb-2">Publish</h1>
                    <span className="block mb-2">
                        <b>Status: </b> Draft
                    </span>
                    <span className="block mb-4">
                        <b>Visibility: </b> Public
                    </span>

                </div>
                <div className="item">
                    <h1 className="mb-2">Category</h1>
                    <div className="cat flex gap-7 mb-5">
                        <select
                            value={cat}
                            onChange={(e) => setCat(e.target.value)}
                            className="block appearance-none w-[100px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight  focus:bg-white focus:border-gray-500"
                        >
                            {categories.map((cate) => (
                                <option key={cate.name} value={cate.name}>
                                    {cate.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="buttons">
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">
                        Save as a draft
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleClick}
                    >
                        Publish
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Write;

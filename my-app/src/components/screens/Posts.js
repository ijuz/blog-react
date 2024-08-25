import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './post.css';
import axios from 'axios';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/v1/blog/')
            .then((response) => {
                setPosts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const PostsData = () => {
        if (message) {
            return <div>{message}</div>;
        }
        return posts.map((list) => (
            <li key={list.id} className='li'>
                <Link className='link-component' to={`/posts/${list.id}`}>
                    <div className='image-container'>
                        <img src={list.featured_image} alt='feature' />
                    </div>
                    <div className='details'>
                        <h2 className='title text'>{list.title}</h2>
                        <div className='list-likes'>
                            <span>Likes</span>
                            <span className='text'>{list.likes}</span>
                        </div>
                        <div className='about'>
                            <p className='paragraph-tag text'>{list.short_description}</p>
                        </div>
                        <div className='author'>
                            <h3 className='text'>{list.author}</h3>
                        </div>
                    </div>
                    <div className='date-content'>
                        <div className='text'>
                            {list.published_date}
                        </div>
                    </div>
                </Link>
            </li>
        ));
    }

    const searchButton = (e) => {
        e.preventDefault();
        const url = 'http://127.0.0.1:8000/api/v1/blog/search/';
        const params = { params: { query: search } };
        axios.get(url, params)
            .then((response) => {
                const data = response.data.data;
                if (data.length === 0) {
                    setMessage("No data found");
                } else {
                    setMessage('');
                }
                setPosts(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className='main-container'>
                <div className='search'>
                    <form onSubmit={searchButton}>
                        <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search posts...' />
                        <button type='submit'>Search</button>
                    </form>
                </div>
                <ul className='ul'>
                    {PostsData()}
                </ul>
            </div>
        </>
    );
}

export default Posts;

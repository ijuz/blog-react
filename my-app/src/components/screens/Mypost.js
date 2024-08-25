import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import './post.css'
import { Button } from '@mui/material';

function Mypost() {
  const [Data, setData] = useState([]);
  const { userdata } = useContext(UserContext);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/blog/mypost/', {
          headers: {
            Authorization: `Bearer ${userdata?.access}`,
          },
        });
        const activePost = response.data.data.filter(post=>post.is_deleted === false)
        setData(activePost);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally, handle the error (e.g., set an error state, show an error message)
      }
    };
console.error("net work is slow")
    
    fetchData()
    
    
  }, [userdata?.access]);
  // Depend on `userdata` to re-fetch when it changes
  const handleDlt=(id)=>{
        axios.post(`http://127.0.0.1:8000/api/v1/blog/edit/${id}/`,{"is_deleted":true},{
            headers:{
                Authorization:`Bearer ${userdata?.access}`,
            }
        }).then((response)=>{
            const ubdatedData = Data.filter(post=>post.id !== id)
            setData(ubdatedData)
            
        }).catch((error)=>{
            console.log(error)
        })
  } 
  const renderData = ()=>{
    return Data.map((list) => (
      <li key={list.id} className='li'>
      <div className='btn-handle'>
        <div>
        <Button onClick={()=>handleDlt(list.id)}>
            delete post
        </Button>
        </div>
        <div>
          <Link to={`/edit/${list.id}/`}>
            Edit Post
          </Link>
        </div>
      </div>
      <Link className='link-component' to={`/posts/${list.id}`}>
        <div className='image-container'>
            <img src={list.featured_image} alt='feature'/>
        </div>
        <div className='details'>
          <div className='date'>
            <h2 className='text'>{list.title}</h2>
          </div>
          <div className='list-likes'>
            <span>Likes</span>
            <span className='text'>{list.likes}</span> 
          </div>
          <div className='about'>
                <span className='paragraph-tag text'><p>{list.short_description}</p></span>
            </div>
          <div className='auther'>
              <h3 className='text'>{list.author}</h3>
          </div>
        </div>
        <div className='date-content'>
            <div className='title text'>
              {list.published_date}
            </div>
        </div>
      </Link>
    </li>
      ))
  }    
  if (!Data.length)return(
    <div>
        <Link to='/create-blog'>
            <p>you have a no post create one ?</p>
        </Link>
    </div>
  )
  return (
    <div className='main-container'>
       <ul className='ul'>
       {renderData()}
      </ul>
    </div>
  );
}

export default Mypost;


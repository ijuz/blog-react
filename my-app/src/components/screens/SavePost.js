import axios from 'axios'
import React,{useEffect,useContext, useState} from 'react'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom'
import './post.css'


function SavePost() {
    const {userdata}= useContext(UserContext)
    const [post,setPost]=useState([])
    useEffect(()=>{
        const FetchData = async ()=>{
            try{
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/blog/saved-posts/`,{
                    headers:{
                        Authorization: `Bearer ${userdata?.access}`,
                    }
                })
                console.log(response.data.data)
                setPost(response.data.data)
            }catch(err){
                console.log(err)
            }
        }
        FetchData()
    },[userdata?.access])

    if (!post.length)return(
      <div>
        <Link to='/'>
            <p>Expolre Blogs !</p>
        </Link>
      </div>
    )
    const RenderData = ()=>{

        return post.map((list)=>(
          <li key={list.id} className='li'>
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
                    <span className='paragraph-tag text'><p className='p'>{list.short_description}</p></span>
                </div>
              <div className='auther'>
                  <h3 className='text'>{list.author}</h3>
              </div>
            </div>
            <div className='date-section'>
                <div className='text'>
                  {list.published_date}
                </div>
            </div>
          </Link>
        </li>
              ))
    
    }
   
  return (
    <div className='main-container'>
      <ul className='ul'>
          {RenderData()}
      </ul>
    </div>
  )
}

export default SavePost

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './blog.css';
import { UserContext } from '../../App';

function Blog() {
    const { id } = useParams();  // Get blog ID from URL
    const [Data, setData] = useState({});  // State to store blog data
    const { userdata } = useContext(UserContext);  // Authentication data from context
    const [like, setLike] = useState();  // State to manage like status
    const [save,setSave]=useState()
    const[comments,setComments]=useState([])
    const [comment,setComment]=useState('')

    // Effect to fetch blog data on mount and when id changes
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/blog/view/${id}/`, {
            headers: {
                Authorization: `Bearer ${userdata?.access}`,
            },
        })
        .then((response) => {
            setData(response.data.data);  // Assuming the blog data is in response.data.data
            setLike(response.data.data.is_liked);  // Set the like status from the API
            setSave(response.data.data.save_post)


        })
        .catch((error) => {
            console.error(error);
        });
        axios.get(`http://127.0.0.1:8000/api/v1/blog/comments/view/${id}/`,{
            headers:{
                Authorization: `Bearer ${userdata?.access}`,
            },
        }).then((response)=>{
            setComments(response.data.data)
        }).catch((err)=>{
            console.error(err)
        })
    }, [id, userdata?.access]);  // Dependency on blog ID and user access token

    const UpdateLike = () => {
        axios.post(`http://127.0.0.1:8000/api/v1/blog/like/${id}/`, {}, {
            headers: {
                Authorization: `Bearer ${userdata.access}`,
            },
        })
        .then(() => {
            setLike(!like);  // Toggle like status optimistically
    
        })
        .catch((err) => {
            console.error(err);
        });
    };
    const UpdateSave = ()=>{
        axios.post(`http://127.0.0.1:8000/api/v1/blog/save-post/${id}/`,{},{
            headers:{
                Authorization: `Bearer ${userdata.access}`,
            }
        }).then(()=>{
            setSave(!save)
        }).catch((err)=>{
            console.error(err)
        })
    }
    const HandleSubmit = (e)=>{
        e.preventDefault()
        axios.post(`http://127.0.0.1:8000/api/v1/blog/create-comment/${id}/`,{comment},{
            headers:{
                Authorization:`Bearer ${userdata.access}`,
            }
        })
        .then(response=>{
            alert(response.data.message)
            console.log(response.data.data)
            let newComment = response.data.data
            setComments([...comments,newComment])
            setComment('')
        }).catch(err=>{
            console.error(err)
        })
    }
    const RenderComment = ()=>{
        return (comments).map((comme)=>(
            <div className='comme-list'  key={comme.id}>
                <span>
                    <div className='username'>{comme.username}</div>
                    <div>{comme.comment}</div>
                </span>
            </div>
        ))
    }
    return (
        <div className='main-container'>
            <div className='top'>
                <div className='image'>
                    <img src={Data.featured_image} alt='spotlight'/>
                </div>
                <div className='detail'>
                    <h1 className='name'>{Data.title}</h1>
                    <div className='writer'>
                        <h1>{Data.author}</h1>
                    </div>
                </div>
                <div className='footter'>
                <div className='date'>
                        <h1>{Data.published_date}</h1>
                    </div>
                    <div className='btn-like'>
                    <span>
                        <button onClick={UpdateLike}>
                            {like ? "Unlike" : "Like"}
                        </button>
                        <button onClick={UpdateSave}>
                            {save ? "unsave" : "save"}
                        </button>
                    </span>
                    </div>
                </div>
                <div className='content'>
                    <div className='desc'>
                        <h3>{Data.short_description}</h3>
                    </div>
                    <div className='disc'>
                        <p>{Data.description}</p>
                    </div>
                </div>
                <div className='comments-section'>
                    <div className='create-commnet'>
                       <form onSubmit={HandleSubmit}>
                            <input type='text' value={comment} placeholder='Create Your Cooment' onChange={(e)=>setComment(e.target.value)}/>
                            <button type='submit'>Post</button>
                       </form>
                    </div>
                {comments.length===0? <h1>No Comments</h1>: RenderComment()}
            </div>
            </div>
        </div>
    );
}

export default Blog;

import axios from 'axios'
import React,{useEffect,useContext, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import  './create.css'

function Edit() {
    const {id}=useParams()
    const {userdata}=useContext(UserContext)
    const[title,setTitle]=useState('')
    const[short_description,setShort_description]=useState('')
    const[description,setDescription]=useState('')
    const[featured_image,setFeatured_image]=useState(null)
    const[categories,setCategories]=useState('')
    const[is_draft,setIs_draft]=useState(false)
    const navigate=useNavigate()
    const FileChange = ()=>{
        document.getElementById('fileInput').click()
    }

   useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/v1/blog/view/${id}/`,{
            headers:{
                Authorization:`Bearer ${userdata?.access}`,
            },
        }).then((response)=>{
            const post = response.data.data;
            setTitle(post.title)
            setDescription(post.description)
            setShort_description(post.short_description)
            setFeatured_image(post.featured_image)
            setCategories(post.categories)
        }).catch((error)=>{
            console.log(error)
        })
   },[userdata.access,id])
   const handleSubmit=(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('title', title);
        formData.append('short_description', short_description);
        formData.append('description', description);
        formData.append('categories', categories);
        if(!featured_image) formData.append('featured_image', featured_image);


        const endpoint = `http://127.0.0.1:8000/api/v1/blog/edit/${id}/`
        axios.post(endpoint,formData,{
            headers:{
                Authorization:`Bearer ${userdata?.access}`,
            },
        }).then((response)=>{
            console.log(response.data)
            navigate('/mypost')
        }).catch((error)=>{
            console.log(error)
        })
   }
  return (
    <div>
        <div className='create-page'>
         <form onSubmit={handleSubmit} className='form-page'>
        <div>
            <input type='text' value={title} placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div>
            <input type='text' value={(short_description)} placeholder='Short-desc' onChange={(e)=>setShort_description(e.target.value)}/>
        </div>
        <div>
            <input  type='text' value={description} placeholder='discription' onChange={(e)=>setDescription(e.target.value)}/>
        </div>
        <div>
            
        </div>
        <div>
            <input type='text' placeholder='Categories' value={categories} onChange={(e)=>setCategories(e.target.value)}/>
        </div>
        <div>
            
        </div>
        <div>
        {featured_image && (
  <div>
    <label>Current Image:</label>
    <img src={featured_image} alt="Featured" style={{width: '100px', height: 'auto'}} />
    <input type='file' id='fileInput' style={{display:'none'}} onChange={(e)=>setFeatured_image(e.target.files[0])}/>
    <button type='button' onClick={FileChange}>Edit image</button>
  </div>
)}
<input type='checkbox' checked={is_draft} onChange={(e)=>setIs_draft(e.target.checked)}/>
            <button type='submit'>
                Create
            </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Edit


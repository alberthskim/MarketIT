import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePostThunk, getAllPostThunk } from "../../store/post";
import './ManagePostPage.css';

function ManagePost() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const posts = Object.values(useSelector(state => state.posts))
    const usersPost = posts.filter(post => post.userId === user.id)

    useEffect(() => {
        dispatch(getAllPostThunk())
    }, [dispatch])

    if (!user) history.push('/')

    return (
        <div className="manage-post-container">
            <div className="user-posts">
                {usersPost.map((post) => (
                    <div className="individual-posts">
                        <h2 className="post-title">{post.title}</h2>
                        <img className="post-images" src={post.image} alt="individual-post"/>
                        <p>{post.categories}</p>
                        <p>{post.content}</p>
                        <p>{post.location}</p>
                        <button className="edit-post-button" onClick={() => alert("In working progress")}>Edit Post</button>
                        <button className="delete-post-button" onClick={() => dispatch(deletePostThunk(post.id))}>Delete Post</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManagePost;

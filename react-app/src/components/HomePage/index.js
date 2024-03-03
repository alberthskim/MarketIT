import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getAllPostThunk } from "../../store/post";
import './homepage.css'


function HomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const posts = Object.values(useSelector(state => state.posts))
    const user = useSelector(state => state.session.user)
    const excludeUserPosts = posts.filter(post => post.userId !== user.id)

    useEffect(() => {
        dispatch(getAllPostThunk())
    }, [dispatch])

    if (!user) history.push('/')

    return (
        <div className="home-page-container">
            <button className="post-button" onClick={() => history.push('/posts/new')}>Create A Posting!</button>
            <div className="post-contents">
                {excludeUserPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
                    <div className="individual-posts">
                        <h2 className="post-title">{post.title}</h2>
                        <img className='post-images' src={post.image} alt="individual-post"/>
                        <p>Category: {post.categories}</p>
                        <p>{post.content}</p>
                        <p>Location: {post.location}</p>
                        <p>Date Posted: {new Date(post.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})}</p>
                        <p>By {post.userId}</p>
                        <button className="message-button" onClick={() => alert("Coming Soon!")}>Message Me</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;

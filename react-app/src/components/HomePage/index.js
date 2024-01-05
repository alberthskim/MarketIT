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
            <div className="post-contents">
                {excludeUserPosts.map((post) => (
                    <div className="individual-posts">
                        <h2 className="post-title">{post.title}</h2>
                        <img className='post-images' src={post.image} alt="individual-post"/>
                        <p>{post.categories}</p>
                        <p>{post.content}</p>
                        <p>{post.location}</p>
                        <p>Posted on {post.createdAt.slice(0, 17)}</p>
                        <button onClick={() => alert("Coming Soon!")}>Message Me</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;

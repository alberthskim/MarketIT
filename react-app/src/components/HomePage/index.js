import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getAllPostThunk } from "../../store/post";


function HomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const posts = Object.values(useSelector(state => state.posts))
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(getAllPostThunk())
    }, [dispatch])


    return (
        <div className="home-page-container">
            <div className="post-contents">
                {posts.map((post) => (
                    <div className="titles">
                        <h1>{post.title}</h1>
                        <img className='post-images' src={post.images} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;

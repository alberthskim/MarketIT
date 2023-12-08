const ALL_POSTS = "posts/GET_ALL_POST";
const USER_POSTS = "posts/GET_USER_POST";
const CREATE_POST = "posts/CREATE_POST";
const UPDATE_POST = "posts/UPDATE_POST";
const DELETE_POST = "posts/DELETE_POST";


const getAllPosts = (posts) => ({
    type: ALL_POSTS,
    posts
});

const getUserPosts = (posts) => ({
    type: USER_POSTS,
    posts
})

const createAPost = (post) => ({
    type: CREATE_POST,
    post
})

const updateAPost = (post) => ({
    type: UPDATE_POST,
    post
})

const deleteAPost = (postId) => ({
    type: DELETE_POST,
    postId
})

export const getAllPostThunk = () => async dispatch => {
    const response = await fetch('/api/posts')

    if (response.ok) {
        const posts = await response.json()
        await dispatch(getAllPosts(posts))
        return posts
    }
}

export const getUserPostsThunk = (userId) => async dispatch => {
    const response = await fetch(`/api/posts/${userId}`)

    if (response.ok) {
        const userPosts = await response.json()
        await dispatch(getUserPosts(userPosts))
        return userPosts
    }
}

export const createPostThunk = (post) => async dispatch => {
    console.log("POST INSIDE THUNK", post)
    const response = await fetch('/api/posts/new', {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(post)
    })

    if (response.ok) {
        const newPost = await response.json()
        // console.log("This is inside thunk", newPost)
        await dispatch(createAPost(newPost))
        return newPost
    } else {
        console.log("There was an error making post")
    }
}


export const updatePostThunk = (post, postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
    })

    if (response.ok) {
        const updatedPost = await response.json();
        await dispatch(updateAPost(updatedPost))
        return updatedPost
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const response = await response.json()
        await dispatch(deleteAPost(postId))
        return response
    }
}


const initialState = {}
const postReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ALL_POSTS:
            newState = {...state}
            action.posts.forEach(post => newState[post.id] = post)
            return newState
        case USER_POSTS:
            return
        case CREATE_POST:
            newState = {...state}
            newState[action.post.id] = action.post
            return newState
        case UPDATE_POST:
            return
        case DELETE_POST:
            return
        default: {
            return state;
        }
    }
}

export default postReducer

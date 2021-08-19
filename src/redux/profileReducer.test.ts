import profileReducer, { actions } from './profileReducer';

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 10 },
        { id: 2, message: "it's my first post", likesCount: 5 },
        { id: 3, message: "Heeeeey", likesCount: 15 },
    ],
    profile: null,
    status: '',
};

it('length of post should be incremented', () => {
    let action = actions.addPostActionCreator('test-post');
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(4);
})

it('message of new post should be correct', () => {
    let action = actions.addPostActionCreator('test-post');
    let newState = profileReducer(state, action);

    expect(newState.posts[3].message).toBe('test-post');
})

it('after deleting length of posts should be decrement', () => {
    let action = actions.deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
})

it('after deleting length of posts should not be decrement if postId is incorrect', () => {
    let action = actions.deletePost(1000);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
})


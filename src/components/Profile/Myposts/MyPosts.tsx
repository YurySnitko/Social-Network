import React from 'react';
import { PostsType } from '../../../types/types';
import AddPostReduxForm, { AddPostFormValuesType } from './AddPostForm';
import s from './MyPosts.module.css';
import Post from './Post/Post';

export type MapPropsType = {
  posts: Array<PostsType>
}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

  let postsElements = [...props.posts]
    .reverse()
    .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  let addNewPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={s.postsBlock}>
      <h3>My post</h3>
      <AddPostReduxForm onSubmit={addNewPost} />
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized;
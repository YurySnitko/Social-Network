import { connect } from 'react-redux';
import { actions } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts';

let mapStateToProps = (state: AppStateType) => {
  return {
      posts: state.profilePage.posts,
  } 
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPosts)

export default MyPostsContainer;
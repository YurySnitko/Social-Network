import { profileAPI } from './../api/profileApi';
import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { stopSubmit, FormAction } from 'redux-form';
import { PostsType, PhotosType, ProfileType } from '../types/types';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 10 },
        { id: 2, message: "it's my first post", likesCount: 5 },
        { id: 3, message: "Heeeeey", likesCount: 15 },
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
};
export type InitialStateType = typeof initialState 
type ActionsTypes = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: action.newPostBody, likesCount: 0 }],  
            };
        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile,
            }
            case 'SN/PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status,
            }
            case 'SN/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
            case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostBody: string) => ({ type: 'SN/PROFILE/ADD-POST', newPostBody } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'SN/PROFILE/DELETE_POST', postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const),
}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profileData);

    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
            //dispatch(stopSubmit('edit-profile', { _error: message}));
            dispatch(stopSubmit('edit-profile', { "contacts": {"facebook": message}}));
            return Promise.reject(message);
        }
}

export default profileReducer;
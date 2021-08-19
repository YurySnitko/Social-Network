import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validator';
import { createField, GetStringKeys, Textarea } from '../../common/FormsControl/FormsControl';

const maxLength100 = maxLengthCreator(100);

type PropsType = {
}
export type AddPostFormValuesType = {
  newPostText: string
}
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
      {createField<AddPostFormValuesTypeKeys>('Post Message', 'newPostText', [required, maxLength100], Textarea)}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

export default reduxForm<AddPostFormValuesType>({ form: 'ProfileAddNewPostForm' })(AddNewPostForm);

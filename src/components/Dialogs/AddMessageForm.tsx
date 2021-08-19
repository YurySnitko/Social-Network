import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../utils/validators/validator';
import { createField, Textarea } from '../common/FormsControl/FormsControl';
import { NewMessageFormType } from './Dialogs';

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
type PropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
            {createField<NewMessageFormValuesKeysType>('Enter your message', 'newMessageBody', [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
}

export default reduxForm<NewMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm);
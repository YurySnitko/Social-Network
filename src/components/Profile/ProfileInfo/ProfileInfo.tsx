import React, { ChangeEvent, useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';
import { selectProfile, selectStatus } from '../../../redux/profileSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { selectAuthorisedUserId } from '../../../redux/authSelectors';
import { getStatus, getUserProfile, savePhoto, saveProfile, updateStatus } from '../../../redux/profileReducer';
import { useEffect } from 'react';

type PropsType = {
  //isOwner: boolean
}
type ParamsType = {
  userId: undefined | string
}

const ProfileInfo: React.FC<PropsType> = () => {
  const profile = useSelector(selectProfile)
  const status = useSelector(selectStatus)
  const authorisedUserId = useSelector(selectAuthorisedUserId)

  const dispatch = useDispatch()
  const history = useHistory()
  let { userId } = useParams() as ParamsType

const isOwner = !userId
  
  const refreshProfile = () => {
    let userUrlId: number | null = Number(userId)
    if (!userUrlId) {
      userUrlId = authorisedUserId;
      if (!userUrlId) {
        history.push('/login');
      }
    }

    if (!userUrlId) {
      console.error("Id should exist on URI params or in state ('authorizedUserId')")
    } else {
      dispatch(getUserProfile(userUrlId));
      dispatch(getStatus(userUrlId));
    }
  }

  useEffect(() => {
    refreshProfile()
  }, [userId])
/*
  const saveProf = (formData: ProfileType): Promise<any> => {
    dispatch(saveProfile(formData))
  }

  */
  const updateStat = (status: string) => {
    dispatch(updateStatus(status))
  }

  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(savePhoto(e.target.files[0]));
    }
  }

  const onSubmit = (formData: ProfileType) => {
    dispatch(saveProfile(formData))
    setEditMode(false)
    //.then(() => {setEditMode(false);})
  }

  return (
    <div className={s.profileInfo}>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt='profilePhoto' />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        { editMode 
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> 
          : <ProfileData goToEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner} />}
        <ProfileStatusWithHooks status={status} updateStatus={updateStat} />
      </div>
    </div>
  )
}

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean 
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
    <div>
      <b>Full name</b>: {profile.fullName}
    </div>
    <div>
      <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
    </div>
    {profile.lookingForAJob &&
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
    }
    <div>
      <b>About me</b>: {profile.aboutMe}
    </div>
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
      })}
    </div>
  </div>
}

type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return <div className={s.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;
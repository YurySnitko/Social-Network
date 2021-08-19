import React from 'react';
import s from './Post.module.css';

type PropsType = {
  message: string
  likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNplTWk2suGea3AcNZ-nzKJVrLX9mL0SGOmA&usqp=CAU' alt='phot'/>
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>

  )
}

export default Post;
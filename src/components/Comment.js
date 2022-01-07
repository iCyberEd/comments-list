import React from 'react'
import avatar from './avatar.svg'

export default function Comment( {commentData} ) {
  let currentDate = new Date ()
  let postDate = new Date(commentData.created_at)
  let dateDifference = currentDate - postDate
  let dayDifference = Math.round(dateDifference / 1000 / 60 / 60 / 24) // Ms seconds minutes hours

  return (
    <div className="comment">
      <div className="comment__avatar"><img src={avatar} alt="avatar" /></div>

      <div className="comment__content">
        <div className="comment__header">
          <div className="comment__name">{commentData.name}</div>
          <div className="comment__date">({dayDifference} Days ago)</div>
        </div>
        <div className="comment__text">{commentData.text}</div>
      </div>
    </div>
  )
}

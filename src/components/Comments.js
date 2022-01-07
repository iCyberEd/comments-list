import React, { useEffect, useState } from 'react'
import Comment from './Comment'

export default function Comments( {commentsData} ) {
  const [commentsList, setCommentsList] = useState([])

  useEffect( () => {
    if (Object.keys(commentsData).length > 0) {
      const commentsElements = commentsData.data.map( commentData => <Comment key={commentData.id} commentData={commentData} />)
      setCommentsList(commentsElements)
    }
  }, [commentsData])

  

  return (
    <div>
      {commentsList.length > 0 ? commentsList : "No comments found"}
    </div>
  )
}

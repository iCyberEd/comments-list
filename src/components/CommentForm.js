import React, { useState } from 'react'

export default function CommentForm({setCommentsCount}) {
  const [fieldsState, setFieldsState] = useState({
    name: "",
    text: ""
  })
  // const [text, setText] = useState("Write a review")

function handleChange(evt) {
  setFieldsState({
    ...fieldsState,
    [evt.target.name]: evt.target.value})
}

function validation() {
  if (fieldsState.name === "" || fieldsState.name === "") return false
  return true
}

function handleSubmit(evt) {
  evt.preventDefault()

  const isValid = validation()
  if (isValid) {
    fetch("https://jordan.ashton.fashion/api/goods/30/comments", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...fieldsState})
    })

    setFieldsState({
      name: "",
      text: ""
    })
    setCommentsCount(prevCommentsCount => prevCommentsCount + 1)
  }
}

  return (
    <form className='comment-form'
          action="https://jordan.ashton.fashion/api/goods/30/comments"
          method="POST"
          onSubmit={handleSubmit}>
      <label htmlFor="name" className="comment-form__user-name-label required">Name</label>
      <input type="text" name="name" className="comment-form__user-name" value={fieldsState.name} onChange={handleChange} />
      <label htmlFor="text" className="comment-form__text-label required">Text</label>
      <textarea name="text" id="" cols="30" rows="10" className="comment-form__text" value={fieldsState.text} onChange={handleChange}></textarea>
      <button type='submit' className='comment-form__submit'>POST</button>
    </form>
  )
}

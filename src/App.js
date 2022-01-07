import './App.css';
import CommentForm from './components/CommentForm';
import Comments from './components/Comments';
import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';

function App() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [commentsData, setCommentsData] = useState({})
  const [commentsCount, setCommentsCount] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    function loadComments(url) {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            const message = "Loading error " + response.status + " " + response.statusText
            const err = new Error(message)
            err.response = response
            throw err;
          }
          return response.json()
        })
        .then(json => {
          console.log(json)
          setCommentsData(json)
          setCommentsCount(json.total)
          setPage(json.current_page)
        },
          error => {
            setError(error)
          })
        .finally(() => {
          setIsLoaded(true)
        })
    }

    const url = "https://jordan.ashton.fashion/api/goods/30/comments?page=" + page
    loadComments(url)
  }, [page, commentsCount])


  function loadMore() {
    setPage(prevPage => prevPage + 1)
  }

  // function lastPageUpdate() {
  //   if (page === commentsData.last_page) {
  //     setForceUpdate(1)
  //   }
  // }

  return (
    <div className="comments-app">
      <h2>Comments</h2>
      <CommentForm setCommentsCount={setCommentsCount.bind(this)} />
      <span className="comments-count">{commentsCount} Responses</span>
      <hr />
      {error ? <div>Error: {error.message}</div> : !isLoaded
        ? <div>Loading...</div> : <div>
          <Pagination links={commentsData.links} setPage={setPage.bind(this)} />
          <Comments commentsData={commentsData} />
          {commentsData.last_page !== page && <button onClick={loadMore}>Load more</button>}
        </div>
      }

    </div>
  )

}

export default App;

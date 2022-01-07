import React, { useMemo } from 'react'

export default function Pagination({links, setPage}) {
  // const linkElements = useMemo(() => {
    let paginationElements = links.map( (linkObj, ind) => {
      const parser = new DOMParser()
      const linkText = parser.parseFromString(`<!doctype html><body>${linkObj.label}`, 'text/html').body.textContent

      let pageNumber = linkObj.url
      if (pageNumber) {
        pageNumber = isNaN(linkObj.label) ? +linkObj.url.split("?page=")[1] : linkObj.label
      }
    
      return (<button key={ind} 
              className={linkObj.active ? 'pagination__element_active' : 'pagination__element'} 
              onClick={() => pageNumber ? setPage(pageNumber) : null}>
          {linkText}
      </button>)
    })
    // return paginationElements
  // }, [links])

  return (
    <div className='pagination' >
      {paginationElements}
    </div>
  )
}

import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title = 'Task Tracker', onAdd, showAdd }) => {
 const location = useLocation()
 return (
    <header className = 'header'>
      <h1>{title}</h1>
      {location.pathname !== '/about' && <Button 
       color={showAdd ? 'red' : 'green'}
       text={showAdd ? 'Close' : 'Add'}
       onClick={onAdd}/>}
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

//CSS in JS
//const headingStyle = {
  //color: 'red',
  //backgroundColor: 'black',
//}


export default Header
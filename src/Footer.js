import React from 'react'

const Footer = ({length}) => {
  const year = new Date();
  return (
    <div>
      {length} list {length === 1 ? "item" : "items"}
      <footer>Copyright &copy; {year.getFullYear()}</footer>
    </div>
  )
}

export default Footer
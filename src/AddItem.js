import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

export const AddItem = ({newItem, setNewItem, handleSubmit}) => {

  const inputRef = useRef(); //used to shift focus

  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="addItem">Add Item</label>
        <input 
            autoFocus
            id='addItem'
            type='text'
            ref={inputRef}
            placeholder='Add Item'
            required
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
        />
        <button type='submit' aria-label='Add Item' onClick={() => inputRef.current.focus()}>
            <FaPlus />
        </button>
    </form>
  )
}

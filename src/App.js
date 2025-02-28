import { Slide, ToastContainer } from 'react-toastify';
import './App.css';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import 'react-toastify/ReactToastify.css'
import { useEffect, useState } from 'react';
import { AddItem } from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
  // const [items, setItems] = useState(
  // [
  //   {
  //     id: 1,
  //     checked: true,
  //     item: "Revise DSA"
  //   },
  //   {
  //     id: 2,
  //     checked: true,
  //     item: "Revisit Webpage"
  //   },
  //   {
  //     id: 3,
  //     checked: false,
  //     item: "Learn Unclear Concepts"
  //   },
  //   {
  //     id: 4,
  //     checked: false,
  //     item: "Learn Unlearned Concepts"
  //   }
  // ]);

  const API_URL = "http://localhost:3500/items"

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState('')

  const [search, setSearch] = useState('')

  const [fetchError, setFetchError] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchedItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw Error("Data Not Received")
        }
        const listItems = await response.json()
        setItems(listItems)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      (async () => fetchedItems())()
    }, 2000)
    // (async () => fetchedItems())()
  })

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems)

    const posting = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL, posting)
    if (result) setFetchError(result)
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems)

    const myItem = listItems.filter((item) => item.id === id)
    const updating = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const itemUpdate = `${API_URL}/${id}`
    const result = await apiRequest(itemUpdate, updating)
    if (result) setFetchError(result)

  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)

    const deleting = {method: 'DELETE'}

    const itemUpdate = `${API_URL}/${id}`
    const result = await apiRequest(itemUpdate, deleting)
    if (result) setFetchError(result)

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
    setNewItem('')
  }

  return (
    <>
      <ToastContainer style={Slide} closeButton={true} limit={1}></ToastContainer>
      <div className="App">
        <Header title='To Do Application' />
        <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem
          search={search}
          setSearch={setSearch}
        />
        <main>
          {fetchError && <p>{`Error : ${fetchError}`} <br /> </p>}
          {isLoading && <p>Loading Items...<br /> </p>}
          {!isLoading && !fetchError &&
            <Content
              items={items.filter((item) => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />}
        </main>
        <Footer
          length={items.length}
        />
      </div>
    </>
  );
}

export default App;

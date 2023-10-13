import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
//   { id: 4, description: "Cable", quantity: 3, packed: true },
//   { id: 5, description: "Towel", quantity: 1, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems (item) {
    setItems((items)=> [...items, item]); //spread the previous items and add a new item in the array (as we cannot mutate original array using push method)    
    //console.log(items);
  }

  function handleDeleteItem(id) {
    setItems((items)=>items.filter((item)=>item.id !== id));
    //we want to have a new array minus the one selected in id for setItems so we want the current array in items so we will recieve the current items (all of the items)
    //in the callback function
    //The above is the callback structure in which items is the current object containing all the items upon which the filteraton is required
    //after the => the procedure block comes, here it is only one line so it does not comes in curly braces and it has implecit return due to one line
    //filter or map methods always have the callback with the specific item/object in iteration. Filter gives a new array and filters out the one if the condition gets true
  }

  function handleStrikeItem(id){
    // eslint-disable-next-line no-unused-expressions, array-callback-return    
    setItems((items)=>items.map((item)=> 
      (item.id === id ? { ...item, packed: !item.packed } : item )));
    //((item.id === id && (!item.packed)) ? {...item, packed: true} : (item.id === id && (item.packed===true) ? {...item, packed: false} : item))))
    //booksAfterDelete.map((book)=> book.id == 1 ? {...book, pages: 1} : book  //use spread operator to spread items in book and add new properties if requires   
  }

  return (
    <div className="app">      
      <Logo />
      <Form onAddItems={handleAddItems} />      
      <PackingList items={items} onDeleteItem={handleDeleteItem} onStrikeItem={handleStrikeItem}/>
      <Stats itmlength={items.length}/>
    </div>
  );
}

function Logo() {
  return (
    <h1>🌴 Far Away 👜 </h1>
  )
}

function Form({onAddItems}) {
  //use state variables for controlled components technique
  //control components is used for all teh input elements of the form and it is used to remembert the state of input element
  //control components have three parts
  //1) Use State hook 2) use the state variable mainly in value tag of input element 3) add the onChange Listener of input element

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
        
    if(!description) return;

    const newItem = {
      id: Date.now(), 
      description, 
      quantity, 
      packed: false
    }; 
    
    onAddItems(newItem); //onAdditems is the method coming through a prop into Form method.
        
    //reseting fields...
    setQuantity(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😃 trip? </h3>
      <select 
        value={quantity} //for controlled elements
        onChange={(e) => setQuantity(Number(e.target.value))}> 
        {Array.from({length: 20}, (_, i) => i + 1 ) 
          .map((num) => 
            (
              <option value={num} key={num}>
                {num}
              </option>)
          )}        
      </select>
      <input type="text" placeholder="Item..." 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} />
        
      <button>Add</button>      
    </form>
  )
}

function PackingList({items, onDeleteItem, onStrikeItem}) {
  return (
  <div className="list">
    <ul>
      {items.map(item => <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onStrikeItem={onStrikeItem}/>)}
    </ul>
  </div>
  )
}

function Item({item, onDeleteItem, onStrikeItem}) {
  return(
    <li>
      <input type='checkbox' value={item.packed} onChange={() => onStrikeItem(item.id)}/>
      <span style={item.packed ? {textDecoration: "line-through", color: "red"} : {}}>
      {item.quantity} {item.description} 
      </span>
      <button onClick={()=>onDeleteItem(item.id)}>❎</button>
    </li>  
  )  
}

function Stats({itmlength}) {
  return (
    <footer className="stats">
      <em>
        You have {itmlength} items in your list, and you already packed X (X%)
      </em>
    </footer>
  )
}

export default App;

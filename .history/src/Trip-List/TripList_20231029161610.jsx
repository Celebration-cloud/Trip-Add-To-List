/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import './TripList.css'
function TripList() {
  const [addItem, setAddItem] = useState([]);

  const handleAddItem = (item) => {
    setAddItem((items) => [...items, item]);
  };
  const handleRemoveItem = (id) =>{
    setAddItem(items => items.filter(p => p.id !== id))
  }
  const handleChecked = (id) => {
    setAddItem(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  };
  return (
    <div>
      <TripHead/>
      <TripForm handleAddItem={handleAddItem}/>
      <TripListForm addItem={addItem} remove={handleRemoveItem} check={handleChecked}/>
      <TripStats stats={addItem}/>
    </div>
  )
}

export default TripList

function TripHead() {
  return (
    <div style={{backgroundColor: "orange", padding: "5px"}}>
      <h1 style={{fontFamily: "inherit"}}>🚗 FAR AWAY 💼</h1>
    </div>
  )
}

function TripForm({handleAddItem}) {
  const [item, setItem] = useState({description: "", quantity: 1})
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!item.description) return;

    const newItem = {
      des: item.description,
      amount: item.quantity,
      packed: false,
      id: Date.now(),
    };

    handleAddItem(newItem);
    setItem({ description: "", quantity: 1 });
  }
  const handleInput = (e) =>{
    setItem(prev => ({...prev, description: e.target.value}))
  }
  const handleOption = (e) =>{
    setItem(prevState => ({...prevState,quantity: Number(e.target.value)}))
  }
  return (
    <div style={{ backgroundColor: "orangered", padding: "1px" }}>
      <form onSubmit={handleSubmit}>
        <span>
          <p>What do you need for your 😍 trip?</p>
          <select onChange={handleOption} value={item.quantity}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
          <input onChange={handleInput} value={item.description}></input>
          <button type="submit">Add</button>
        </span>
      </form>
    </div>
  );
}

function TripListForm({addItem, remove, check}) {
  const [sort, setSort] = useState("input")
  const sortingBy = (e) => {
    setSort(e.target.value);
  };
  let sorting;
  if (sort === "input") sorting = addItem;
  if (sort === "checked")
    sorting = addItem.slice().sort((a, b) => a.des.localeCompare(b.des));
  if (sort === "order")
    sorting = addItem
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
 
  return (
    <>
      <h3>LIST</h3>
      <ul style={{ listStyleType: "none" }}>
        <li>
          {sorting?.map((item) => (
            <>
              <input
                type="checkbox"
                value={item.packed}
                onChange={() => check(item.id)}
              />
              <span
                key={item.id}
                style={item.packed ? { textDecoration: "line-through" } : {}}
              >
                {item.amount}-{item.des}
              </span>
              <button onClick={() => remove(item.id)}>
                🚩
              </button>
            </>
          ))}
        </li>
      </ul>
      <div>
        <select onChange={sortingBy} value={sort} style={{padding: "10px 100px 10px 10px", marginTop: "90px", backgroundColor: "orangered", borderRadius: "20px"}}>
          <option value="input" style={{marginRight: "5px", backgroundColor: "brown" }}>Item in order</option>
          <option value="checked" style={{marginRight: "5px"}}>Checked Item</option>
          <option value="order" style={{marginRight: "5px"}}>Split Item</option>
        </select>
      </div>
    </>
  );
}

function TripStats({stats}) {
  if(!stats.length)
  return (
    <footer className="static"
      style={{
        position: "absolute",
        backgroundColor: "aqua",
        color: "brown",
        bottom: "-0%",
        width: "100%",
      }}
    >
      <p>No stats yet! Add some items to see your trip's progress...</p>
    </footer>
  );
  const total = stats.length
  const packed= stats.filter(items => items.packed).length
  const percent = Math.round((packed / total) * 100)
  return (
    <>
      {percent === 100 ? (
        <footer
          style={{
            position: "absolute",
            backgroundColor: "aqua",
            color: "brown",
            bottom: "-0%",
            width: "100%",
          }}
        >
          <p>You have Completed the List✈</p>
        </footer>
      ) : (
        <footer
          style={{
            position: "absolute",
            backgroundColor: "aqua",
            color: "brown",
            bottom: "-0%",
            width: "100%",
          }}
        >
          <p>
            You have {total} items on your list, and already packed {packed} (
            {percent}%)
          </p>
        </footer>
      )}
    </>
  );
}

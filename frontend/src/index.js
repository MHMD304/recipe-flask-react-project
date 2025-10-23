import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    fetch("/recipe/recipes")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setMessage(res)}
    ).catch(err => console.error(err));
    
  }, []);

  
  return (
    <div className="app">
      <ul>
        {message.map(element => (
          <li key={element.id}>
            <strong>{element.title}</strong>: {element.description}
          </li>
        ))}
      </ul>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

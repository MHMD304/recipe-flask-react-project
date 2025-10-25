import { createRoot } from "react-dom/client";
import Recipes from "./components/recipes";
import Auth from "./components/auth";
import AddRecipe from "./components/addRecipe";
import {Route,Routes,BrowserRouter} from "react-router-dom"
import "./index.css";
import Header from "./components/header";
const App = () => {
  
  return (
    <div className="app">
      <Header/>
      <Routes>
          <Route path="/" element={<Recipes/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="add-recipe" element={<AddRecipe/>}/>
          <Route path="/add-recipe/:id" element={<AddRecipe />} />
      </Routes>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
<BrowserRouter>
    <App />
  </BrowserRouter>);

import { createRoot } from "react-dom/client";
import Recipes from "./components/Recipes";
import Auth from "./components/auth";
const App = () => {
  
  return (
    <div className="app">
      <Recipes/>
      <Auth/>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

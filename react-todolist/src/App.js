
import './App.css';
import Footer from './components/Footer';
import List from "./components/List"
function App() {
  return (
    <div className="App">
      <div className="container">
        <header>
          <p className="todo">Todo List</p>
          <p>A simple React Todo List App</p>
        </header>
        <List/>
        <Footer/>
      </div>
    </div>
  );
}
export default App;

import './App.css';
import Pages from './pages/pages'
import LoginProvider from './context/auth'
function App() {
  return (
    <div className="App">
      <LoginProvider>

      <Pages/>

      </LoginProvider>
    
    </div>
  );
}

export default App;




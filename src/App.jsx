import GameList from './components/GameList';
import Header from './components/header';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="main-content">
        <div className="dashboard-container">
          <GameList />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
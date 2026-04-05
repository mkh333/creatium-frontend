import './App.css';
import { Footer } from './components/pages/Footer/Footer';
import { AppRouter } from './routers/AppRouter';

function App() {
  return (
    <>
      <main className="main">
        <AppRouter />
      </main>
      <Footer />
    </>
  );
}

export default App;

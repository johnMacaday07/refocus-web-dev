import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <PokemonList />
      <Footer />
    </div>
  );
}

export default App;

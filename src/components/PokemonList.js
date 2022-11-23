import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PokemonList.css";
import Spinner from "./Spinner";

const PokemonList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=30").then((result) => {
      const pokeList = result.data.results;
      const promises = pokeList.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        return res.data;
      });
      Promise.all(promises).then((data) => {
        console.log(data);
        setList(data);
        setLoading(false);
      });
    });
  }, []);

  const renderedList = list.map((item) => {
    return (
      <div className="list__item" key={item.id}>
        <figure>
          <img
            src={`${item.sprites.other["official-artwork"].front_default}`}
            alt={`${item.name}`}
          />
        </figure>
        <span className="list__item__id">{`#${item.id
          .toString()
          .padStart(3, 0)}`}</span>
        <h3 className="list__item__name">{item.name}</h3>
        <div className="list__item__details">
          {item.types.map((type) => {
            const typeName = type.type.name;
            return (
              <div className={`list__item__type bg-${typeName}`}>
                {typeName}
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div className="list">
      {loading ? <Spinner /> : ""}
      {renderedList}
    </div>
  );
};

export default PokemonList;

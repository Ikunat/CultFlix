//import logo from "./logo.svg";
import styles from "./App.module.css";
import "./App.css";
import Movie from "./components/Movie";

function App() {
  const movies = [
    {
      id: 1,
      name: "Dark Waters",
      tags: [
        {
          id: 1,
          name: "Thriller",
        },
      ],
    },
    {
      id: 2,
      name: "VICE",
      tags: [
        {
          id: 1,
          name: "Thriller",
        },
      ],
    },
  ];

  return (
    <div className="App">
      <p moduleCssExample className={`${styles}`}></p>
      {movies.map((movie) => (
        <Movie key={movie.id} name={movie.name} tags={movie.tags} />
      ))}
    </div>
  );
}

export default App;

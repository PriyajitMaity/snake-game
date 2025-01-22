import "./App.css";
import Board from "./components/Board";
import ScoreCard from "./components/Score";

function App() {
  return (
    <div className="flex flex-col items-center">
      <header>
        <h1 className="text-4xl font-bold underline underline-offset-1 text-center m-4">Snake Game</h1>
      </header>
      <ScoreCard />
      <Board height={400} width={800} />
    </div>
  );
}

export default App;

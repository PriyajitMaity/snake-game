import { useSelector } from "react-redux";
import { IGlobalState } from "../../Redux/reducer/index";

const ScoreCard = () => {
    const score = useSelector((state: IGlobalState) => state.score);
    return (
        <h4 className="my-5">Current Score : <span className="text-xl font-bold">{score}</span></h4>
    );
}

export default ScoreCard;
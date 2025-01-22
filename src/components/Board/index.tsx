import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawObject, IObjectBody, generateRandomPosition, clearBoard, hasSnakeCollided } from "../utilities";
import { IGlobalState } from "@/Redux/reducer";
import {
  increaseSnake,
  INCREMENT_SCORE,
  makeMove,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  RESET_SCORE,
  resetGame,
  scoreUpdates,
  stopGame,
} from "@/Redux/action";
import Instruction from "../Instruction";

export interface CanvasBoard {
  height: number;
  width: number;
}

const Board = ({ height, width }: CanvasBoard) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [pos, setPos] = useState<IObjectBody>(generateRandomPosition(width - 20, height - 20));
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [isConsumed, setIsConsumed] = useState<boolean>(false);

  const dispatch = useDispatch();
  const snake1 = useSelector((state: IGlobalState) => state.snake);
  const disallowedDirection = useSelector((state: IGlobalState) => state.disallowedDirection);

  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(makeMove(dx, dy, MOVE_RIGHT));
      }
      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(makeMove(dx, dy, MOVE_LEFT));
      }
      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(makeMove(dx, dy, MOVE_UP));
      }
      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(makeMove(dx, dy, MOVE_DOWN));
      }
    },
    [dispatch]
  );

  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
      if (disallowedDirection) {
        switch (event.key) {
          case "w":
            if (disallowedDirection !== "UP") {
              moveSnake(0, -20, disallowedDirection);
            }
            break;
          case "s":
            if (disallowedDirection !== "DOWN") {
              moveSnake(0, 20, disallowedDirection);
            }
            break;
          case "a":
            if (disallowedDirection !== "LEFT") {
              moveSnake(-20, 0, disallowedDirection);
            }
            break;
          case "d":
            event.preventDefault();
            if (disallowedDirection !== "RIGHT") {
              moveSnake(20, 0, disallowedDirection);
            }
            break;
        }
      } else {
        if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN" &&
          event.key === "d"
        ) {
          moveSnake(20, 0, disallowedDirection); // Move RIGHT at start
        }
      }
    },
    [disallowedDirection, moveSnake]
  );

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    clearBoard(context);
    drawObject(context, snake1, "#91c483");
    drawObject(context, [pos], "#676fa3");

    if (snake1[0]?.x === pos?.x && snake1[0]?.y === pos?.y) {
      setIsConsumed(true);
    }
    if (
      hasSnakeCollided(snake1, snake1[0]) ||
      snake1[0].x >= width ||
      snake1[0].x <= 0 ||
      snake1[0].y <= 0 ||
      snake1[0].y >= height
    ) {
      setGameEnded(true);
      dispatch(stopGame());
      window.removeEventListener("keypress", handleKeyEvents);
    } else setGameEnded(false);
  }, [context, pos, snake1, height, width, dispatch, handleKeyEvents]);

  const resetBoard = useCallback(() => {
    window.removeEventListener("keypress", handleKeyEvents);
    dispatch(resetGame());
    dispatch(scoreUpdates(RESET_SCORE));
    clearBoard(context);
    drawObject(context, snake1, "#91c483");
    drawObject(context, [generateRandomPosition(width - 20, height - 20)], "#676fa3");
    window.addEventListener("keypress", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snake1, width]);

  useEffect(() => {
    //generate new obj
    if (isConsumed) {
      const pos = generateRandomPosition(width - 20, height - 20);
      setPos(pos);
      setIsConsumed(false);
      dispatch(increaseSnake());
      dispatch(scoreUpdates(INCREMENT_SCORE));
    }
  }, [dispatch, isConsumed, pos, height, width]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);
    return () => {
      window.removeEventListener("keypress", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);

  return (
    <div>
      <canvas className="border-2 border-black" ref={canvasRef} height={height} width={width} />
      <Instruction resetBoard={resetBoard} />
    </div>
  );
};

export default Board;

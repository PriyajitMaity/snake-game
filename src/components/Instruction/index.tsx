// import { Box, Button, Flex, Heading, Kbd } from "@chakra-ui/react";

export interface IInstructionProps {
  resetBoard: () => void;
}
const Instruction = ({ resetBoard }: IInstructionProps) => (
  <div className="mt-3 text-center">
    <h6 className="text-lg font-bold">
      How to Play
    </h6>
    <h5 className="text-sm mt-1">
      NOTE: Start the game by pressing <kbd className="bg-zinc-400 p-1 rounded-l">d</kbd>
    </h5>
    <div className="flex flex-row mt-3 items-center justify-center">
      <div className="flex">
        <span className="mb-2">
          <kbd className="bg-zinc-400 p-1 rounded-l">w</kbd> Move Up
        </span>
        <span className="mx-2">
          <kbd className="bg-zinc-400 p-1 rounded-l">a</kbd> Move Left
        </span>
        <span className="mx-2">
          <kbd className="bg-zinc-400 p-1 rounded-l">s</kbd> Move Down
        </span>
        <span className="mx-2">
          <kbd className="bg-zinc-400 p-1 rounded-l">d</kbd> Move Right
        </span>
      </div>
      <div className="flex flex-col">
        <button onClick={() => resetBoard()} className="bg-blue-500 text-white py-2 px-4 rounded">
          Reset game
        </button>
      </div>
    </div>
  </div>
);

export default Instruction;

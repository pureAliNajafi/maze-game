import dynamic from "next/dynamic";
const DynamicMaze = dynamic(() => import("../components/game/MazeGame"), {
  ssr: false,
  loading: () => <p className="mt-[30vh]">Generating the maze...</p>,
});
export default function GamePage() {
  return <DynamicMaze />;
}

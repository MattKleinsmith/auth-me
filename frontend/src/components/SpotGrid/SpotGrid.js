import SpotGridItem from "./SpotGridItem";
import "./SpotGrid.css";

export default function SpotGrid() {
    const seed = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return <div className="SpotGrid">{seed.map((item, i) => <SpotGridItem key={i} />)}</div>
}

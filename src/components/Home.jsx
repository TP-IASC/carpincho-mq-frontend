import QueueCard from "./QueueCard";


const Home = () => {
  const sampleStates = ["cola1", "cola2", "cola3", "cola4"];

  return (
    <div className="queue-card-deck">
      {sampleStates.map((name, index) => <QueueCard key={index} name={name} />)}
    </div>
  );
}
 
export default Home;
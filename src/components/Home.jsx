import QueueCard from "./QueueCard";

const Home = () => {
  const sampleQueues = ["cola1", "cola2", "cola3", "cola4"];

  return (
    <>
      {sampleQueues.map(name => <QueueCard name={name} />)}
    </>
  );
}
 
export default Home;
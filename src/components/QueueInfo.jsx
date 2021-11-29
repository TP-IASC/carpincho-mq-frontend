import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ElementInfo from "./ElementInfo";
import randomQueue from "./randomQueue";

const QueueInfo = () => {
  const { name } = useParams();
  const [state, setState] = useState();

  useEffect(() => {
    randomQueue(name).then((state) => {
      setState(state);
    });
  }, [name]);

  var elements = [];
  if(state) {
    elements = state.elements.map((e, index) => <ElementInfo key={index} info={e} />);
  }

  return (
    <>
      <h1>{name}</h1>
      {elements}
    </>
  );
}
 
export default QueueInfo;
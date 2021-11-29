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
      <h1 className="title">{name}</h1>
      <div className="element-card-deck">
        {elements}
      </div>
    </>
  );
}
 
export default QueueInfo;
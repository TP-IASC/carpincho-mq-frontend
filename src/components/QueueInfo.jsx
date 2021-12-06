import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import ElementCard from "./ElementCard";
import SpinnerButton from "./SpinnerButton";
import config from "../config.json";
import { carpinchoGet, carpinchoPost } from "../utils";
import SubscriberCard from "./SubscriberCard";


const QueueInfo = () => {
  const { name } = useParams();
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    carpinchoPost(`/queues/${name}/messages`, { payload }).catch(err => {
      alert(err);
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      carpinchoGet(`/queues/${name}/state`).then(res => {
        setState(res.data);
      }).catch(err => {
        alert(err);
      });
    }, config.requestInterval); 

    return () => { clearInterval(interval); }
  }, [name]);


  var elements = [];
  if(state) {
    elements = state.elements.map((e, index) => <ElementCard key={index} info={e} />);
  }

  return (
    <>
      <h1 className="title">{name}</h1>
      <Form onSubmit={onSubmit} className="message-form">
        <Row>
          <Col>
            <Form.Control 
              required 
              placeholder="Payload" 
              type="text"
              onChange={(e) => setPayload(e.target.value)} 
            />
          </Col>
          <Col>
            <SpinnerButton text="Push message" loading={loading} />
          </Col>
        </Row>
      </Form>
      {state ?
        <div>
          <div className="queue-state-container">
            <h3>Properties</h3>
            <div><b>Max size: </b>{state["max_size"]}</div>
            <div><b>Work mode: </b>{state["work_mode"]}</div> 
          </div>
          <div className="queue-state-container">
            <h3>Subscribers</h3>
            <div className="subscriber-card-deck">
              {state.subscribers.map(sub => <SubscriberCard subscriber={sub} />)}
            </div>
          </div>
          <div className="queue-state-container">
            <h3>Elements</h3>
            <div className="element-card-deck">
              {elements}
            </div>
          </div>
        </div>
        : <></> 
      }
    </>
  );
}
 
export default QueueInfo;
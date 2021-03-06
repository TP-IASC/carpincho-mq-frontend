import { useEffect, useState, useCallback } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ElementCard from "./ElementCard";
import SpinnerButton from "./SpinnerButton";
import config from "../config.json";
import { carpinchoGet, carpinchoPost, handleError, carpinchoDelete } from "../utils";
import SubscriberCard from "./SubscriberCard";


const QueueInfo = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);

  const getState = useCallback(() => {
    return carpinchoGet(`/queues/${name}/state`).then(res => {
      setState(res.data);
    }).catch(error => {
      handleError(error);
    });
  }, [name]);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    carpinchoPost(`/queues/${name}/messages`, { payload }).catch(error => {
      handleError(error);
    }).finally(() => {
      getState().then(() => {
        setLoading(false);
      });
    });
  }

  const deleteQueue = (event) => {
    carpinchoDelete(`/queues/${name}`).then(() => {
      navigate("/");
    }).catch(error => {
      handleError(error);
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getState();
    }, config.requestInterval); 
    return () => { clearInterval(interval); }
  }, [getState]);


  var elements = [];
  if(state) {
    elements = state.elements.map((e, index) => <ElementCard key={index} info={e} />);
  }

  return (
    <>
      <h1 className="title">{name}</h1>
      <div className="center-form-container">
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
            <Col>
              <Button variant="danger" onClick={deleteQueue}>Delete queue</Button>
            </Col>
          </Row>
        </Form>
      </div>
      {state ?
        <div>
          <div className="queue-state-container">
            <h3>Propiedades</h3>
            <div><b>Tama??o maximo: </b>{state["max_size"]}</div>
            <div><b>Modo de trabajo: </b>{state["work_mode"]}</div> 
            <div><b>Modo de transaccionalidad: </b>{state["queue_mode"]}</div> 
          </div>
          <div className="queue-state-container">
            <h3>Subscriptores</h3>
            <div className="subscriber-card-deck">
              {state.subscribers.map((sub, index) => <SubscriberCard key={index} subscriber={sub} />)}
            </div>
          </div>
          <div className="queue-state-container">
            <h3>Elementos</h3>
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
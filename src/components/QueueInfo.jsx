import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import ElementCard from "./ElementCard";
import randomQueue from "./randomQueue";
import SpinnerButton from "./SpinnerButton";


const QueueInfo = () => {
  const { name } = useParams();
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    
    const postPayload = () => {
      console.log(`Posting: ${payload}`);
      setTimeout(() => { setLoading(false)}, 5000);
    }

    setLoading(true);
    postPayload();
  }

  useEffect(() => {
    randomQueue(name).then((state) => {
      setState(state);
    });
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
      <div className="element-card-deck">
        {elements}
      </div>
    </>
  );
}
 
export default QueueInfo;
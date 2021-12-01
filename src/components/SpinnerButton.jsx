import { Spinner, Button } from "react-bootstrap";

const SpinnerButton = ({loading, text}) => {
  const spinner = <Spinner 
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    size="sm"
                  />
  
  return (
    <Button variant="primary" type="submit">
      {loading? spinner : <></>}
      {loading? " Loading..." : text}
    </Button>
  )
}
 
export default SpinnerButton;
import { useEffect } from 'react';
import Heading from '../components/Heading';
import Row from '../components/Row';
import { getRooms } from '../services/apiRooms';

function Rooms() {
  useEffect(() => {
    getRooms().then((response) => console.log(response));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All rooms</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Rooms;

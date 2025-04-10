import Heading from '../components/Heading';
import Row from '../components/Row';
import { getRooms } from '../services/apiRooms';
import RoomTable from '../features/rooms/RoomTable';

function Rooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All rooms</Heading>
        <p>Filter / Sorts</p>
      </Row>
      <Row>
        <RoomTable />
      </Row>
    </>
  );
}

export default Rooms;

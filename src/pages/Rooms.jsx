import Heading from '../components/Heading';
import Row from '../components/Row';
import RoomTable from '../features/rooms/RoomTable';
import AddRoom from '../features/rooms/AddRoom';
import RoomTableOperations from '../features/rooms/RoomTableOperations';

function Rooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All rooms</Heading>
        <RoomTableOperations />
      </Row>
      <Row>
        <RoomTable />
        <AddRoom />
      </Row>
    </>
  );
}

export default Rooms;

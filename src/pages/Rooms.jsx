import Heading from '../components/Heading';
import Row from '../components/Row';
import RoomTable from '../features/rooms/RoomTable';
import AddRoom from '../features/rooms/AddRoom';

function Rooms() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All rooms</Heading>
        <p>Filter / Sorts</p>
      </Row>
      <Row>
        <RoomTable />
        <AddRoom />
      </Row>
    </>
  );
}

export default Rooms;

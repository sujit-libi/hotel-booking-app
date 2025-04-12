import Heading from '../components/Heading';
import Row from '../components/Row';
import Button from '../components/Button';
import { getRooms } from '../services/apiRooms';
import RoomTable from '../features/rooms/RoomTable';
import { useState } from 'react';
import CreateRoomForm from '../features/rooms/CreateRoomForm';

function Rooms() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All rooms</Heading>
        <p>Filter / Sorts</p>
      </Row>
      <Row>
        <RoomTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new room
        </Button>
        {showForm && <CreateRoomForm />}
      </Row>
    </>
  );
}

export default Rooms;

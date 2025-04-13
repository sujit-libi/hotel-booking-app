import styled from 'styled-components';
import Spinner from '../../components/Spinner';
import RoomRow from './RoomRow';

import { useRooms } from './hooks/useRooms';
import Table from '../../components/Table';
import Menus from '../../components/Menus';

import { useSearchParams } from 'react-router-dom';
import Empty from '../../components/Empty';

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function RoomTable() {
  const { isLoading, rooms } = useRooms();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!rooms.length) return <Empty resourceName="rooms" />;

  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all';

  let filteredRooms;
  if (filterValue === 'all') filteredRooms = rooms;
  if (filterValue === 'no-discount')
    filteredRooms = rooms.filter((room) => room.discount === 0);
  if (filterValue === 'with-discount')
    filteredRooms = rooms.filter((room) => room.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get('sortBy') || 'start_date-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedRooms = filteredRooms.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Room</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Action</div>
        </Table.Header>

        <Table.Body
          data={sortedRooms}
          render={(room) => <RoomRow room={room} key={room.id} />}
        />
      </Table>
    </Menus>
  );
}

export default RoomTable;

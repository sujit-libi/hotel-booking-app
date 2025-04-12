import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';

import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import CreateRoomForm from './CreateRoomForm';

import { useDeleteRoom } from './hooks/useDeleteRoom';
import { useCreateRoom } from './hooks/useCreateRoom';

import Modal from '../../components/Modal';
import ConfirmDelete from '../../components/ConfirmDelete';
import Table from '../../components/Table';
import Menus from '../../components/Menus';

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Room = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function RoomRow({ room }) {
  const { isDeleting, deleteRoom } = useDeleteRoom();
  const { isCreating, createRoom } = useCreateRoom();

  const {
    id: roomId,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  } = room;

  function handleOnDuplicate() {
    createRoom({
      name: `Copy of ${name}`,
      max_capacity,
      regular_price,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Room>{name}</Room>
      <div>Fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={roomId} />

            <Menus.List id={roomId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleOnDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateRoomForm roomToEdit={room} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="rooms"
                disabled={isDeleting}
                onConfirm={() => deleteRoom(roomId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default RoomRow;

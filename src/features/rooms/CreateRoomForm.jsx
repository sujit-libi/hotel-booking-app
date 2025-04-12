import styled from 'styled-components';

import Input from '../../components/Input';
import Form from '../../components/Form';
import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import Textarea from '../../components/Textarea';
import { useForm } from 'react-hook-form';

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateRoomForm() {
  const { register, handleSubmit, reset } = useForm();

  function handleOnSubmit(data) {
    console.log(data, 'Form bata aako data');
  }
  return (
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormRow>
        <Label htmlFor="name">Room name</Label>
        <Input type="text" id="name" {...register('name')} />
      </FormRow>

      <FormRow>
        <Label htmlFor="max_capacity">Maximum capacity</Label>
        <Input type="number" id="max_capacity" {...register('max_capacity')} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regular_price">Regular price</Label>
        <Input
          type="number"
          id="regular_price"
          {...register('regular_price')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Room photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Edit Room</Button>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;

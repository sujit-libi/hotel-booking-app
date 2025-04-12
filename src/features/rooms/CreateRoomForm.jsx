import Input from '../../components/Input';
import Form from '../../components/Form';
import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import Textarea from '../../components/Textarea';
import FormRow from '../../components/FormRow';
import { useForm } from 'react-hook-form';

import { useCreateRoom } from './hooks/useCreateRoom';
import { useEditRoom } from './hooks/useEditRoom';

function CreateRoomForm({ roomToEdit = {}, onCloseModal }) {
  const { isCreating, createRoom } = useCreateRoom();
  const { isEditing, editRoom } = useEditRoom();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = roomToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function handleOnSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editRoom(
        { newRoomData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createRoom(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function handleOnError(error) {
    console.log(error);
  }
  return (
    <Form
      onSubmit={handleSubmit(handleOnSubmit, handleOnError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Room name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register('max_capacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register('regular_price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regular should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            // validate: (value) =>
            //   value <= getValues().regular_price ||
            //   'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Room photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Room' : 'Create new room'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;

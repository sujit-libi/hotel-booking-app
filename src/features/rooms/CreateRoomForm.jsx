import styled from 'styled-components';

import Input from '../../components/Input';
import Form from '../../components/Form';
import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import Textarea from '../../components/Textarea';
import FormRow from '../../components/FormRow';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoom } from '../../services/apiRooms';
import toast from 'react-hot-toast';

function CreateRoomForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newRoom) => createRoom(newRoom),
    onSuccess: () => {
      toast.success('New Room Successfully Created!!!');
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  function handleOnSubmit(data) {
    // console.log(data, 'Form bata aako data');
    // Later rename mutate this method to createRoom or something meaningfull.
    mutate(data);
  }

  function handleOnError(error) {
    console.log(error);
  }
  return (
    <Form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
      <FormRow label="Room name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regular_price ||
              'Discount should be less than regular price',
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
          disabled={isCreating}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Room photo">
        <FileInput
          id="image"
          accept="image/*"
          // {...register('image', {
          //   // required: isEditSession ? false : 'This field is required',
          //   required: 'This field is required',
          // })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit Room</Button>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;

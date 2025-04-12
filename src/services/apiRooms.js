import supabase, { supabaseUrl } from './supabase';

export async function getRooms() {
  let { data, error } = await supabase.from('rooms').select('*');

  if (error) {
    console.error(error);
    throw new Error('Room could not be loaded');
  }
  return data;
}

export async function deleteRoom(id) {
  const { data, error } = await supabase.from('rooms').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Room could not be deleted.');
  }

  return data;
}

export async function createRoom(newRoom) {
  const imageName = `${Math.random()}-${newRoom.image.name}`.replace('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  // 1. Creating new room
  const { data, error } = await supabase
    .from('rooms')
    .insert([{ ...newRoom, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Room could not be created.');
  }

  // 2. Uploading Image
  const { error: uploadingError } = await supabase.storage
    .from('room-images')
    .upload(imageName, newRoom.image);

  // 3. Delete the room if there was error while uploading image
  if (uploadingError) {
    await supabase.from('rooms').delete().eq('id', data.id);
    console.error(uploadingError);
    throw new Error(
      'Room image could not be uploaded and the room was not created'
    );
  }

  return data;
}

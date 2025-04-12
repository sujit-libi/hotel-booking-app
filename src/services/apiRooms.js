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

export async function createEditRoom(newRoom, id) {
  const hasImagePath = newRoom.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newRoom.image.name}`.replace('/', '');
  const imagePath = hasImagePath
    ? newRoom.image
    : `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  // 1. Creating new room or Editing room
  let query = supabase.from('rooms');

  // A) CREATE
  if (!id) query = query.insert([{ ...newRoom, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newRoom, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Room could not be created.');
  }

  // 2. Uploading Image
  if (hasImagePath) return data;

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

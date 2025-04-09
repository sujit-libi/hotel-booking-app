import supabase from './supabase';

export async function getRooms() {
  let { data: rooms, error } = await supabase.from('rooms').select('*');

  if (error) {
    console.error('Room could not be loaded');
    throw new Error('Room could not be loaded');
  }
  return rooms;
}

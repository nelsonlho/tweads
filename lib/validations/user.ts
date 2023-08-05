import * as z from 'zod';

const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(30, { message: 'Name must be no more than 30 characters long' }),
  username: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(30, { message: 'Name must be no more than 30 characters long' }),
  bio: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(1000, { message: 'Name must be no more than 1000 characters long' }),
});

export default UserValidation;

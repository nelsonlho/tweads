'use server';

import { revalidatePath } from 'next/cache';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';

type Params = {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  pathname: string;
};

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  pathname,
}: Params): Promise<void> {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (pathname === '/profile/edit') {
      revalidatePath(pathname);
    }
  } catch (error: any) {
    throw new Error(`Failed to update/create user: ${error?.message}`);
  }
}

'use server';

import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    // const communityIdObject = await Community.findOne(
    //   { id: communityId },
    //   { _id: 1 }
    // );

    const createdThread = await Thread.create({
      text,
      author,
      community: null, // Assign communityId if provided, or leave it null for personal account
    });

    // Update User model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    // if (communityIdObject) {
    //   // Update Community model
    //   await Community.findByIdAndUpdate(communityIdObject, {
    //     $push: { threads: createdThread._id },
    //   });
    // }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;
  // Fetch posts with no parents (only threads, not comments to threads)
  const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: 'author', model: User })
    .populate({
      path: 'children',
      populate: {
        path: 'author',
        model: User,
        select: '_id name parentId image',
      },
    });

  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const threads = await threadsQuery.exec();
  const isNext = totalPostsCount > skipAmount + threads.length;
  return { threads, isNext };
}

export async function fetchThreadById(id: string) {
  try {
    connectToDB();
    const thread = await Thread.findById(id)
      .populate({
        path: 'author',
        model: User,
        select: '_id id name image',
      })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: User,
            select: '_id id name image',
          },
          {
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: User,
              select: '_id id name image',
            },
          },
        ],
      })
      .exec();
    return thread;
  } catch (error: any) {
    throw new Error(`Failed to fetch thread: ${error.message}`);
  }
}

import { Request, Response } from 'express';
import { AuthUser, ErrorCodes, ErrorMessages, UserRole } from '../constants';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary';
import {
  getPostsByChannelId,
  getPostsByAuthorId,
  getPostById,
  createPost,
  deletePost,
  getFollowedPosts,
  postById,
  updatePost,
  pinPost,
  getPosts,
  getUsers,
} from '../db';
import { extractHashtags, extractMentions } from '../utils/textUtils';
import { getUserByUsername } from '../db';

const PostController = {
  postsByFollowing: async (req: Request, res: Response): Promise<any> => {
    const authUser = req.user as AuthUser;
    const { offset, limit } = req.query;
    const posts = await getFollowedPosts(authUser?._id, +offset, +limit);
    return res.send(posts);
  },
  postsByChannelId: async (req: Request, res: Response): Promise<any> => {
    const { channelId } = req.params;
    const { offset, limit } = req.query;
    const posts = await getPostsByChannelId(channelId, +offset, +limit);
    return res.send(posts);
  },
  postsByAuthorId: async (req: Request, res: Response): Promise<any> => {
    const { authorId } = req.params;
    const { offset, limit } = req.query;
    const posts = await getPostsByAuthorId(authorId, +offset, +limit);
    return res.send(posts);
  },
  postById: async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const post = await getPostById(id);
    return res.send(post);
  },
  create: async (req: Request, res: Response): Promise<any> => {
    const { title } = req.body;
    const authUser = req.user as AuthUser;

    if (!title && !req.file) {
      return res.status(400).send('Title or image is required');
    }

    let imageUrl, imagePublicId;
    if (req.file) {
      const result = await uploadToCloudinary(req.file, 'post');
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    // Extract hashtags and mentions from the title
    const hashtags = title ? extractHashtags(title) : [];
    const mentionUsernames = title ? extractMentions(title) : [];
    
    // Get user IDs for mentions
    const mentionPromises = mentionUsernames.map(username => getUserByUsername(username));
    const mentionUsers = await Promise.all(mentionPromises);
    const mentions = mentionUsers.filter(user => user).map(user => user._id);

    const post = await createPost(
      title,
      imageUrl,
      imagePublicId,
      null, // channelId
      authUser._id,
      hashtags,
      mentions
    );

    return res.send(post);
  },
  update: async (req: Request, res: Response): Promise<any> => {
    const authUser = req.user as AuthUser;
    const { postId, title, imageToDeletePublicId, channelId } = req.body;
    const image = req.file;

    // Super Admins can update another user's post.
    if (authUser.role !== UserRole.SuperAdmin) {
      // Check if the post author is updating the post.
      const post: any = await postById(postId);
      if (post.author.toString() !== authUser._id.toString()) {
        return res.status(ErrorCodes.Bad_Request).send('Unauthorized');
      }
    }

    // If the imageToDeletePublicId is defined, we need to remove an existing image.
    if (imageToDeletePublicId) {
      const deleteImage = await deleteFromCloudinary(imageToDeletePublicId);
      if (deleteImage.result !== 'ok') {
        return res.status(ErrorCodes.Internal).send(ErrorMessages.Generic);
      }
    }

    // If an image is defined, we need to upload a new image.
    let imageUrl: string;
    let imagePublicId: string;
    if (image) {
      const uploadImage = await uploadToCloudinary(image, 'post');
      if (!uploadImage.secure_url) {
        return res.status(ErrorCodes.Internal).send(ErrorMessages.Generic);
      }
      imageUrl = uploadImage.secure_url;
      imagePublicId = uploadImage.public_id;
    }

    const updatedPost = await updatePost(postId, title, imageUrl, imagePublicId, imageToDeletePublicId, channelId);
    return res.send(updatedPost);
  },
  delete: async (req: Request, res: Response): Promise<any> => {
    const { id, imagePublicId } = req.body;
    const authUser = req.user as AuthUser;

    // Super Admins can delete another user's post.
    if (authUser.role !== UserRole.SuperAdmin) {
      // Check if the post author is removing the post.
      const post: any = await postById(id);
      if (post.author.toString() !== authUser._id.toString()) {
        return res.status(ErrorCodes.Bad_Request).send(ErrorMessages.Generic);
      }
    }

    if (imagePublicId) {
      const deleteImage = await deleteFromCloudinary(imagePublicId);
      if (deleteImage.result !== 'ok') {
        return res.status(ErrorCodes.Internal).send(ErrorMessages.Generic);
      }
    }

    const deletedPost = await deletePost(id);
    return res.send(deletedPost);
  },
  pin: async (req: Request, res: Response): Promise<any> => {
    const { id, pinned } = req.body;
    const updatedPost = await pinPost(id, pinned);
    return res.send(updatedPost);
  },
  searchByHashtag: async (req: Request, res: Response): Promise<any> => {
    const { hashtag } = req.params;
    const { offset = 0, limit = 10 } = req.query;
    
    const posts = await getPosts({
      hashtags: { $in: [hashtag.toLowerCase()] },
      mentions: null,
      offset: +offset,
      limit: +limit,
    });
    
    return res.send(posts);
  },
  searchByMention: async (req: Request, res: Response): Promise<any> => {
    const { username } = req.params;
    const { offset = 0, limit = 10 } = req.query;
    
    const posts = await getPosts({
      hashtags: null,
      mentions: username,
      offset: +offset,
      limit: +limit,
    });
    
    return res.send(posts);
  },
  getUserSuggestions: async (req: Request, res: Response): Promise<any> => {
    const { query } = req.query;
    if (!query) {
      return res.send([]);
    }

    const users = await getUsers(
      0, // offset
      5, // limit
      null, // authUserId
      false, // emailVerified
      false, // hideBannedUsers
      query as string // searchQuery
    );

    return res.send(users);
  },
};

export default PostController;

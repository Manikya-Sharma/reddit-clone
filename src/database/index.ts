import type { Comment } from "./types/comment";
import type { Post } from "./types/post";
import type { Sub } from "./types/sub";
import type { User } from "./types/user";

type DBResponse = {
  status: "200" | "400" | "401" | "404" | "500" | "501";
  message?: string;
};

export abstract class Database {
  /**
   * Initialize the database for cold start
   */
  initialize(): void {}
  /**
   * Create a new user in the database
   *
   * @param user The details of new user to be created
   */
  public abstract createUser({ user }: { user: User }): DBResponse;
  /**
   * Update an existing user in the database
   *
   * @param id The id of the user to update
   * @param newDetails The new data to be overriden
   */
  protected abstract updateUser({
    id,
    newDetails,
  }: {
    id: User["id"];
    newDetails: Partial<User>;
  }): DBResponse;
  /**
   *
   * @param id The id of user to be deleted
   */
  public abstract deleteUser({ id }: { id: User["id"] }): DBResponse;
  /**
   *
   * @param id get user with this id
   */
  public abstract getUser({ id }: { id: User["id"] }): DBResponse;
  /**
   *
   * @param email get user with this email
   */
  public abstract getUser({ email }: { email: User["email"] }): DBResponse;

  /**
   * Create a new subreddit in the database
   *
   * @param sub The details of new sub to be created
   * @param creatorId The id of the user who created the sub
   */
  public abstract createSub({
    sub,
    creatorId,
  }: {
    sub: Sub;
    creatorId: User["id"];
  }): DBResponse;
  /**
   * Update an existing sub in the database
   *
   * @param id The id of the user to update
   * @param newDetails The new data to be overriden
   */
  protected abstract updateSub({
    id,
    newDetails,
  }: {
    id: Sub["id"];
    newDetails: Partial<Sub>;
  }): DBResponse;

  /**
   *
   * @param userId The id of the used who joins the Sub
   * @param subId The id of the sub which user wants to join
   */
  public abstract joinSub({
    userId,
    subId,
  }: {
    userId: User["id"];
    subId: Sub["id"];
  }): DBResponse;

  /**
   *
   * @param id The id of sub to be deleted
   */
  public abstract deleteSub({ id }: { id: Sub["id"] }): DBResponse;
  /**
   *
   * @param id get sub with this id
   */
  public abstract getSub({ id }: { id: Sub["id"] }): DBResponse;
  /**
   *
   * @param id get sub with this title
   */
  public abstract getSub({ title }: { title: Sub["title"] }): DBResponse;

  /**
   * Create a new post in the database
   *
   * @param sub The details of new post to be created
   * @param creatorId The id of user who created the post
   */
  public abstract createPost({
    post,
    creatorId,
  }: {
    post: Post;
    creatorId: User["id"];
  }): DBResponse;

  /**
   *
   * @param id The id of post to be deleted
   */
  public abstract deletePost({ id }: { id: Post["id"] }): DBResponse;
  /**
   *
   * @param id get post with this id
   */
  public abstract getPost({ id }: { id: Post["id"] }): DBResponse;

  /**
   * Create a new comment in the database
   *
   * @param sub The details of new comment to be created
   */
  public abstract createComment({ comment }: { comment: Comment }): DBResponse;

  /**
   * Update a comment
   * @param commentId The id of the comment to update
   * @param newComment The new details to be put
   */
  protected abstract updateComment({
    commentId,
    newComment,
  }: {
    commentId: Comment["id"];
    newComment: Partial<Comment>;
  }): DBResponse;

  /**
   * Delete a comment
   * @param commentId The id of the comment to be deleted
   */
  public deleteComment({ commentId }: { commentId: string }): DBResponse {
    return this.updateComment({
      commentId,
      newComment: {
        content: "This comment was deleted",
      },
    });
  }

  /**
   *
   * @param id get comment with this id
   */
  public abstract getComment({ id }: { id: Comment["id"] }): DBResponse;
}

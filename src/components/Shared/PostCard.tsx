import { useUserContext } from '@/context/AuthContext'
import { formatDate } from '@/lib/utils'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'


type PostCardProp = {
  post: Models.Document
}
const PostCard = ({ post }: PostCardProp) => {

  const { user } = useUserContext();
  if (!post.creator) return null;


  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-4'>
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='creator'
              className='rounded-full w-12 lg:h-12'
            />

          </Link>
          <div className="flex flex-col">
            <p className='base-medium lg:body-bold text-light-1'>
              {post.creator.name}
            </p>
            <div className='flex-center lg:body-bold text-light-3'>
              <p className='subtle-semibold  lg:small-regular'>
                {formatDate(post.$createdAt)}
              </p>
              -
              <p className='subtle-semibold lg:small-regular'>
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link to={'/update-post/${post.$id}'} className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img src="/assets/icons/edit.svg" alt="edit" width={20} />
        </Link>
      </div>
      <Link to={`/post/${post.$id}`}>
        <div className='small-medium lg:base-medium py-5 gap-3'>
          <p>{post.caption}</p>
          <img
            src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
            className='post-card_img'
            alt='post image'
          />
          <ul className='flex gap-1 mt-2'>
            {post.tags.map((tag: string) => (
              <li key={tag} className='text-light-3'>#{tag}</li>
            )
            )}
          </ul>
        </div>
      </Link>

      <PostStats post={post} userId={user.id}/>
    </div>
  )
}

export default PostCard
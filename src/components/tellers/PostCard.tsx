import { dayjs } from '@/utils/config'
import { ITeller, ITellerPost } from '@/utils/types'

type Props = {
  profile: ITeller
  post: ITellerPost
}

const PostCard = ({ profile, post }: Props) => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-xl">
      <div className="flex items-center gap-x-3 mb-3">
        <img
          src={profile.img}
          alt={profile.nameEN}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="block">
          <div className="font-bold text-2xl">{profile.nameEN}</div>
          <div className="font-light text-sm">
            {dayjs().to(dayjs.unix(post.dateCreated._seconds))}
          </div>
        </div>
      </div>
      <div>{post.content}</div>
      <div className="aspect-w-3 aspect-h-2 mt-3">
        <img src={post.img} className="h-full w-full object-cover rounded-xl" />
      </div>
    </div>
  )
}

export default PostCard

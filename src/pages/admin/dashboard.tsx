import Layout from '@/layouts'
import { HolyFansApi } from '@/utils/api'
import { useAuth } from '@/utils/auth'
import { dayjs } from '@/utils/config'
import { ITeller, ITellerPost, IUser } from '@/utils/types'
import { useEffect, useState } from 'react'

const AdminDashBoard = () => {
  const { token } = useAuth()

  const [posts, setPosts] = useState<ITellerPost[]>([])
  const [tellers, setTellers] = useState<ITeller[]>([])
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    ;(async () => {
      if (token) {
        const {
          data: { payload: usersRes },
        } = await HolyFansApi.admin.users.getAll(token)
        const {
          data: { payload: tellersRes },
        } = await HolyFansApi.tellers.getAll()
        const {
          data: { payload: postsRes },
        } = await HolyFansApi.admin.posts.getAll(token)

        setUsers(usersRes)
        setTellers(tellersRes)
        setPosts(postsRes)
      }
    })()
  }, [])

  return (
    <Layout adminUi className="max-w-screen-sm pt-28">
      <div className="text-4xl font-bold">Admin Dashboard</div>
      <div className="mt-5 grid grid-cols-4 border border-pink-400 rounded-xl">
        <div className="col-span-1 p-5 font-bold text-xl border-r border-pink-400">
          Welcome to <span className="text-pink-400">HolyFans</span>
        </div>
        <div className="col-span-1 flex items-center justify-center gap-x-3">
          Users
          <div className="flex items-center justify-center bg-gray-200 h-10 w-16 rounded-xl border-2 border-pink-400">
            {users.length}
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center gap-x-3">
          Tellers
          <div className="flex items-center justify-center bg-gray-200 h-10 w-16 rounded-xl border-2 border-pink-400">
            {tellers.length}
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center gap-x-3">
          Posts
          <div className="flex items-center justify-center bg-gray-200 h-10 w-16 rounded-xl border-2 border-pink-400">
            {posts.length}
          </div>
        </div>
      </div>
      <div className="mt-5 gap-x-5">
        <div className="p-5 border border-pink-400 rounded-xl">
          <div className="font-bold text-xl mb-2">Recently Published</div>
          <table className="min-w-full">
            <tbody>
              {posts.slice(0, 5).map((p) => (
                <tr key={p.id}>
                  <td className="py-2 w-1/3">
                    {dayjs
                      .unix(p.dateCreated._seconds)
                      .format(`MMM DD, YYYY, HH:mm A`)}
                  </td>
                  <td className="py-2 w-1/3 font-bold text-pink-500">
                    <div className="line-clamp-1">{p.content}</div>
                  </td>
                  <td className="py-2 w-1/3">{p.author?.nameEN}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashBoard

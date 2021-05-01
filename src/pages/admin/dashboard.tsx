import Layout from '@/layouts'

const AdminDashBoard = () => {
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
            11
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center gap-x-3">
          Tellers
          <div className="flex items-center justify-center bg-gray-200 h-10 w-16 rounded-xl border-2 border-pink-400">
            11
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center gap-x-3">
          Posts
          <div className="flex items-center justify-center bg-gray-200 h-10 w-16 rounded-xl border-2 border-pink-400">
            11
          </div>
        </div>
      </div>
      <div className="mt-5 gap-x-5">
        <div className="p-5 border border-pink-400 rounded-xl">
          <div className="font-bold text-xl mb-2">Recently Published</div>
          <table className="min-w-full">
            <tbody>
              <tr>
                <td className="py-2 w-1/3">Today, 7:00 AM</td>
                <td className="py-2 w-1/3 font-bold text-pink-500">
                  Hello World
                </td>
                <td className="py-2 w-1/3">John Doe</td>
              </tr>
              <tr>
                <td className="py-2 w-1/3">Today, 7:00 AM</td>
                <td className="py-2 w-1/3 font-bold text-pink-500">
                  Hello World
                </td>
                <td className="py-2 w-1/3">John Doe</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashBoard

import { ITeller } from '@/utils/types'
import { Link } from 'react-router-dom'

type Props = {
  d: ITeller
}

const ResultCard = ({ d }: Props) => {
  return (
    <Link to={`/tellers/${d.id}`}>
      <div className="bg-white p-5 shadow-lg rounded-xl grid grid-cols-4 gap-x-5">
        <div className="aspect-w-2 aspect-h-3 rounded-xl col-span-1">
          <img src={d.img} className="h-full w-full object-cover rounded-xl" />
        </div>
        <div className="col-span-3 flex flex-col py-2">
          <div className="text-xs mb-1 flex gap-x-2">
            {d.category.map((cat) => (
              <div
                className="p-1 px-2 rounded-md bg-red-300"
                key={`${d.nameEN}-${cat}`}
              >
                {cat}
              </div>
            ))}
          </div>

          <div className="font-bold text-4xl mb-3">
            {d.nameEN}{' '}
            {d.nameTH && (
              <span className="font-normal text-lg">({d.nameTH})</span>
            )}
          </div>
          <div className="line-clamp-3">{d.bio}</div>
        </div>
      </div>
    </Link>
  )
}

export default ResultCard

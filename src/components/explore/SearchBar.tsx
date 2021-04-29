import { useEffect, useState } from 'react'
import { Form, Field, withFormik, FormikProps } from 'formik'

import { ISearch, IAdvSearch } from '@/utils/types'

const advancedSearchModule: IAdvSearch = {
  categories: {
    name: 'Categories',
    option: [
      { name: 'Tarot', value: 'Tarot' },
      { name: 'Thai Horo', value: 'Thai Horo' },
      { name: 'Chinese Horo', value: 'Chinese Horo' },
      { name: 'Zodiac Sign', value: 'Zodiac Sign' },
      { name: 'Candle prediction', value: 'Candle prediction' },
      { name: 'Feng Shui', value: 'Feng Shui' },
    ],
  },
  area: {
    name: 'Area',
    option: [
      { name: 'Bangkok', value: 'Bangkok' },
      { name: 'Central', value: 'Central' },
    ],
  },
  price_range: {
    name: 'Price Range',
    option: [
      { name: '0฿ - 100฿', value: '1' },
      { name: '101฿ - 300฿', value: '2' },
      { name: '300฿ - 500฿', value: '3' },
      { name: '500฿ - 1,000฿', value: '4' },
    ],
  },
}

type FormProps = {
  onSubmit?: (value: ISearch) => void
  value?: ISearch
}

const SearchBar = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
}: FormikProps<ISearch>) => {
  const [isAdvSearchOpen, toggleAdvSearch] = useState<boolean>(false)

  useEffect(() => {
    toggleAdvSearch(
      !['categories', 'area', 'price_range'].every((adv) => {
        if (values[adv] === '') {
          return true
        }
        return false
      })
    )
  }, [])

  return (
    <div className="relative mx-auto my-10">
      <Form onSubmit={handleSubmit}>
        <div className="relative">
          <label
            htmlFor="search_keyword"
            className="flex h-full absolute top-0 left-3 items-center font-bold z-10"
          >
            Find
          </label>
          <Field
            id="search_keyword"
            name="search_keyword"
            placeholder="Your best fortune teller..."
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.search_keyword}
            autoComplete="off"
            type="text"
            className="w-full bg-gray-100 focus:bg-gray-50 text-black border-0 focus:ring focus:ring-pink-400 rounded-xl py-3 pr-10 pl-14 appearance-none leading-none"
          />
          <button
            type="submit"
            className="flex h-full absolute top-0 right-3 items-center z-10 material-icons focus:outline-none"
          >
            search
          </button>
        </div>
        <div className="flex flex-col mx-auto mt-3 items-end space-y-3">
          <div
            className="flex items-center cursor-pointer select-none"
            id="advanced-search-btn"
            onClick={() => toggleAdvSearch(!isAdvSearchOpen)}
          >
            Advanced Search
            <span className="material-icons">
              {isAdvSearchOpen ? `expand_less` : `expand_more`}
            </span>
          </div>
          {isAdvSearchOpen && (
            <div className="w-full flex gap-x-3">
              {Object.keys(advancedSearchModule).map((k) => {
                const data = advancedSearchModule[k]
                return (
                  <div className="flex-auto" key={data.name}>
                    <Field
                      component="select"
                      name={k.toLowerCase()}
                      id={k.toLowerCase()}
                      value={values[k]}
                      className="block w-full appearance-none rounded-xl bg-gray-100 focus:bg-gray-50 border-0 focus:ring focus:ring-pink-400"
                    >
                      <option value="">-- {data.name} --</option>
                      {data.option.map((o) => {
                        return (
                          <option
                            value={o.value}
                            key={`${data.name}-${o.name}`}
                          >
                            {o.name}
                          </option>
                        )
                      })}
                    </Field>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Form>
    </div>
  )
}

const SearchInput = withFormik<FormProps, ISearch>({
  mapPropsToValues: (props) => ({
    search_keyword: props.value?.search_keyword || '',
    categories: props.value?.categories || '',
    area: props.value?.area || '',
    price_range: props.value?.price_range || '',
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit?.(values)
    setSubmitting(false)
  },
})(SearchBar)

export default SearchInput

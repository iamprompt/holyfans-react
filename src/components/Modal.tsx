import {
  useEffect,
  useRef,
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ActionModal } from '@/utils/types'

type Props = {
  open: [boolean, Dispatch<SetStateAction<boolean>>]
  title: string
  desc: string
  action?: ActionModal[]
}

const Modal = ({ open: [isOpen, setOpen], title, desc, action }: Props) => {
  const toggleModal = () => {
    setOpen(!isOpen)
  }

  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="fixed inset-0 z-10 overflow-y-auto"
          static
          open={isOpen}
          onClose={toggleModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>

                <Dialog.Description>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                  {action && (
                    <div className="mt-4 flex justify-end gap-x-3">
                      {action?.map((a) => {
                        const buttonColor =
                          a.variant === 'blue'
                            ? 'text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500'
                            : a.variant === 'red'
                            ? 'text-red-900 bg-red-100 hover:bg-red-200 focus-visible:ring-red-500'
                            : 'text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500'

                        return (
                          <button
                            type="button"
                            className={`inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonColor}`}
                            onClick={a.action}
                          >
                            {a.title}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </Dialog.Description>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal

import Link from 'next/link';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../Button';

export function AccountVerificationFormReumeInBackgroundModal({ isOpen, onClose }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
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
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
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
            <div className="inline-block w-full max-w-sm p-6 my-4 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-lg text-center space-y-6">
              {/* TODO: Add X close button */}
              <Dialog.Title as="h3" className="text-2xl font-semibold tracking-tight leading-tight">
                Resume in background?
              </Dialog.Title>
              <p className="text-sm text-neutral-muted-darker leading-relaxed">TODO</p>
              <div className="space-y-2">
                <Link href="/" passHref>
                  <Button as="a" variant="bold" block>
                    Yes, resume in background
                  </Button>
                </Link>
                <Button onClick={onClose} variant="subtle" block>
                  No, go back
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

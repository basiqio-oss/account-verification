import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../Button';

export function AccountVerificationFormCancellationModal({ isOpen, onClose, onConfirm }) {
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
            <Dialog.Overlay className="fixed inset-0" />
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl text-center space-y-8">
              <Dialog.Title as="h3" className="text-3xl font-bold">
                Cancel connecting bank account?
              </Dialog.Title>
              <div className="space-y-2">
                <p>Any information you have provided will be deleted permanently.</p>
                <p>This action can not be undone.</p>
              </div>
              <div className="space-y-2">
                <Button onClick={onConfirm} variant="critical" block>
                  Yes, cancel
                </Button>
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

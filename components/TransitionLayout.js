import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

export function TransitionLayout({ children }) {
  const [isShowing, setIsShowing] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsShowing(true);
  }, []);

  useEffect(() => {
    if (children !== displayChildren) setIsShowing(false);
  }, [children, setDisplayChildren, displayChildren]);

  return (
    <Transition
      appear={true}
      show={isShowing}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-105"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-300"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
      afterLeave={() => {
        if (!isShowing) {
          setDisplayChildren(children);
          setIsShowing(true);
        }
      }}
    >
      {displayChildren}
    </Transition>
  );
}

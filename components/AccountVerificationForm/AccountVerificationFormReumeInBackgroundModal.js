import Link from 'next/link';
import { Button } from '../Button';
import { Modal, ModalTitle } from '../Modal';

export function AccountVerificationFormReumeInBackgroundModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle>Resume in background?</ModalTitle>
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
    </Modal>
  );
}

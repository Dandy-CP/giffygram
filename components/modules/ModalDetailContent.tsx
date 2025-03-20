import React from 'react';
import { useRouter } from 'next/router';
import Modal from './Modal';
import { ModalContent } from '../partials';

const ModalDetailContent = () => {
  const router = useRouter();
  const content = router.query.content;

  return (
    <Modal
      isOpen={content}
      onClose={() => {
        router.back();
      }}
    >
      <ModalContent />
    </Modal>
  );
};

export default ModalDetailContent;

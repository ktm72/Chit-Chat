"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  src: string | null;
};

const ImageModal: React.FC<Props> = ({ isOpen, onClose, src }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image alt="sent" className="object-cover" fill src={src || ""} />
      </div>
    </Modal>
  );
};

export default ImageModal;

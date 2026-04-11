"use client";

import { useCallback, useRef, useState } from "react";
import ImagePreviewModal from "./ImagePreviewModal";
import SidebarDesktop from "./sidebar/SidebarDesktop";
import SidebarMobile from "./sidebar/SidebarMobile";
import { profileImage } from "./sidebar/shared";

export default function Sidebar() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const imageModalTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openImageModal = useCallback((triggerEl: HTMLButtonElement) => {
    imageModalTriggerRef.current = triggerEl;
    setIsImageModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);

  return (
    <>
      <SidebarMobile
        isImageModalOpen={isImageModalOpen}
        onOpenImageModal={openImageModal}
      />
      <SidebarDesktop onOpenImageModal={openImageModal} />

      <ImagePreviewModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        src={profileImage.src}
        alt={profileImage.alt}
        ariaLabel="Expanded photo of Benjamin Garcia"
        containerClassName="max-w-lg"
        returnFocusRef={imageModalTriggerRef}
        width={profileImage.width}
        height={profileImage.height}
        sizes="(max-width: 512px) 100vw, 512px"
      />
    </>
  );
}

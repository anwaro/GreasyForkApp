import { useEffect, useState } from 'preact/hooks';

import { ModalEvents } from './events';

export function useGlpModal(eventName: ModalEvents) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener(eventName, () => setIsVisible(true));
  }, []);

  return {
    isVisible,
    onClose: () => setIsVisible(false),
  };
}

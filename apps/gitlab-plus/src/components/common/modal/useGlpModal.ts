import { useEffect, useState } from 'preact/hooks';

export function useGlpModal(eventName: string) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener(eventName, () => setIsVisible(true));
  }, []);

  return {
    isVisible,
    onClose: () => setIsVisible(false),
  };
}

import { useEffect, useRef } from 'preact/hooks';

export function useAsyncAutocompleteButton(hide: () => void) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (
        ref.current &&
        e.target !== ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        hide();
      }
    });
  }, []);

  return ref;
}

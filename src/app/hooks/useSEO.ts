import { useEffect } from 'react';

const BASE_TITLE = 'LULA | Let Us Live Association';

export function useSEO(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | LULA` : BASE_TITLE;

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (meta) meta.content = description;
    }

    return () => {
      document.title = BASE_TITLE;
    };
  }, [title, description]);
}

import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageProvider';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
        element: {
          getInstance: () => {
            execute: (command: string, ...args: string[]) => void;
          } | undefined;
        };
      };
    };
  }
}

export default function GoogleTranslate() {
  const { language } = useLanguage();

  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,fr,sw',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element'
        );
      }
    };

    addScript();

    return () => {
      // Cleanup
      const script = document.getElementById('google-translate-script');
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Sync language context changes with Google Translate
  useEffect(() => {
    try {
      const googleTranslateElement = window.google?.translate?.element?.getInstance?.();
      if (googleTranslateElement) {
        // Map language codes to Google Translate language codes
        const languageMap: Record<string, string> = {
          en: 'en',
          fr: 'fr',
          sw: 'sw'
        };
        
        const translationLanguage = languageMap[language] || 'en';
        googleTranslateElement.execute('language/translate', translationLanguage);
      }
    } catch (error) {
      console.debug('Google Translate sync error (non-critical):', error);
    }
  }, [language]);

  return (
    <div id="google_translate_element" className="google-translate-container hidden"></div>
  );
}

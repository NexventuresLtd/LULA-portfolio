import { Language } from '../../context/LanguageProvider';

interface Props {
  currentLang: Language;
  onChange: (lang: Language) => void;
}

export function LanguageFormSelector({ currentLang, onChange }: Props) {
  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'sw', label: 'Kiswahili' },
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit">
      {langs.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => onChange(lang.code)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            currentLang === lang.code
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './context/LanguageProvider';
import { ContentProvider } from './context/ContentContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <LanguageProvider>
      <ContentProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </ContentProvider>
    </LanguageProvider>
  );
}
import { Link } from 'react-router';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageProvider';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function NGOFooter() {
  const { language, setLanguage, t } = useLanguage();

  const footerLinks = [
    { path: '/about', label: t('nav.about') },
    { path: '/programs', label: t('nav.programs') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/impact-stories', label: t('nav.impact') },
    { path: '/news', label: t('nav.news') },
    { path: '/team', label: t('nav.team') },
    { path: '/partners', label: t('nav.partners') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Heart className="h-6 w-6 text-green-900 fill-blue-900" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">LULA</span>
                <span className="text-sm text-green-200">Let Us Live Association</span>
              </div>
            </div>
            <p className="text-green-100 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-800 hover:bg-green-700 p-2 rounded-lg transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-800 hover:bg-green-700 p-2 rounded-lg transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-800 hover:bg-green-700 p-2 rounded-lg transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-800 hover:bg-green-700 p-2 rounded-lg transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0, 4).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.getInTouch')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-green-100">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Goma, North Kivu, Democratic Republic of Congo</span>
              </li>
              <li className="flex items-center gap-2 text-green-100">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@lula-drc.org" className="hover:text-white transition-colors">
                  info@lula-drc.org
                </a>
              </li>
              <li className="flex items-center gap-2 text-green-100">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+243999123456" className="hover:text-white transition-colors">
                  +243 999 123 456
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-green-200 text-sm">{t('footer.rights')}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-green-100 hover:text-white hover:bg-green-800">
                <Globe className="h-4 w-4" />
                <span className="uppercase">{language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('fr')}>
                Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('sw')}>
                Kiswahili
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </footer>
  );
}

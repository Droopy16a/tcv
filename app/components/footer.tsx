import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/tcvernouillet";
const FACEBOOK_URL = "https://www.facebook.com/tcvernouillet";
const WHATSAPP_URL = "https://www.whatsapp.com/channel/0029VbDcJL72ZjCwMOx2Sl2E";

export default function Footer() {
  const address = "1 allée Louis Dufau\n78540 Vernouillet";
  const phone = "09 52 58 55 50";
  const email = "tcvernouillet@gmail.com";
  const siteName = "T.C. Vernouillet";
  const seoDesc = "Depuis 1974, un club de tennis de référence au cœur des Yvelines. Des infrastructures de pointe et une école de tennis pour tous.";

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className="font-heading font-black text-2xl uppercase tracking-tighter mb-6">{siteName}</h3>
            <p className="text-gray-400 mb-6 font-light max-w-sm whitespace-pre-wrap">
              {seoDesc}
            </p>
            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram du T.C. Vernouillet"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:text-white transition-all duration-300"
              >
                {/* Instagram SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook du T.C. Vernouillet"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                {/* Facebook SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chaîne WhatsApp du T.C. Vernouillet"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-400 hover:bg-green-500 hover:text-white transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.44 0 .07 5.37.07 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.95 11.95 0 0 0 5.83 1.49h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.24-6.2-3.49-8.41ZM12.04 21.84a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.87 9.87 0 0 1-1.52-5.29c0-5.48 4.46-9.94 9.95-9.94a9.88 9.88 0 0 1 7.03 2.91 9.88 9.88 0 0 1 2.91 7.04c0 5.48-4.46 9.94-9.94 9.94Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.77-1.65-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-gray-500 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-light text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent shrink-0 mt-1" />
                <a href="" className="hover:text-white transition-colors">{address}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
            </ul>
          </div>
          
          {/* Liens */}
          <div className="col-span-1 lg:col-span-1">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-gray-500 mb-6">Informations</h4>
            <ul className="space-y-3 text-sm font-light text-gray-300 flex flex-col">
              <Link href="/mentions-legales" className="hover:text-white transition-colors w-fit">Mentions Légales</Link>
              <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors w-fit">Politique de Confidentialité</Link>
              <Link href="/cgv" className="hover:text-white transition-colors w-fit">CGV</Link>
            </ul>
          </div>

          {/* Map */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="w-full h-64 md:h-full min-h-[250px] rounded-xl overflow-hidden opacity-80 hover:opacity-100 transition-opacity duration-300">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d708.5149859726247!2d1.9912592696596592!3d48.96865067860683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e68c4462aebfcd%3A0x4e3bf3550632a222!2sTennis%20club%20vernouillet!5e1!3m2!1sfr!2sfr!4v1783346533729!5m2!1sfr!2sfr" 
                className="w-full h-full border-0" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} {siteName}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
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
            <div className="flex gap-4">
              {/* Social icons removed for build compatibility */}
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
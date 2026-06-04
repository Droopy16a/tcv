import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading font-black text-2xl uppercase tracking-tighter mb-6">T.C. Vernouillet</h3>
            <p className="text-gray-400 mb-6 font-light max-w-sm">
              Depuis 1974, un club de tennis de référence au cœur des Yvelines.
              Des infrastructures de pointe et une école de tennis pour tous.
            </p>
            <div className="flex gap-4">
              {/* Social icons removed for build compatibility */}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-gray-500 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-light text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent shrink-0 mt-1" />
                <span>83 Boulevard de l'Europe<br />78540 Vernouillet</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent shrink-0" />
                <span>01 39 71 07 61</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent shrink-0" />
                <a href="mailto:tcvernouillet@gmail.com" className="hover:text-white transition-colors">tcvernouillet@gmail.com</a>
              </li>
            </ul>
          </div>
          
          {/* Liens */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-gray-500 mb-6">Informations</h4>
            <ul className="space-y-3 text-sm font-light text-gray-300 flex flex-col">
              <Link href="#" className="hover:text-white transition-colors w-fit">Mentions Légales</Link>
              <Link href="#" className="hover:text-white transition-colors w-fit">Politique de Confidentialité</Link>
              <Link href="#" className="hover:text-white transition-colors w-fit">CGV</Link>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Tennis Club Vernouillet. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
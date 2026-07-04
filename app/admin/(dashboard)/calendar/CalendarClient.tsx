"use client";

import { useState, useTransition } from "react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, MapPin, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { addEvent, updateEvent, deleteEvent } from "./actions";

type Event = {
  id: string;
  title: string;
  description: string;
  date_text: string;
  sort_date: string;
  type: string;
};

export default function CalendarClient({ initialEvents }: { initialEvents: Event[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
    } else {
      setEditingEvent(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      let result;
      if (editingEvent) {
        result = await updateEvent(editingEvent.id, formData);
      } else {
        result = await addEvent(formData);
      }

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(editingEvent ? "Événement modifié !" : "Événement ajouté !");
        handleCloseModal();
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet événement ?")) return;

    startTransition(async () => {
      const result = await deleteEvent(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Événement supprimé !");
      }
    });
  };

  const formatForInput = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset() * 60000;
    return (new Date(date.getTime() - offset)).toISOString().slice(0, 10); // YYYY-MM-DD
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Calendrier</h1>
          <p className="mt-1 text-sm text-gray-500">Gérez les événements du club (tournois, stages, soirées).</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#DF6436] text-white px-4 py-2 rounded-md font-bold uppercase text-sm hover:bg-[#c95328] transition-colors shadow-sm"
        >
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {initialEvents && initialEvents.length > 0 ? (
          <ul className="divide-y divide-gray-200 opacity-100 transition-opacity" style={{ opacity: isPending ? 0.6 : 1 }}>
            {initialEvents.map((event) => (
              <li key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-3 min-w-[70px] text-center h-fit">
                      <span className="text-xs font-bold text-gray-500 uppercase">
                        {event.sort_date ? format(parseISO(event.sort_date), "MMM", { locale: fr }) : "N/A"}
                      </span>
                      <span className="text-xl font-black text-[#DF6436] leading-tight mt-1">
                        {event.sort_date ? format(parseISO(event.sort_date), "dd") : "N/A"}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                      <div className="mt-1 flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5 font-medium">
                          <CalendarIcon size={16} />
                          {event.date_text}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={16} />
                          {event.type}
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-700 max-w-2xl">{event.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenModal(event)}
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      Modifier
                    </button>
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded border border-red-100 hover:bg-red-50 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <CalendarIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Aucun événement</h3>
            <p className="mt-1 text-sm text-gray-500">Commencez par ajouter votre premier événement au calendrier.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingEvent ? "Modifier l'événement" : "Nouvel événement"}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form action={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input required type="text" name="title" defaultValue={editingEvent?.title} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#DF6436] focus:border-[#DF6436]" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date (Texte libre)</label>
                  <input required type="text" name="date_text" placeholder="ex: mai-juin 2026" defaultValue={editingEvent?.date_text} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#DF6436] focus:border-[#DF6436]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mois de rattachement (Tri)</label>
                  <input required type="date" name="sort_date" defaultValue={editingEvent ? formatForInput(editingEvent.sort_date) : ""} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#DF6436] focus:border-[#DF6436]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lieu / Type</label>
                <select required name="type" defaultValue={editingEvent?.type || "Événements"} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#DF6436] focus:border-[#DF6436]">
                  <option value="Tous">Tous</option>
                  <option value="Stages">Stages</option>
                  <option value="Événements">Événements</option>
                  <option value="Tournois">Tournois</option>
                  <option value="Interclubs">Interclubs</option>
                  <option value="Informations">Informations</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows={3} defaultValue={editingEvent?.description} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#DF6436] focus:border-[#DF6436]"></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-bold text-white bg-[#DF6436] rounded-md hover:bg-[#c95328] disabled:opacity-50">
                  {isPending ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

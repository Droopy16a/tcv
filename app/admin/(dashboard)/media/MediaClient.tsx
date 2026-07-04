"use client";

import { useState, useTransition, useRef } from "react";
import { UploadCloud, Folder, File as FileIcon, Image as ImageIcon, Trash2, Download, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { uploadMedia, deleteMedia } from "./actions";

type StorageFile = {
  name: string;
  id: string | null;
  updated_at: string | null;
  created_at: string | null;
  last_accessed_at: string | null;
  metadata: any;
};

export default function MediaClient({ 
  initialFiles, 
  publicUrlPrefix 
}: { 
  initialFiles: StorageFile[],
  publicUrlPrefix: string 
}) {
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      startTransition(async () => {
        toast.info("Upload en cours...");
        const result = await uploadMedia(formData);
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Fichier uploadé avec succès !");
        }
      });
    }
  };

  const handleDelete = (fileName: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce fichier ?")) return;

    startTransition(async () => {
      const result = await deleteMedia(`uploads/${fileName}`);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Fichier supprimé !");
      }
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Filter out placeholder dot files if any
  const displayFiles = initialFiles.filter(f => f.name !== ".emptyFolderPlaceholder");

  return (
    <div>
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Médias</h1>
          <p className="mt-1 text-sm text-gray-500">Gérez vos images et documents uploadés (dossier 'uploads').</p>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          className="flex items-center gap-2 bg-[#DF6436] text-white px-4 py-2 rounded-md font-bold uppercase text-sm hover:bg-[#c95328] transition-colors shadow-sm disabled:opacity-50"
        >
          <UploadCloud size={18} />
          {isPending ? "Upload..." : "Téléverser"}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*,application/pdf"
        />
      </div>

      {/* Upload Area */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-12 text-center mb-8 hover:bg-gray-100 transition-colors cursor-pointer ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Cliquez pour ajouter un fichier</h3>
        <p className="mt-1 text-sm text-gray-500">PNG, JPG, PDF (Dossier principal)</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-700">Fichiers récents ({displayFiles.length})</h3>
        </div>
        
        {displayFiles.length > 0 ? (
          <ul className="divide-y divide-gray-200 opacity-100 transition-opacity" style={{ opacity: isPending ? 0.7 : 1 }}>
            {displayFiles.map((file) => {
              const fileUrl = `${publicUrlPrefix}/uploads/${file.name}`;
              const isImage = file.metadata?.mimetype?.startsWith('image');
              
              return (
                <li key={file.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400 overflow-hidden">
                      {isImage ? (
                        <img src={fileUrl} alt={file.name} className="w-full h-full object-cover" />
                      ) : (
                        <FileIcon size={24} />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-medium text-gray-900 truncate" title={file.name}>{file.name}</h4>
                      <p className="text-xs text-gray-500">
                        {formatSize(file.metadata?.size || 0)} • {file.metadata?.mimetype || 'Fichier inconnu'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <a 
                      href={fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-[#DF6436] rounded-md hover:bg-orange-50 transition-colors" 
                      title="Ouvrir le fichier"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <button 
                      onClick={() => handleDelete(file.name)}
                      disabled={isPending}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50" 
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-8 text-center text-gray-500 text-sm">
            Aucun fichier trouvé dans le dossier 'uploads'.
          </div>
        )}
      </div>
    </div>
  );
}

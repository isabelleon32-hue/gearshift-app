"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function UploadEvidencia({ ordenId }: { ordenId: string }) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${ordenId}-${Math.random()}.${fileExt}`;
    const filePath = `evidencias/${fileName}`;

    // Subir a Supabase Storage (requiere bucket "evidencias" creado y público)
    const { error: uploadError } = await supabase.storage
      .from('evidencias')
      .upload(filePath, file);

    if (uploadError) {
      alert("Error al subir archivo: " + uploadError.message);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setUploading(false);
  };

  return (
    <div className="w-full">
      {success ? (
        <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-4 rounded-lg border border-green-500/30">
          <CheckCircle className="w-5 h-5" />
          <span>¡Evidencia subida correctamente!</span>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#444] rounded-lg cursor-pointer bg-[#1A1A1A] hover:bg-[#222] hover:border-secondary/50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
            <p className="mb-1 text-sm text-gray-400">
              <span className="font-bold text-secondary">Toca para capturar</span> o selecciona un archivo
            </p>
            <p className="text-xs text-gray-500">Video MP4 o Imagen JPG/PNG</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*,video/*"
            capture="environment" // Especial para abrir la cámara trasera en el celular
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
      {uploading && (
        <p className="text-sm text-secondary mt-2 text-center animate-pulse font-bold">Subiendo archivo al servidor...</p>
      )}
    </div>
  );
}

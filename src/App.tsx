import React, { useState } from 'react';
import CameraControls from './components/CameraControls';
import ImagePreview from './components/ImagePreview';
import { Camera, BookOpen, Target } from 'lucide-react';

interface CameraSettings {
  iso: number;
  aperture: number;
  shutterSpeed: number;
  whiteBalance: number;
}

function App() {
  const [settings, setSettings] = useState<CameraSettings>({
    iso: 400,
    aperture: 5.6,
    shutterSpeed: 0.02, // 1/50s
    whiteBalance: 5500,
  });

  const presets = [
    {
      name: 'Portrait',
      settings: { iso: 200, aperture: 1.8, shutterSpeed: 0.008, whiteBalance: 5500 },
      icon: '👤'
    },
    {
      name: 'Paysage',
      settings: { iso: 100, aperture: 11, shutterSpeed: 0.004, whiteBalance: 6500 },
      icon: '🏔️'
    },
    {
      name: 'Sport',
      settings: { iso: 800, aperture: 2.8, shutterSpeed: 0.001, whiteBalance: 5000 },
      icon: '⚽'
    },
    {
      name: 'Nuit',
      settings: { iso: 1600, aperture: 4, shutterSpeed: 0.5, whiteBalance: 3200 },
      icon: '🌙'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CameraTrainer</h1>
                <p className="text-sm text-gray-400">Maîtrisez les réglages de votre appareil photo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Mode Entraînement</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Presets */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Préréglages</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setSettings(preset.settings)}
                className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl transition-all duration-200 hover:scale-105 group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {preset.icon}
                </div>
                <h3 className="text-white font-medium">{preset.name}</h3>
                <div className="text-xs text-gray-400 mt-1">
                  ISO {preset.settings.iso} • f/{preset.settings.aperture}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <CameraControls settings={settings} onSettingsChange={setSettings} />
          <ImagePreview settings={settings} />
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Conseils d'apprentissage
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-white mb-2">🎯 Triangle d'exposition</h4>
              <p>L'ISO, l'ouverture et la vitesse d'obturation travaillent ensemble. Modifier un paramètre affecte l'exposition globale.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">🔍 Profondeur de champ</h4>
              <p>Une ouverture plus grande (f/1.4) crée plus de flou d'arrière-plan. Une ouverture plus petite (f/11) garde tout net.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">⚡ Vitesse d'obturation</h4>
              <p>Vitesse rapide pour figer le mouvement, vitesse lente pour créer des effets de filé ou de longue exposition.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">🌡️ Balance des blancs</h4>
              <p>Adaptez la température de couleur à votre source de lumière pour des couleurs naturelles.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
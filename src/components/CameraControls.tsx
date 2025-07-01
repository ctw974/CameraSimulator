import React from 'react';
import { Camera, Aperture, Timer, Thermometer, Info } from 'lucide-react';

interface CameraSettings {
  iso: number;
  aperture: number;
  shutterSpeed: number;
  whiteBalance: number;
}

interface CameraControlsProps {
  settings: CameraSettings;
  onSettingsChange: (settings: CameraSettings) => void;
}

const CameraControls: React.FC<CameraControlsProps> = ({ settings, onSettingsChange }) => {
  const updateSetting = (key: keyof CameraSettings, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const getShutterSpeedDisplay = (value: number) => {
    if (value >= 1) return `${value}"`;
    return `1/${Math.round(1 / value)}`;
  };

  const getApertureDisplay = (value: number) => `f/${value}`;

  const getWhiteBalanceLabel = (value: number) => {
    if (value <= 3000) return 'Tungstène';
    if (value <= 4000) return 'Fluorescent';
    if (value <= 5500) return 'Daylight';
    if (value <= 6500) return 'Flash';
    return 'Ombre';
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Camera className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Réglages Caméra</h2>
      </div>

      {/* ISO Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">ISO</span>
            </div>
            <span className="text-gray-300">Sensibilité</span>
          </div>
          <span className="text-white font-mono text-lg">{settings.iso}</span>
        </div>
        <input
          type="range"
          min="100"
          max="6400"
          step="100"
          value={settings.iso}
          onChange={(e) => updateSetting('iso', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>100</span>
          <span>6400</span>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Effet:</span>
          </div>
          <p className="text-xs text-gray-400">
            {settings.iso <= 400 ? 'Image nette, peu de bruit' :
             settings.iso <= 1600 ? 'Bruit modéré, bonne qualité' :
             'Bruit visible, pour conditions difficiles'}
          </p>
        </div>
      </div>

      {/* Aperture Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Aperture className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-300">Ouverture</span>
          </div>
          <span className="text-white font-mono text-lg">{getApertureDisplay(settings.aperture)}</span>
        </div>
        <input
          type="range"
          min="1.4"
          max="16"
          step="0.1"
          value={settings.aperture}
          onChange={(e) => updateSetting('aperture', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>f/1.4</span>
          <span>f/16</span>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Effet:</span>
          </div>
          <p className="text-xs text-gray-400">
            {settings.aperture <= 2.8 ? 'Arrière-plan très flou, portrait' :
             settings.aperture <= 8 ? 'Profondeur de champ équilibrée' :
             'Tout net, paysage'}
          </p>
        </div>
      </div>

      {/* Shutter Speed Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Timer className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-300">Vitesse</span>
          </div>
          <span className="text-white font-mono text-lg">{getShutterSpeedDisplay(settings.shutterSpeed)}</span>
        </div>
        <input
          type="range"
          min="0.008"
          max="2"
          step="0.001"
          value={settings.shutterSpeed}
          onChange={(e) => updateSetting('shutterSpeed', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>1/125</span>
          <span>2"</span>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Effet:</span>
          </div>
          <p className="text-xs text-gray-400">
            {settings.shutterSpeed <= 0.02 ? 'Fige le mouvement' :
             settings.shutterSpeed <= 0.1 ? 'Léger flou de mouvement' :
             'Effet de filé, longue exposition'}
          </p>
        </div>
      </div>

      {/* White Balance Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Thermometer className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-300">Balance des blancs</span>
          </div>
          <span className="text-white font-mono text-lg">{settings.whiteBalance}K</span>
        </div>
        <input
          type="range"
          min="2500"
          max="8000"
          step="100"
          value={settings.whiteBalance}
          onChange={(e) => updateSetting('whiteBalance', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>2500K</span>
          <span>8000K</span>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300">Effet:</span>
          </div>
          <p className="text-xs text-gray-400">
            {getWhiteBalanceLabel(settings.whiteBalance)} - {
              settings.whiteBalance <= 3000 ? 'Tons chauds/orangés' :
              settings.whiteBalance <= 5500 ? 'Lumière naturelle' :
              'Tons froids/bleus'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CameraControls;
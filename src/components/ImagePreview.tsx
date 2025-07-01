import React from 'react';
import { Eye, Settings } from 'lucide-react';

interface CameraSettings {
  iso: number;
  aperture: number;
  shutterSpeed: number;
  whiteBalance: number;
}

interface ImagePreviewProps {
  settings: CameraSettings;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ settings }) => {
  // Calculate effects based on settings
  const getNoiseLevel = () => {
    if (settings.iso <= 400) return 0;
    if (settings.iso <= 1600) return (settings.iso - 400) / 1200 * 0.3;
    return 0.3 + (settings.iso - 1600) / 4800 * 0.7;
  };

  const getBrightness = () => {
    // Simplified exposure calculation
    const isoFactor = settings.iso / 400;
    const apertureFactor = 1 / (settings.aperture * settings.aperture);
    const shutterFactor = settings.shutterSpeed * 10;
    return Math.min(2, Math.max(0.3, isoFactor * apertureFactor * shutterFactor));
  };

  const getBlurAmount = () => {
    // Depth of field simulation (lower f-number = more blur)
    return Math.max(0, (4 - settings.aperture) / 4);
  };

  const getMotionBlur = () => {
    // Motion blur based on shutter speed
    return Math.max(0, Math.min(1, (settings.shutterSpeed - 0.02) / 0.3));
  };

  const getColorTemperature = () => {
    // Color temperature effect
    const temp = settings.whiteBalance;
    if (temp <= 3000) return { filter: 'sepia(0.3) hue-rotate(-10deg)' };
    if (temp <= 4000) return { filter: 'sepia(0.1) hue-rotate(-5deg)' };
    if (temp <= 5500) return { filter: 'none' };
    if (temp <= 6500) return { filter: 'hue-rotate(5deg) brightness(1.05)' };
    return { filter: 'hue-rotate(15deg) brightness(1.1)' };
  };

  const noise = getNoiseLevel();
  const brightness = getBrightness();
  const blur = getBlurAmount();
  const motionBlur = getMotionBlur();
  const colorTemp = getColorTemperature();

  const exposureClass = brightness < 0.5 ? 'underexposed' : brightness > 1.5 ? 'overexposed' : 'normal';

  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <Eye className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Prévisualisation</h2>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          exposureClass === 'underexposed' ? 'bg-blue-900 text-blue-300' :
          exposureClass === 'overexposed' ? 'bg-red-900 text-red-300' :
          'bg-green-900 text-green-300'
        }`}>
          {exposureClass === 'underexposed' ? 'Sous-exposé' :
           exposureClass === 'overexposed' ? 'Sur-exposé' : 'Exposition correcte'}
        </div>
      </div>

      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        {/* Simulated photo */}
        <div 
          className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 transition-all duration-300"
          style={{
            opacity: brightness,
            ...colorTemp,
            filter: `${colorTemp.filter} blur(${blur * 2}px)`,
          }}
        >
          {/* Foreground subject */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-32 h-32 bg-yellow-400 rounded-full shadow-2xl transition-all duration-300"
              style={{
                filter: `blur(${Math.max(0, blur - 0.3) * 8}px)`,
                transform: `translateX(${motionBlur * 20}px)`,
              }}
            />
            {/* Background elements (more blurred) */}
            <div 
              className="absolute top-1/4 left-1/4 w-16 h-16 bg-green-400 rounded-lg opacity-70"
              style={{
                filter: `blur(${Math.max(2, blur * 10)}px)`,
              }}
            />
            <div 
              className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-red-400 rounded-full opacity-60"
              style={{
                filter: `blur(${Math.max(3, blur * 12)}px)`,
              }}
            />
          </div>
        </div>

        {/* Noise overlay */}
        {noise > 0 && (
          <div 
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,${noise}) 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, rgba(255,255,255,${noise}) 1px, transparent 1px)`,
              backgroundSize: '4px 4px',
              opacity: noise,
            }}
          />
        )}

        {/* Motion blur overlay */}
        {motionBlur > 0.3 && (
          <div className="absolute inset-0 bg-black opacity-20 mix-blend-multiply" />
        )}
      </div>

      {/* Settings summary */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Paramètres actuels</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">ISO:</span>
              <span className="text-white font-mono">{settings.iso}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ouverture:</span>
              <span className="text-white font-mono">f/{settings.aperture}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Vitesse:</span>
              <span className="text-white font-mono">
                {settings.shutterSpeed >= 1 ? `${settings.shutterSpeed}"` : `1/${Math.round(1 / settings.shutterSpeed)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Balance:</span>
              <span className="text-white font-mono">{settings.whiteBalance}K</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Résultat</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                noise < 0.2 ? 'bg-green-400' : noise < 0.5 ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
              <span className="text-gray-400">
                {noise < 0.2 ? 'Bruit faible' : noise < 0.5 ? 'Bruit modéré' : 'Bruit élevé'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                blur < 0.3 ? 'bg-blue-400' : blur < 0.7 ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
              <span className="text-gray-400">
                {blur < 0.3 ? 'Netteté élevée' : blur < 0.7 ? 'Flou artistique' : 'Flou important'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                brightness >= 0.8 && brightness <= 1.2 ? 'bg-green-400' : 'bg-yellow-400'
              }`} />
              <span className="text-gray-400">
                {brightness < 0.8 ? 'Sous-exposé' : brightness > 1.2 ? 'Sur-exposé' : 'Bien exposé'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
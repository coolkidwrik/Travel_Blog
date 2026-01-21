'use client';

import { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { Globe } from './Globe';
import { StarField } from './StarField';
import { buildCountryColors } from './utils';
import { COLORS } from './constants';
import type { SelectedCountry } from './types';

type GlobeComponentProps = {
  lived: string[];
  visited: string[];
};

export default function GlobeComponent({
  lived,
  visited,
}: GlobeComponentProps) {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry | null>(null);

  const countryColors = useMemo(
    () => buildCountryColors(lived, visited),
    [lived, visited]
  );

  const handleCountrySelect = (country: SelectedCountry) => {
    setSelectedCountry(country);
    
    // Navigate using Next.js router
    router.push(`/country/${country.id.toLowerCase()}`);
    
    // Scroll to content after navigation
    // optional. also annoying if you only want to look at the pretty globe
    // setTimeout(() => {
    //   const content = document.querySelector('main');
    //   content?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }, 100);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }}>
      {/* Selected Country Overlay - Top Right */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          padding: "10px 14px",
          background: "rgba(0,0,0,0.4)",
          color: "#fff",
          borderRadius: 6,  
          fontFamily: "sans-serif",
          fontSize: 14,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <strong>Selected Country</strong>
        <div style={{ marginTop: 4 }}>
          {selectedCountry?.name ?? "None"}
        </div>
      </div>

      {/* Legend Overlay - Bottom Right */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          padding: "12px 16px",
          background: "rgba(0,0,0,0.4)",
          color: "#fff",
          borderRadius: 6,
          fontFamily: "sans-serif",
          fontSize: 13,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 8 }}>Legend</div>
        
        {/* Lived */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: COLORS.LIVED,
              flexShrink: 0,
            }}
          />
          <span>Lived</span>
        </div>

        {/* Visited */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: COLORS.VISITED,
              flexShrink: 0,
            }}
          />
          <span>Visited</span>
        </div>

        {/* Selected */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: COLORS.SELECTED,
              flexShrink: 0,
            }}
          />
          <span>Selected</span>
        </div>

        {/* Unvisited */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: COLORS.UNSELECTED,
              flexShrink: 0,
            }}
          />
          <span>Not Visited</span>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 1);
        }}
      >
        <StarField count={2000} radius={10} />
        <Globe
          selectedCountry={selectedCountry}
          onCountrySelectAction={handleCountrySelect}
          countryColors={countryColors}
        />
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={1.6}
          maxDistance={4.0}
        />
      </Canvas>
    </div>
  );
}
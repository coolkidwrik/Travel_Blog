'use client';

import { useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRouter } from 'next/navigation';
import { Globe } from "./Globe";
import { buildCountryColors } from "./utils";
import type { SelectedCountry } from "./types";
import { StarField } from "./StarField";

type GlobeComponentProps = {
    lived: string[];
    visited: string[];
    initialSelected?: string;
};

export default function GlobeComponent({ lived, visited, initialSelected }: GlobeComponentProps) {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState<SelectedCountry | null>(null);

    const countryColors = useMemo(
        () => buildCountryColors(lived, visited),
        [lived, visited]
    );

    const handleCountrySelect = (country: SelectedCountry) => {
        setSelectedCountry(country);
        // Navigate to country page
        router.push(`/country/${country.id.toLowerCase()}`);
    };

    return (
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
            {/* UI Overlay */}
            <div
                style={{
                position: "absolute",
                top: 16,
                right: 16,
                padding: "10px 14px",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                borderRadius: 6,
                fontFamily: "sans-serif",
                fontSize: 14,
                pointerEvents: "none",
                zIndex: 1,
                }}
            >
                <strong>Selected Country</strong>
                <div style={{ marginTop: 4 }}>{selectedCountry?.name ?? "None"}</div>
            </div>

            <Canvas 
                camera={{ position: [0, 0, 3], fov: 45 }}
                gl={{ alpha: false }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#020202', 1);
                }}
            >
                <StarField count={2000} radius={15} />
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
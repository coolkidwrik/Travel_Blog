'use client';

import { useMemo } from "react";
import * as THREE from "three";
import { latLngToSphere, getCountryColor } from "./utils";
import { COLORS, MICRO_STATES, ISLAND_NATIONS } from "./constants";
import { MicroStateMarker } from "./MicroStateMarker";
import { IslandBlobMarker } from "./IslandBlobMarker";
import type { SelectedCountry, CountryColors } from "./types";
import worldGeoJson from "./world.geo.json";

type GlobeProps = {
    countryColors: CountryColors;
    selectedCountry: SelectedCountry | null;
    onCountrySelectAction: (country: SelectedCountry) => void;
};

export function Globe({ countryColors, selectedCountry, onCountrySelectAction }: GlobeProps) {
    const { countryMeshes, borderGeometry } = useMemo(() => {
        const countryMeshes: {
            key: string;
            id: string;
            name: string;
            geometry: THREE.BufferGeometry;
        }[] = [];

        const allBorderPoints: THREE.Vector3[] = [];

        worldGeoJson.features.forEach((feature: any, index: number) => {
            const id =
                feature.properties.ADM0_A3 && feature.properties.ADM0_A3 !== "-99"
                ? feature.properties.ADM0_A3
                : `${feature.properties.ISO_A3}-${index}`;

            const name: string = feature.properties.ADMIN;

            const vertices: number[] = [];
            const indices: number[] = [];
            let vertexOffset = 0;

            const polygons =
                feature.geometry.type === "MultiPolygon"
                ? feature.geometry.coordinates
                : [feature.geometry.coordinates];

            polygons.forEach((polygon: any) => {
                const outerRing: [number, number][] = polygon[0];
                const holeRings: [number, number][][] = polygon.slice(1);

                const contour = outerRing.map(([lng, lat]) => new THREE.Vector2(lng, lat));
                const holes = holeRings.map((ring) => 
                    ring.map(([lng, lat]) => new THREE.Vector2(lng, lat))
                );

                const triangles = THREE.ShapeUtils.triangulateShape(contour, holes);

                contour.forEach((p) => {
                    const v = latLngToSphere(p.y, p.x);
                    vertices.push(v.x, v.y, v.z);
                });

                holes.forEach((hole) => {
                    hole.forEach((p) => {
                        const v = latLngToSphere(p.y, p.x);
                        vertices.push(v.x, v.y, v.z);
                    });
                });

                triangles.forEach(([a, b, c]) => {
                    indices.push(vertexOffset + a, vertexOffset + b, vertexOffset + c);
                });

                vertexOffset += contour.length + holes.reduce((sum, h) => sum + h.length, 0);

                // Borders
                for (let i = 0; i < outerRing.length - 1; i++) {
                    const [lng1, lat1] = outerRing[i];
                    const [lng2, lat2] = outerRing[i + 1];

                    allBorderPoints.push(
                        latLngToSphere(lat1, lng1, 1.02),
                        latLngToSphere(lat2, lng2, 1.02)
                    );
                }
            });

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setIndex(indices);
            geometry.computeVertexNormals();

            countryMeshes.push({ key: `${id}-${index}`, id, name, geometry });
        });

        const borderGeometry = new THREE.BufferGeometry().setFromPoints(allBorderPoints);

        return { countryMeshes, borderGeometry };
    }, []);

    return (
        <>
        {/* Ocean */}
        <mesh renderOrder={0}>
            <sphereGeometry args={[0.96, 24, 24]} />
            <meshBasicMaterial color={COLORS.OCEAN} transparent opacity={0.7} depthWrite={false} />
        </mesh>

        {/* Countries */}
        {countryMeshes.map(({ key, id, name, geometry }) => (
            <mesh
            key={key}
            geometry={geometry}
            renderOrder={1}
            onClick={(e) => {
                e.stopPropagation();
                onCountrySelectAction({ id, name });
            }}
            >
            <meshBasicMaterial
                color={getCountryColor(id, selectedCountry, countryColors)}
                side={THREE.DoubleSide}
            />
            </mesh>
        ))}

        {/* Borders */}
        <lineSegments geometry={borderGeometry} renderOrder={2} raycast={() => null}>
            <lineBasicMaterial color={COLORS.BORDER} depthWrite={false} />
        </lineSegments>

        {/* Micro-states */}
        {Object.entries(MICRO_STATES).map(([id, data]) => (
            <MicroStateMarker
            key={id}
            id={id}
            name={data.name}
            lat={data.lat}
            lng={data.lng}
            color={getCountryColor(id, selectedCountry, countryColors)}
            onSelectAction={() => onCountrySelectAction({ id, name: data.name })}
            />
        ))}

        {/* Island nations */}
        {Object.entries(ISLAND_NATIONS).map(([id, data]) => (
            <IslandBlobMarker
            key={`island-${id}`}
            id={id}
            name={data.name}
            lat={data.lat}
            lng={data.lng}
            radius={data.radius}
            color={getCountryColor(id, selectedCountry, countryColors)}
            isSelected={id === selectedCountry?.id}
            onSelectAction={() => onCountrySelectAction({ id, name: data.name })}
            />
        ))}
        </>
    );
}
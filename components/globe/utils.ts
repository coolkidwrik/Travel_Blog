import * as THREE from "three";
import { COLORS } from "./constants";
import type { SelectedCountry, CountryColors } from "./types";

export function latLngToSphere(lat: number, lng: number, radius = 1.01): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

export function getCountryColor(
    id: string,
    selectedCountry: SelectedCountry | null,
    countryColors: CountryColors
): string {
    if (selectedCountry?.id === id) {
        return COLORS.SELECTED;
    }
    return countryColors[id] ?? COLORS.UNSELECTED;
}

export function buildCountryColors(lived: string[], visited: string[]): CountryColors {
    const colors: CountryColors = {};
    lived.forEach((c) => (colors[c] = COLORS.LIVED));
    visited.forEach((c) => {
        if (!colors[c]) colors[c] = COLORS.VISITED;
    });
    return colors;
}
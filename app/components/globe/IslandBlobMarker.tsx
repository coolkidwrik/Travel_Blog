import * as THREE from "three";
import { latLngToSphere } from "./utils";

type IslandBlobProps = {
    id: string;
    name: string;
    lat: number;
    lng: number;
    radius: number;
    color: string;
    isSelected: boolean;
    onSelect: () => void;
};

export function IslandBlobMarker({
    lat,
    lng,
    radius,
    color,
    onSelect,
}: IslandBlobProps) {
    const position = latLngToSphere(lat, lng, 1.035);
    const normal = position.clone().normalize();

    const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        normal
    );

    return (
        <group
        position={position}
        quaternion={quaternion}
        onClick={(e) => {
            e.stopPropagation();
            onSelect();
        }}
        >
            {/* Glow / halo */}
            <mesh>
                <circleGeometry args={[radius * 1.4, 12]} />
                <meshBasicMaterial
                color={color}
                transparent
                opacity={0.25}
                depthWrite={false}
                />
            </mesh>

            {/* Core blob */}
            <mesh position={[0, 0, 0.002]}>
                <circleGeometry args={[radius, 12]} />
                <meshBasicMaterial
                color={color}
                transparent
                opacity={0.85}
                side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}
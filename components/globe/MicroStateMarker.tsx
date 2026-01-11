import * as THREE from "three";
import { latLngToSphere } from "./utils";
import { COLORS } from "./constants";

type MicroStateMarkerProps = {
    id: string;
    name: string;
    lat: number;
    lng: number;
    color: string;
    onSelect: () => void;
};

export function MicroStateMarker({
    lat,
    lng,
    color,
    onSelect,
}: MicroStateMarkerProps) {
    const borderCircleRadius = 0.007
    const innerCircleRadius = 0.006

    const position = latLngToSphere(lat, lng, 1.03);
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
        {/* border */}
        <mesh>
            <circleGeometry args={[borderCircleRadius, 12]} />
            <meshBasicMaterial color={COLORS.BORDER} side={THREE.DoubleSide} />
        </mesh>

        {/* fill */}
        <mesh position={[0, 0, 0.001]}>
            <circleGeometry args={[innerCircleRadius, 12]} />
            <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
        </group>
    );
}

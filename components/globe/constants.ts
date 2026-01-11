// Colors
/////////////////////////////////////////////////////////
export const COLORS = {
    LIVED: "#e38202",
    VISITED: "#1ff258",
    UNSELECTED: "#666",
    SELECTED: "#1e90ff",
    BORDER: "#111",
    OCEAN: "#1b4f9c",
} as const;

// Microstate Nations
/////////////////////////////////////////////////////////
export const MICRO_STATES: Record<
string, { name: string, lat: number, lng: number }
> = {
    // asia
    SGP: { name: "Singapore", lat: 1.3521, lng: 103.8198 },
    BHR: {name: "Bahrain", lat: 26.0667, lng: 50.5577},
    // europe
    MCO: { name: "Monaco", lat: 43.7384, lng: 7.4246 },
    AND: { name: "Andorra", lat: 42.5063, lng: 1.5218 },
    VAT: { name: "Vatican City", lat: 41.9029, lng: 12.4534 },
    SMR: { name: "San Marino", lat: 43.9424, lng: 12.4578 },
    LIE: { name: "Liechtenstein", lat: 47.1410, lng: 9.5209 },
};

// Small Island Nations
/////////////////////////////////////////////////////////
export const ISLAND_NATIONS: Record<
string,
{ name: string, lat: number, lng: number, radius: number }
> = {
    // indian ocean
    MDV: { name: "Maldives", lat: 3.2028, lng: 73.2207, radius: 0.01 },
    // africa
    SYC: { name: "Seychelles", lat: -4.6796, lng: 55.4920, radius: 0.01 },
    STP: { name: "São Tomé and Príncipe", lat: 0.1864, lng: 6.6131, radius: 0.01 },
    CPV: { name: "Cabo Verde", lat: 16.5388, lng: -23.0418, radius: 0.01 },
    COM: { name: "Comoros", lat: -11.6455, lng: 43.3333, radius: 0.01 },
    MUS: { name: "Mauritius", lat: -20.3484, lng: 57.5522, radius: 0.01 },
    // mediterranean
    MLT: { name: "Malta", lat: 35.9375, lng: 14.3754, radius: 0.007},
    // oceania
    TON: { name: "Tonga", lat: -21.1790, lng: -175.1982, radius: 0.01 },
    KIR: { name: "Kiribati", lat: 1.8709, lng: -157.3630, radius: 0.01 },
    TUV: { name: "Tuvalu", lat: -7.1095, lng: 177.6493, radius: 0.01 },
    PLW: { name: "Palau", lat: 7.5150, lng: 134.5825, radius: 0.01},
    MHL: { name: "Marshall Islands", lat: 7.1315, lng: 171.1845, radius: 0.01},
    FSM: { name: "Federated States of Micronesia", lat: 7.4256, lng: 150.5508, radius: 0.01},
    NRU: { name: "Nauru", lat: -0.5228, lng: 166.9315, radius: 0.01},
    WSM: { name: "Samoa", lat: -13.7590, lng: 172.1046, radius: 0.01},
    // carribean
    ATG: { name: "Antigua and Barbuda", lat: 17.0608, lng: -61.7964, radius: 0.005},
    BRB: { name: "Barbados", lat: 13.1939, lng: -59.5432, radius: 0.005},
    DMA: { name: "Dominica", lat: 15.4150, lng: -61.3710, radius: 0.005},
    GRD: { name: "Grenada", lat: 12.1165, lng: -61.6790, radius: 0.005},
    KNA: { name: "Saint Kitts and Nevis", lat: 17.3578, lng: -62.7830, radius: 0.005},
    LCA: { name: "Saint Lucia", lat: 13.9094, lng: -60.9789, radius: 0.005},
    VCT: { name: "Saint Vincent and the Grenadines", lat: 12.9843, lng: -61.2872, radius: 0.005},
};
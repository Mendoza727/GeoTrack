import { getCurrentLocation } from "@/actions/Location/GeoLocation";
import { Location } from "@/Interfaces/Location";
import { create } from "zustand";

interface LocationState {
    lastknownLocation: Location | null;

    getLocation: () => Promise<Location | null>;    
}

export const useLocationStore = create<LocationState>()((set, get) => ({
    lastknownLocation: null,

    getLocation: async () => {
        const location = await getCurrentLocation();

        set({ lastknownLocation: location });

        return location;
    },
}))
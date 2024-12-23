import { clearWatchCurrentLocation, getCurrentLocation, watchCurrentLocation } from "@/actions/Location/GeoLocation";
import { Location } from "@/Interfaces/Location";
import { create } from "zustand";

interface LocationState {
    lastknownLocation: Location | null;
    userLocationHistory: Location[];
    suscription: any;

    getLocation: () => Promise<Location | null>;
    whatchLocation: () => void;
    clearLocationWatch: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
    lastknownLocation: null,
    userLocationHistory: [],
    suscription: null,

    getLocation: async () => {
        const location = await getCurrentLocation();

        set({ lastknownLocation: location });

        return location;
    },

    whatchLocation: () => {
        const watchSuscription = get().suscription;

        if (watchSuscription !== null) {
            get().clearLocationWatch();
        }

        const newSuscription = watchCurrentLocation((location: Location) => {
            set({
                lastknownLocation: location,
                userLocationHistory: [...get().userLocationHistory, location]
            })
        });

        set({ suscription: newSuscription });
    },

    clearLocationWatch: () => {
        const watchSuscription = get().suscription;

        if (watchSuscription !== null) {
            clearWatchCurrentLocation(watchSuscription);
        }
    }
}))
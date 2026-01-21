export const msalConfig = {
    auth: {
        clientId: "de9769e3-be97-4f64-855d-3f9c75d93077",
        authority: "https://login.microsoftonline.com/343581ac-7887-44b2-91c3-96c7fc5b4a6d",
        redirectUri: location.origin,
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};
export const loginRequest = {
    scopes: ["User.Read"]
};
export const tokenRequest = {
    scopes: ["User.Read", "Files.Read.All"],
};

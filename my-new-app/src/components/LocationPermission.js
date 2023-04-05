import { useEffect } from "react";

export default function LocationPermission({ setLocation }) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, [setLocation]);

  return null;
}

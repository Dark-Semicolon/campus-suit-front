import { useState, useEffect } from "react";

const useLocalStorage = () => {
  const [storageData, setStorageData] = useState({});

  const setLocalStorage = (key, value, expiryTimeInMinutes) => {
    const now = new Date().getTime();
    const expiryTime = expiryTimeInMinutes ? now + expiryTimeInMinutes * 60 * 1000 : null;
    const data = { value, expiryTime };
    localStorage.setItem(key, JSON.stringify(data));
  };

  const updateLocalStorageValue = (key, newValue) => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const { expiryTime } = parsedData;
        const dataToUpdate = { value: newValue, expiryTime };
        localStorage.setItem(key, JSON.stringify(dataToUpdate));
      } catch (error) {
        // console.error("Error parsing JSON:", error);
      }
    }
  };

  const getLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const { expiryTime } = parsedData;
        if (!expiryTime || expiryTime >= new Date().getTime()) {
          return parsedData.value;
        } else {
          localStorage.removeItem(key);
        }
      } catch (error) {
        // Handle JSON parsing error
      }
    }
    return null;
  };

  const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  useEffect(() => {
    // Load existing data from localStorage when component mounts
    const storedData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      storedData[key] = getLocalStorage(key);
    }
    setStorageData(storedData);

    // Listen for changes to localStorage in other tabs
    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage) {
        const key = event.key;
        const value = event.newValue ? JSON.parse(event.newValue).value : null;
        setStorageData((prevData) => ({ ...prevData, [key]: value }));
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return {
    storageData,
    setLocalStorage,
    updateLocalStorageValue,
    getLocalStorage,
    removeLocalStorage,
  };
};

export default useLocalStorage;

import { useState, useEffect } from "react";
import { fetchProfiles } from "../services/profileService";

export default function useProfilesLoader({
  profileCurrentPage,
  profileSearchTerm,
  setProfiles,
  setTotalProfiles,
  itemsPerPage,
  shouldLoad = true
}) {
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  useEffect(() => {
    if (!shouldLoad) return;

    (async () => {
      setLoadingProfiles(true);
      try {
        const params = {
          page: profileCurrentPage + 1,
          limit: itemsPerPage,
          search: profileSearchTerm,
        };

        const response = await fetchProfiles(params);
        console.log("Dados retornados da API (perfis):", response.data);
        const data = response.data;

        if (Array.isArray(data)) {
          setProfiles(data);
          setTotalProfiles(data.length);
        } else if (data.items && Array.isArray(data.items)) {
          setProfiles(data.items);
          setTotalProfiles(data.total ?? data.items.length);
        } else {
          setProfiles([]);
          setTotalProfiles(0);
        }
      } catch (err) {
        console.error("Erro ao buscar perfis:", err);
        setProfiles([]);
        setTotalProfiles(0);
      } finally {
        setLoadingProfiles(false);
      }
    })();
  }, [
    profileCurrentPage,
    profileSearchTerm,
    setProfiles,
    setTotalProfiles,
    itemsPerPage,
    shouldLoad
  ]);

  return { loadingProfiles };
}

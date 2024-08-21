export async function clearFromCache(cacheToClear: string) : Promise<any> {
  caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.map((cache) => {
        if (cache === cacheToClear) {
          return caches.delete(cache);
        }
      })
    );
  });
}

/**
 * Safe storage utilities with quota handling and image compression
 */

export const compressImage = (
  file: File,
  maxWidth = 500,
  maxHeight = 500,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        // Draw image smoothly
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Proactively clear oversized legacy base64 entries from localStorage
 * (e.g. multi-megabyte uncompressed photos that caused QuotaExceededError)
 */
export const cleanupBloatedStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k) {
        const val = localStorage.getItem(k);
        // Any single item over 100KB is pruned to safeguard browser quota
        if (val && val.length > 100000) {
          localStorage.removeItem(k);
        }
      }
    }
  } catch {
    // Fail-safe
  }
};

export const safeSetItem = (key: string, value: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err: any) {
    console.warn(`[safeSetItem] Quota error on "${key}":`, err?.message || err);
    try {
      // Purge bloated items immediately
      cleanupBloatedStorage();
      localStorage.setItem(key, value);
      return true;
    } catch {
      // Gracefully prevent unhandled QuotaExceededError
      return false;
    }
  }
};

export const safeGetItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

// plugins/fix-asset-baseurl.client.js

export default defineNuxtPlugin((nuxtApp) => {
  const { app } = useRuntimeConfig();
  const base = app.baseURL;

  if (!base || base === "/") return;

  const prefix = base.replace(/\/$/, "");

  const fixImages = () => {
    document.querySelectorAll("img[src]").forEach((img) => {
      const src = img.getAttribute("src");

      if (!src) return;

      // Abaikan URL eksternal dan resource khusus browser
      if (
        src.startsWith("http://") ||
        src.startsWith("https://") ||
        src.startsWith("//") ||
        src.startsWith("data:") ||
        src.startsWith("blob:")
      ) {
        return;
      }

      // Sudah menggunakan baseURL
      if (src.startsWith(`${prefix}/`)) return;

      // /image.png → /main-app/image.png
      if (src.startsWith("/")) {
        img.setAttribute("src", `${prefix}${src}`);
        return;
      }

      // image.png → /main-app/image.png
      img.setAttribute("src", `${prefix}/${src}`);
    });
  };

  fixImages();

  nuxtApp.hook("page:finish", fixImages);
});

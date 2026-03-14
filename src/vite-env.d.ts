/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANALYTICS_API_URL?: string
  readonly VITE_DBX_VIDEO_YOUTUBE_EMBED_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

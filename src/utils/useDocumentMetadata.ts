import { useEffect } from "react"

export interface SeoMetadataOptions {
  title: string
  description?: string
  keywords?: string
  canonicalPath?: string
  ogType?: string
  schemaJson?: Record<string, unknown>
}

export function useDocumentMetadata(
  titleOrOptions: string | SeoMetadataOptions,
  legacyDescription?: string,
) {
  const options: SeoMetadataOptions =
    typeof titleOrOptions === "string"
      ? { title: titleOrOptions, description: legacyDescription }
      : titleOrOptions

  useEffect(() => {
    // 1. Título
    document.title = options.title

    // 2. Helper para atualizar ou criar meta tag
    const setMetaTag = (attrName: "name" | "property", attrValue: string, content?: string) => {
      if (!content) return
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`)
      if (!meta) {
        meta = document.createElement("meta")
        meta.setAttribute(attrName, attrValue)
        document.head.appendChild(meta)
      }
      meta.setAttribute("content", content)
    }

    // 3. Meta description e keywords
    if (options.description) {
      setMetaTag("name", "description", options.description)
      setMetaTag("property", "og:description", options.description)
      setMetaTag("name", "twitter:description", options.description)
    }

    if (options.keywords) {
      setMetaTag("name", "keywords", options.keywords)
    }

    setMetaTag("property", "og:title", options.title)
    setMetaTag("name", "twitter:title", options.title)
    setMetaTag("property", "og:type", options.ogType ?? "website")

    // 4. Canonical link
    if (options.canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement("link")
        canonical.setAttribute("rel", "canonical")
        document.head.appendChild(canonical)
      }
      const fullUrl = `https://lypsyos.com.br${options.canonicalPath}`
      canonical.setAttribute("href", fullUrl)
      setMetaTag("property", "og:url", fullUrl)
    }

    // 5. Schema JSON-LD dinâmico
    let schemaScript = document.getElementById("page-seo-schema")
    if (options.schemaJson) {
      if (!schemaScript) {
        schemaScript = document.createElement("script")
        schemaScript.setAttribute("type", "application/ld+json")
        schemaScript.setAttribute("id", "page-seo-schema")
        document.head.appendChild(schemaScript)
      }
      schemaScript.textContent = JSON.stringify(options.schemaJson)
    } else if (schemaScript) {
      schemaScript.remove()
    }
  }, [options.title, options.description, options.keywords, options.canonicalPath, options.ogType, options.schemaJson])
}

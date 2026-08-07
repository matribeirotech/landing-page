import { trackEvent } from "@/services/analytics"

const WHATSAPP_NUMBER = "5517996261525"
const WHATSAPP_MESSAGE = "Olá! Vim do site da Lypsyos e gostaria de saber mais."
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export function WhatsAppButton() {
  function handleClick() {
    void trackEvent({
      eventName: "whatsapp_cta_click",
      category: "conversion",
      label: "floating_whatsapp_button",
    }).catch((error) => {
      console.error("Não foi possível rastrear o clique no WhatsApp", error)
    })
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 active:scale-95 md:bottom-7 md:right-7"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.687 4.612 1.875 6.487L4 29l7.71-1.84A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.7a9.63 9.63 0 0 1-4.912-1.345l-.352-.209-4.577 1.093 1.117-4.459-.23-.365A9.65 9.65 0 0 1 5.7 15c0-5.686 4.62-10.3 10.304-10.3S26.31 9.314 26.31 15 20.99 24.7 16.004 24.7Zm5.634-7.62c-.309-.155-1.828-.902-2.111-1.006-.283-.103-.489-.155-.695.155-.206.31-.797 1.006-.977 1.212-.18.207-.36.232-.669.078-.309-.155-1.304-.481-2.484-1.534-.918-.819-1.538-1.83-1.718-2.14-.18-.31-.02-.478.135-.632.139-.138.309-.36.464-.54.155-.18.206-.31.309-.516.103-.207.052-.387-.026-.542-.077-.155-.695-1.675-.953-2.294-.251-.603-.507-.522-.695-.532l-.593-.01a1.14 1.14 0 0 0-.823.387c-.283.31-1.08 1.057-1.08 2.577s1.106 2.99 1.26 3.196c.155.207 2.176 3.323 5.273 4.66.737.318 1.312.508 1.76.65.739.235 1.412.202 1.944.123.593-.088 1.828-.747 2.086-1.469.257-.723.257-1.343.18-1.469-.077-.129-.283-.207-.593-.362Z" />
      </svg>
    </a>
  )
}

import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const phoneNumber = "254755537861";
  const message = "Hi Azani! I'm interested in your African fashion pieces.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      data-testid="button-whatsapp-float"
    >
      <div className="relative">
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 group-hover:bg-[#20BA5A]">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
        
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat with us on WhatsApp
        </div>
      </div>
    </a>
  );
}

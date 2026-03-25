import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="scroll-smooth">
      <body>
        <div>
          <Toaster />
        </div>
        {children}
      </body>
    </html>
  );
}

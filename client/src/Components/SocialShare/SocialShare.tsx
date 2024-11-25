import React from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaGoogle,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

interface SocialShareProps {
  shareUrl: string; // The URL to share
}

const SocialShare: React.FC<SocialShareProps> = ({ shareUrl }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" }); // Adjust breakpoint as needed

  // Function to handle share actions
  const handleShare = (platform: string): void => {
    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${shareUrl}`, "_blank");
        break;
      case "instagram":
        alert("Instagram sharing is only available via the mobile app.");
        break;
      case "gmail":
        window.open(
          `mailto:?subject=Check this out!&body=${shareUrl}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`,
          "_blank"
        );
        break;
      default:
        console.error("Unsupported platform:", platform);
    }
  };

  return (
    <>
      {isMobile && <p className="text-center mt-4 text-xs font-medium text-gray-600 mb-2">Or Share via</p>}
      <div className={`flex items-center p-2 ${isMobile ? 'w-full justify-between' : 'space-x-4'}`}>
        {/* Facebook */}
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => handleShare("facebook")}
          aria-label="Share on Facebook"
        >
          <FaFacebook size={24} />
        </button>

        {/* WhatsApp */}
        <button
          className="text-green-500 hover:text-green-700"
          onClick={() => handleShare("whatsapp")}
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp size={24} />
        </button>

        {/* Instagram */}
        <button
          className="text-pink-500 hover:text-pink-700"
          onClick={() => handleShare("instagram")}
          aria-label="Share on Instagram"
        >
          <FaInstagram size={24} />
        </button>

        {/* Gmail */}
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleShare("gmail")}
          aria-label="Share via Gmail"
        >
          <FaGoogle size={24} />
        </button>

        {/* LinkedIn */}
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleShare("linkedin")}
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin size={24} />
        </button>
      </div>
    </>
  );
};

export default SocialShare;

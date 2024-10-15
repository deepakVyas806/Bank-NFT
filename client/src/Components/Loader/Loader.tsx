// src/Components/GlobalLoader/GlobalLoader.tsx
import React from "react";
import {
  BeatLoader,
  FadeLoader,
  MoonLoader,
  ScaleLoader,
  SyncLoader,
} from "react-spinners";

interface LoaderProps {
  loading: boolean;
  type?: "beat" | "fade" | "moon" | "scale" | "sync";
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  loading,
  type = "beat",
  size = 60,
  color = "#3498db",
}) => {
  const renderLoader = () => {
    switch (type) {
      case "beat":
        return <BeatLoader color={color} loading={loading} size={size / 5} />;
      case "fade":
        return (
          <FadeLoader
            color={color}
            loading={loading}
            height={size}
            width={size / 8}
          />
        );
      case "moon":
        return <MoonLoader color={color} loading={loading} size={size} />;
      case "scale":
        return (
          <ScaleLoader
            color={color}
            loading={loading}
            height={size}
            width={size / 5}
          />
        );
      case "sync":
        return <SyncLoader color={color} loading={loading} size={size / 5} />;
      default:
        return <BeatLoader color={color} loading={loading} size={size / 5} />;
    }
  };

  return (
    <div className="flex justify-center items-center">
      {loading && renderLoader()}
    </div>
  );
};

export default Loader;

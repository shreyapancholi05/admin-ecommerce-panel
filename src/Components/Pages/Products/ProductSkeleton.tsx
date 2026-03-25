interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div className={`relative overflow-hidden animate-pulse   ${className}`}
    style={{
      background:
          "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 2.0s linear infinite"
    }}>
      
    </div>
  );
};

export default Skeleton;

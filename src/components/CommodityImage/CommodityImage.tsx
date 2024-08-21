interface CommodityImageProps {
  title: string;
  image: string,
  onClick?: () => void;
}

const CommodityImage: React.FC<CommodityImageProps> = ({
  title,
  image,
  onClick,
}) => {
  return (
    <div
      className="w-36  mb-5 rounded-full shadow-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <span className="text-white text-lg font-bold">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CommodityImage;
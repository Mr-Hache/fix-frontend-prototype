import { ItemSideMenuProps } from '@/resources/types/props';
const ItemSideMenu: React.FC<ItemSideMenuProps> = ({
  title,
  onClick,
  iconName,
  selected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 w-full  ${
        selected
          ? 'bg-orange-1/10'
          : 'bg-gray-2/20 shadow-layout hover:bg-gray-2/30 cursor-pointer'
      } `}
    >
      <span className="material-icons text-orange-1 ">{iconName}</span>
      <span className="whitespace-nowrap">{title}</span>
    </button>
  );
};

export default ItemSideMenu;

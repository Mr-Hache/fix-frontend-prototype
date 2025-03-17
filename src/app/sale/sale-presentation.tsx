import SideMenu from '@/components/side-menu';
import { useState } from 'react';
import Image from 'next/image';

const SalePresentation = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <SideMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      <div className="flex items-center justify-start overflow-hidden flex-col w-screen h-dvh p-3">
        <div className="flex w-full  flex-col sm:flex-row  items-center ">
          <div className="flex items-end justify-between w-full pb-4">
            <div className="flex items-center space-x-2 flex-row justify-center">
              <span
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  fontSize: '24px',
                }}
                className={`material-icons w-fit cursor-pointer ${
                  showMenu && 'z-30'
                } bg-gray-2/50 hover:bg-gray-2/40 text-orange-1 p-1.5 rounded-full `}
              >
                {showMenu ? 'menu_open' : 'menu'}
              </span>
              <h1 className="font-bold text-xl sm:text-2xl">Venta</h1>
            </div>
            <Image
              src="/icons/fix-icon.png"
              alt="Logo"
              width={50}
              height={50}
              className="w-20"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalePresentation;

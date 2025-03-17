'use client';
import { SideMenuProps } from '@/resources/types/props';
import ItemSideMenu from '@/components/item-side-menu';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const SideMenu: React.FC<SideMenuProps> = ({ setShowMenu, showMenu }) => {
  const pathname = usePathname();

  const router = useRouter();

  const handleClick = (path: string) => {
    if (pathname !== '/register' && pathname !== '/' && path === 'register') {
      router.push('/register');
      setShowMenu(false);
    }
    if (pathname !== '/sale' && path === 'sale') {
      router.push('/sale');
      setShowMenu(false);
    }
  };
  return (
    <>
      {/* contenedor que representa el fondo cuando se despliega el menú lateral */}
      <div
        onClick={() => setShowMenu(false)}
        className={`fixed h-full ${
          showMenu
            ? 'w-full bg-white-1/30 backdrop-blur-sm'
            : 'w-0 bg-transparent'
        }  top-0 left-0 z-20 transition-colors duration-300`}
      ></div>

      {/* menú lateral */}
      <aside
        onClick={e => e.stopPropagation()}
        className={`fixed top-0 left-0 h-[100dvh] shadow-layout rounded-r-3xl  transition-all duration-300 ${
          showMenu
            ? 'border-b border-t border-r border-orange-1 z-20 w-7/12 sm:w-2/5 md:w-2/6 lg:w-1/4 xl:w-1/5 bg-gray-1/80'
            : 'w-0'
        } `}
      >
        {/* ítems del menú lateral */}
        {showMenu && (
          <>
            <div className="flex flex-col items-center justify-center h-[70%] w-full space-y-8">
              <ItemSideMenu
                title="Registro de mercancía"
                selected={pathname === '/register' || pathname === '/'}
                iconName="format_list_bulleted"
                onClick={() => handleClick('register')}
              />
              <ItemSideMenu
                title="Venta de mercancía"
                selected={pathname === '/sale'}
                iconName="store"
                onClick={() => handleClick('sale')}
              />
            </div>
          </>
        )}
      </aside>
    </>
  );
};
export default SideMenu;

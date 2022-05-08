import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect } from 'react';

interface SidebarDrawerProvider {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext<SidebarDrawerContextData>({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      { children }
    </SidebarDrawerContext.Provider>
  );
}

export function useSidebarDrawer(): SidebarDrawerContextData {
  const disclosure = useContext(SidebarDrawerContext);
  
  return disclosure;
}
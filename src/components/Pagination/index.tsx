import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);
  const siblingsCount = 1; // Adjacent pages count shown
  
  function generatePagesArray(from: number, to: number) {
    return [...new Array(to-from)].map((_, index) => {
      return from + index + 1
    })
    .filter(page => page > 0)
  }
  
  const previousPages = currentPage > 1 ? generatePagesArray(currentPage - siblingsCount - 1, currentPage - 1) : [];
  const nextPages = currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {/** Shows the page 1 */}
        { currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            { currentPage > (2 + siblingsCount) && (
              <Text color='gray.300' width='8' textAlign='center'>...</Text>
            )}
          </>
        ) }
        
        {/** Shows adjacent previous pages */}
        { previousPages.length > 0 && previousPages.map(pageNumber => (
          <PaginationItem onPageChange={onPageChange} key={String(pageNumber)} number={pageNumber} />
        )) }

        {/* Shows the current page */}
        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {/** Shows adjacent next pages */}
        { nextPages.length > 0 && nextPages.map(pageNumber => (
          <PaginationItem onPageChange={onPageChange} key={String(pageNumber)} number={pageNumber} />
        )) }

        {/* Shows the last page */}
        { (currentPage + siblingsCount) < lastPage && (
          <>
            { (currentPage + 1 + siblingsCount) < lastPage && (
              <Text color='gray.300' width='8' textAlign='center'>...</Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </Stack>
    </Stack>
  );
}
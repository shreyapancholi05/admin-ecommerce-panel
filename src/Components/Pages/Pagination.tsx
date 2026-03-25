interface PaginationProps {
  currentpage: number
  totalpages: number
  onPageChange: (page: number) => void
}
export const Pagination = ({currentpage, totalpages, onPageChange}: PaginationProps) => {
  const prevDisable = currentpage < 1
  const nextDisable = currentpage > totalpages
  return (
    <>
      <button
          className="cursor-pointer font-semibold hover:bg-neutral-100 px-4 py-3 rounded "
          disabled={prevDisable}
          onClick={() => onPageChange(currentpage - 1)}
        >
          Prev
        </button>
        <span className="px-4 py-3 font-sans">
          {currentpage} OF {totalpages}
        </span>
        <button
          className="cursor-pointer font-semibold hover:bg-neutral-100 px-4 py-3 rounded "
          disabled={nextDisable}
          onClick={() => onPageChange(currentpage + 1)}
        >
          Next
        </button>
    </>
  );
}

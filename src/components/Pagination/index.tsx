import "./index.scss";

interface IProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  numberOfPages: number;
}

export function Pagination({
  currentPage,
  setCurrentPage,
  numberOfPages,
}: IProps) {
  return (
    <div className="pagination">
      {Array.from({ length: numberOfPages + 1 }, (_, index) => index).map(
        (index: number) => (
          <div
            onClick={() => setCurrentPage(index)}
            key={index}
            className={index === currentPage ? "active" : ""}
          >
            {index}
          </div>
        )
      )}
    </div>
  );
}

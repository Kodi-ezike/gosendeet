import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePaginationSync = (lastPage: number) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = params.get("page");

    if (pageParam) {
      const page = parseInt(pageParam, 10);

      if (page === lastPage) return setCurrentPage(lastPage);

      if (!isNaN(page) && page !== currentPage) {
        setCurrentPage(page);
      }

      if (page > lastPage) return setCurrentPage(lastPage);
    }
    // eslint-disable-next-line
  }, [location.search, currentPage]);

  const updatePage = (newPage: number) => {
    if (newPage > 0 && newPage <= lastPage) {
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`);
    }
  };

  return { currentPage, updatePage, setCurrentPage };
};

export { usePaginationSync };

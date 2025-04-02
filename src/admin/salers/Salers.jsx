import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  PaginationItem,
  Pagination,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import instance from "../../axios";

const Salers = () => {
  const [salers, setSalers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const fetchSalers = async (page) => {
    try {
      const response = await instance.get("Account", {
        params: { PageIndex: page },
      });
      const data = response.data.data;
      setSalers(data.items);
      setTotalPages(Math.ceil(data.count / data.pageSize));
    } catch  {
       return null;
    }
  };

  useEffect(() => {
    fetchSalers(page);
  }, [page]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };
  return (
    <div style={{ direction: "rtl" }}>
      <div className="main-header">
        <h1>البائعين</h1>
      </div>
      <TableContainer
        component={Paper}
        className="tableContainer"
        style={{ backgroundColor: "#101010" }}
      >
        <Table className="table table-striped table-hover">
          <TableHead className="subhead">
            <TableRow>
              <TableCell><div>اسم التاجر</div></TableCell>
              <TableCell><div>البريد الإلكتروني</div></TableCell>
              <TableCell><div>المحافظة</div></TableCell>
              <TableCell><div>المدينة</div></TableCell>
              <TableCell><div>رقم الهاتف</div></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salers.map((sale, index) => (
              <TableRow key={index} className="subContent">
                <TableCell><p>{sale.displayName}</p></TableCell>
                <TableCell><p>{sale.email}</p></TableCell>
                <TableCell><p>{sale.governorate}</p></TableCell>
                <TableCell><p>{sale.city}</p></TableCell>
                <TableCell><p>{sale.mobile}</p></TableCell>
                {/*<TableCell>
                  <button
                    className="--btn --main-btn"
                  >
                    قبول
                  </button>
                  </TableCell>
                  <TableCell>
                  <button
                    className="--btn"
                  >
                    رفض
                  </button>
                </TableCell>*/}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ next: ArrowBackIcon, previous: ArrowForwardIcon }}
                {...item}
                sx={{
                  color: "var(--main-color)",
                  "&.Mui-selected": {
                    bgcolor: "var(--main-color)",
                    color: "white",
                  },
                  "&:hover": {
                    bgcolor: "#00e18b !important",
                  },
                }}
              />
            )}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Salers;

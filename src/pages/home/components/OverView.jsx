import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const OverView = ({
    selectedRegion
}) => {
    return (
        <>
            <Box sx={{ display:"flex", alignItems:"center" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>항목</StyledTableCell>
                                <StyledTableCell align="center">내용</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    주소
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {selectedRegion[0]?.addr1} {selectedRegion[0]?.addr2}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    홈페이지
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <div dangerouslySetInnerHTML={{ __html: selectedRegion[0]?.homepage }} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    전화번호
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {selectedRegion[0]?.tel != "" ? selectedRegion[0]?.tel : "등록된 정보 없음"}
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
            </Box>
        </>
    )
}

export default OverView;
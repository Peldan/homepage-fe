import React, { useState } from "react";
import { Pagination } from "react-bootstrap/esm";

export const RSSPagination = ({amountOfPages, onPageSelected}: {
    amountOfPages: number,
    onPageSelected: (page: number) => void}) => {
    const [activePage, setActivePage] = useState(1);

    let pages = [];
    for (let i = 1; i <= amountOfPages; i++) {
        pages.push(
            <Pagination.Item key={i} active={activePage === i}
                             onClick={() => {
                                 setActivePage(i);
                                 onPageSelected(i);
                             }}>
                {i}
            </Pagination.Item>
        )
    }
    return <>{pages}</>;
}
import { FC, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import { fetchLeisurePage, setLeisurePage } from "../../store/action-creators/leisure";
import Pagination, { PAGE_PATTERN } from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { fullNameToString } from "../../globals";

const LeisureListPage: FC = () => {
    const { page, filter, leisurePage, params } = useAppSelector(state => state.leisureReducer);
    const isLoading = useAppSelector(state => state.leisureReducer.isLoading);
    const error = useAppSelector(state => state.leisureReducer.error);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagePattern, setPagePattern] = useState("/leisure?page=" + PAGE_PATTERN);
    useEffect(() => {
        const pageParam = searchParams.get("page");
        const queryPage = Number(pageParam);
        if (pageParam !== null && !isNaN(queryPage)) {
            dispatch(setLeisurePage(queryPage));
        } else {
            searchParams.set("page", "1");
            setSearchParams(searchParams);
        }
    }, [dispatch, searchParams]);
    useEffect(() => {
        dispatch(fetchLeisurePage(params));
    }, [dispatch, params]);
    useEffect(() => {
        const params = searchParams ?? new URLSearchParams();
        params.set("page", PAGE_PATTERN);
        setPagePattern("/leisures?" + params.toString());
        console.log(params.toString());
    }, [searchParams]);
    useEffect(() => {
        if (page > leisurePage.totalPages) {
            searchParams.set("page", "1");
            setSearchParams(searchParams);
        }
    }, [page, leisurePage, searchParams]);
    return (
        <>
            <Header />
            <NavigationBar />
            {
                isLoading ? <p>Загрузка...</p> : error ? <p>Произошла ошибка: {error}</p> :
                    leisurePage.totalPages === 0 ? <p>Ничего не найдено</p> : (
                        <>
                            <p>Всего: {leisurePage.totalElements}</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>День недели</th>
                                        <th>Время</th>
                                        <th>Руководитель</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leisurePage.content.map(leisure => (
                                        <tr key={leisure.id}>
                                            <td>{leisure.title}</td>
                                            <td>{leisure.day}</td>
                                            <td>{leisure.time}</td>
                                            <td>{fullNameToString(leisure.organizer.fullName)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination currentPage={page} pagesCount={leisurePage.totalPages} patternTo={pagePattern} />
                        </>

                    )

            }
        </>
    );
};

export default LeisureListPage;
import "./LeisureListPage.css";
import { FC, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import { fetchLeisurePage, setLeisurePage } from "../../store/action-creators/leisure";
import Pagination, { PAGE_PATTERN } from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { dayOfWeekNames, fullNameToString, toHm, useTitle } from "../../globals";
import Table from "../../components/Table/Table";
import ListPlaceholder from "../../components/ListPlaceholder";

const LeisureListPage: FC = () => {
    useTitle("Кружки");
    const { page, filter, leisurePage, params } = useAppSelector(state => state.leisurePageReducer);
    const isLoading = useAppSelector(state => state.leisurePageReducer.isLoading);
    const error = useAppSelector(state => state.leisurePageReducer.error);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagePattern, setPagePattern] = useState("/leisure?page=" + PAGE_PATTERN);
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(false);
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
    }, [searchParams]);
    useEffect(() => {
        if (page > leisurePage.totalPages) {
            searchParams.set("page", "1");
            setSearchParams(searchParams);
        }
    }, [page, leisurePage, searchParams]);
    useEffect(() => {
        if (isLoading) {
            const timeout = setTimeout(() => {
                setIsPlaceholderVisible(true);
            }, 180);
            return () => clearTimeout(timeout);
        } else {
            setIsPlaceholderVisible(false);
        }
    }, [isLoading]);
    return (
        <div className="leisures">
            <Header />
            <NavigationBar />
            <div className="container">
                {
                    isLoading ? (isPlaceholderVisible && <ListPlaceholder />) : !!error ? <p>Произошла ошибка: {error}</p> :
                        <>
                            <div className="table-info">
                                {leisurePage.totalElements > 0 && <div className="all-count">Всего: {leisurePage.totalElements}</div>}
                                <a href="/leisure/new" className="btn btn-primary btn-add" type="button">Добавить</a>
                            </div>
                            {
                                leisurePage.totalPages === 0 ? <p>Ничего не найдено</p> : (
                                    <>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Название</th>
                                                    <th>День недели</th>
                                                    <th>Время</th>
                                                    <th>Руководитель</th>
                                                    <th>Участники</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {leisurePage.content.map(leisure => (
                                                    <tr key={leisure.id} className="position-relative">
                                                        <td>{leisure.title}</td>
                                                        <td>{dayOfWeekNames[leisure.day]}</td>
                                                        <td>{toHm(leisure.time)}</td>
                                                        <td>{fullNameToString(leisure.organizer.fullName)}</td>
                                                        <td>{leisure.studentTotalElements}</td>
                                                        <a href={`/leisure/${leisure.id}`} className="stretched-link"></a>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <Pagination currentPage={page} pagesCount={leisurePage.totalPages} patternTo={pagePattern} />
                                    </>
                                )
                            }
                        </>
                }
            </div >
        </div>
    );
};

export default LeisureListPage;
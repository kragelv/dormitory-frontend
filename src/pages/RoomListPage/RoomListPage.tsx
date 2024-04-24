import "./RoomListPage.css";
import { FC, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useAppDispatch, useAppSelector } from "../../store/hook/redux";
import { fetchRoomPage, setRoomPage } from "../../store/action-creators/room";
import Pagination, { PAGE_PATTERN } from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "../../globals";
import Table from "../../components/Table/Table";
import ListPlaceholder from "../../components/ListPlaceholder";

const RoomListPage: FC = () => {
    useTitle("Кружки");
    const { page, roomPage, params } = useAppSelector(state => state.roomPageReducer);
    const isLoading = useAppSelector(state => state.roomPageReducer.isLoading);
    const error = useAppSelector(state => state.roomPageReducer.error);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagePattern, setPagePattern] = useState("/room?page=" + PAGE_PATTERN);
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(false);
    useEffect(() => {
        const pageParam = searchParams.get("page");
        const queryPage = Number(pageParam);
        if (pageParam !== null && !isNaN(queryPage)) {
            dispatch(setRoomPage(queryPage));
        } else {
            searchParams.set("page", "1");
            setSearchParams(searchParams);
        }
    }, [dispatch, searchParams]);
    useEffect(() => {
        dispatch(fetchRoomPage(params));
    }, [dispatch, params]);
    useEffect(() => {
        const params = searchParams ?? new URLSearchParams();
        params.set("page", PAGE_PATTERN);
        setPagePattern("/rooms?" + params.toString());
    }, [searchParams]);
    useEffect(() => {
        if (page > roomPage.totalPages) {
            searchParams.set("page", "1");
            setSearchParams(searchParams);
        }
    }, [page, roomPage, searchParams]);
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
        <div className="rooms">
            <Header />
            <NavigationBar />
            <div className="container">
                <div className="table-info">
                    {roomPage.totalElements > 0 && <div className="all-count">Всего: {roomPage.totalElements}</div>}
                    <a href="/rooms/new" className="btn btn-primary btn-add" type="button">Добавить</a>
                </div>

                {
                    isLoading ? (isPlaceholderVisible && <ListPlaceholder />) :
                        !!error ? <p>Произошла ошибка: {error}</p> :
                            roomPage.totalPages === 0 ? <p>Ничего не найдено</p> : (
                                <>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Номер</th>
                                                <th>Этаж</th>
                                                <th>Вместимость</th>
                                                <th>Проживающие</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roomPage.content.map(room => (
                                                <tr key={room.id} className="position-relative">
                                                    <td>{room.number}</td>
                                                    <td>{room.floor}</td>
                                                    <td>{room.capacity}</td>
                                                    <td>{room.current}</td>
                                                    <a href={`/room/${room.id}`} className="stretched-link"></a>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <Pagination currentPage={page} pagesCount={roomPage.totalPages} patternTo={pagePattern} />
                                </>
                            )
                }
            </div>
        </div>
    );
};

export default RoomListPage;
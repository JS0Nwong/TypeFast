import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'

import Board from './components/BoardComponents/Board'
import BoardError from './components/BoardComponents/404Board'
import Menubar from './components/BoardComponents/Menubar'
import List from './components/BoardComponents/List'
import BoardLoading from "./components/LoadingComponents/BoardLoading"

import useStore from './store'
import useFirebaseHooks from './utils/firebaseHooks'

import {
    doc,
    onSnapshot,
    query,
    getDocs,
    orderBy,
    collection,
    getDoc
} from "firebase/firestore";
import { db } from "../src/firebase";
import { getAuth } from "firebase/auth";

export default function BoardView() {
    const navigate = useNavigate()

    // Board State Data
    const [board, setBoard] = useState(null)
    const [boardData, setBoardData] = useState(null)
    const [columnOrderBy, setOrderBy] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(null)
    const [loading, setLoading] = useState(true)
    const [listData, setListData] = useState(null)
    const [toggleListView, setToggleListView] = useState(false)
    const [labels, setLabels] = useState(null)
    const [owner, setOwner] = useState(null)

    // Shared Users Permissions
    const [canView, setViewPermissions] = useState(false)
    const [canEdit, setEditPermissions] = useState(false)

    //Global Board Permissions
    const [globalView, setGlobalView]= useState(false)
    const [globalEdit, setGlobalEdit] = useState(false)
    
    // get current user data
    const { uid, email } = useFirebaseHooks()

    // Gets board id from URL params
    const { id } = useParams();

    const { boards, areBoardsFetched, currentBoard, setData } = useStore()

    // Gets boards from global state and filters to find the selected board 

    // const board = useMemo(() => boards.find((board) => board.id === id), [])
    // const boardsData = useMemo(() => boardData, [boardData])

    // use effect to get board data and provide realtime updates to users on the same board
    useEffect(() => {
        const getBoardData = async () => {
            const metadataRef = doc(db, `boardsMetadata/${id}`)
            const docSnap = await getDoc(metadataRef)
            if (docSnap.exists) {
                const uid = docSnap.data().boardOwner
                const docRef = doc(db, `users/${uid}/boardsData/${id}`)
                onSnapshot(docRef, (doc) => {
                    const { columns, lastUpdated, orderBy, labels } = doc.data()
                    setBoardData(columns);
                    setOrderBy(orderBy)
                    setLabels(labels)
                    //   setLastUpdated(lastUpdated.toDate().toLocaleString("en-US"));
                    setLoading(false)

                    setData(columns)
                    const rows = []
                    orderBy.map((key, index) => {
                        columns[key].tasks.map((task, index) => {
                            Object.assign(task, {
                                ...task,
                                status: key,
                                associatedColor: columns[key].columnColor
                            })
                            rows.push(task)
                        })
                    })
                    setListData(rows)
                })
            }
        }
        getBoardData()
    }, [])

    // use effect to get board metadata and provide realtime updates to users on the same board
    useEffect(() => {
        const getMetadataRef = async () => {
            const metadataRef = doc(db, `boardsMetadata/${id}`)
            const docSnap = await getDoc(metadataRef)
            if (docSnap.exists) {
                const uid = docSnap.data().boardOwner
                const boardColRef = collection(db, `users/${uid}/boards`);
                const q = query(boardColRef, orderBy('createdAt', 'desc'))
                const querySnapshot = await getDocs(q)
                const boards = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                    createdAt: doc.data().createdAt.toDate().toLocaleString('en-US')
                }))
                setBoard(boards.find((board) => board.id === id))
                setOwner(boards.find((board) => board.boardOwner === uid))
                setGlobalView(boards.find((board) => board.id === id).isPubliclyViewable)
                setGlobalEdit(boards.find((board) => board.id === id).isPubliclyEditable)
                setViewPermissions(boards.map((board) => board.sharedToUsers.find((user) => user?.email === email)))
                setEditPermissions(boards.map((board) => board.sharedToUsers.find((user) => user?.email === email)))
                setLoading(false)
            }
        }
        if(!board) {
            getMetadataRef()
        }
    }, [board])

    // state and permissions checker, it makes sure the board doesnt load before the data is done loading 
    // and checks for user permissions to view and edit the board
    if (!board) return null
    if (loading) return null
    if (!boardData) return <BoardLoading />
    if(!canEdit && !owner) return <BoardError />
    if (!canView && !owner) return <BoardError /> //checks case if youre not shared permission and not the owner of a board
    if (!globalView && !owner) return <BoardError /> // checks case if the borad is not publicly viewable and youre not the owner

    if (globalView || canEdit || canView || owner) return (
        <>
            <div style={{
                height: "100dvh",
                display: "flex",
                flexDirection: 'column',
                minWidth: "100%",
            }}>
                <Menubar
                    canShare={canEdit || owner || globalEdit}
                    id={id}
                    data={board}
                    lastUpdated={lastUpdated}
                    setToggleListView={() => setToggleListView(!toggleListView)}
                />
                {toggleListView ?
                    <List
                        data={listData}
                        orderBy={columnOrderBy}
                        id={id}
                        labels={labels}
                    />
                    :
                    <Board
                        canEdit={canEdit || owner || globalEdit}
                        columns={boardData}
                        orderBy={columnOrderBy}
                        id={id}
                        lastUpdated={lastUpdated}
                        labels={labels}
                    />
                }
            </div>
        </>
    )
}

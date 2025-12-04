import GameScreenWrapper from '../components/GameScreenWrapper'
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        document.title = document.hidden ? "🥺 Come back" : "type.fast";
    }, [document.hidden])

    return (
        <>
            <GameScreenWrapper />
        </>
    )
}

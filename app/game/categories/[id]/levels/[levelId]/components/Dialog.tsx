"use client"

import { useState } from "react"
import FromBackground from "./FromBackground"
import YouBackground from "./YouBackground"

const Dialog = ({ dialogs, onComplete }: { dialogs: { fromYou: boolean, text: string }[], onComplete: () => void }) => {
    const [currentDialog, setCurrentDialog] = useState(0)

    const onClick = () => {
        if (currentDialog === dialogs.length - 1) {
            onComplete()
            return
        }

        setCurrentDialog(prev => Math.min(prev + 1, dialogs.length))
    }
    return (
        <div className="w-full h-full" onClick={onClick}>
            {
                dialogs[currentDialog].fromYou ?
                    <YouBackground className="fixed bottom-0 inset-x-0 z-1" />
                    :
                    <FromBackground className="fixed bottom-0 inset-x-0 z-1" />
            }
            <div className="absolute inset-x-6 bottom-32 bg-white rounded-2xl z-2" >
                <div className="relative p-6 pt-8">
                    <p className="leading-[1.4]">{dialogs[currentDialog].text}</p>
                    <div className="absolute top-0 -translate-y-1/2 left-0 bg-[#1919ef] text-white px-6 py-2 rounded-lg">
                        {
                            dialogs[currentDialog].fromYou ?
                                "Геля"
                                :
                                "Миша"
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialog;


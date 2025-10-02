"use client"

import { useState } from "react"
import FromBackground from "./FromBackground"
import YouBackground from "./YouBackground"

export interface DialogItem {
    fromYou: boolean
    text: string
}

const Dialog = ({ dialog, onComplete }: { dialog: DialogItem[], onComplete: () => void }) => {
    const [currentDialog, setCurrentDialog] = useState(0)

    const onClick = () => {
        if (currentDialog === dialog.length - 1) {
            onComplete()
            return
        }

        setCurrentDialog(prev => Math.min(prev + 1, dialog.length))
    }
    return (
        <div className="w-full h-full" onClick={onClick}>
            {
                dialog[currentDialog].fromYou ?
                    <YouBackground className="fixed bottom-0 inset-x-0 z-1" />
                    :
                    <FromBackground className="fixed bottom-0 inset-x-0 z-1" />
            }
            <div className="absolute inset-x-6 bottom-32 bg-white rounded-2xl z-2" >
                <div className="relative p-6 pt-8">
                    <p className="leading-[1.4] user-select-none">{dialog[currentDialog].text}</p>
                    <p className="absolute top-0 -translate-y-1/2 left-0 bg-[#1919ef] text-white px-6 py-2 rounded-lg user-select-none">
                        {
                            dialog[currentDialog].fromYou ?
                                "Геля"
                                :
                                "Миша"
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Dialog;


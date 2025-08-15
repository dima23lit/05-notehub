export interface Note {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tag: string
}

export interface NoteTag {
    content: string,
    title: string,
    tag: ("Todo" | "Work" | "Personal" | "Meeting" | "Shopping")
}
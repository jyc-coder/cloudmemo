

interface Memo {
    content: string,
    created_at: number;
    id: number;
    updated_at: number | null;
    deleted_at: number | null;
}

export default Memo
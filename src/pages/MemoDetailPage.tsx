import { useParams } from "react-router-dom";

const MemoDetailPage = () => {
    const { id } = useParams()
    console.log(id)
  return <> 상세 메모 {id} </>;
};

export default MemoDetailPage;

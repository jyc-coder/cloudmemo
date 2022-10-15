import { useParams } from "react-router-dom";

const MemoEditPage = () => {
   const {id} = useParams();
   console.log(id);
  return <>메모수정</>;
};

export default MemoEditPage;

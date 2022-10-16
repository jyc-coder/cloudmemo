import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import { right } from 'styled-system';
import Box from '../components/Box';
import Button from '../components/Button';
import Editor from '../components/Editor';
import Flex from '../components/Flex';
import Memo from '../interfaces/Memo';

const MainPage = () => {
    const [edit, setEdit] = useState('');
    const [memoList, setMemoList] = useState<Memo[]>([])
  useEffect(() => {
    (async () => {
      const {
        data: {rs},
      } = await axios.get('/tmp');
      setEdit(rs);
      })();
      loadMemo()
  }, []);

  useEffect(() => {
    if (edit.length > 0)
      axios.post('/tmp', {
        content: edit,
      });
  }, [edit]);
    
    const loadMemo = useCallback(async () => {
        const { data } = await axios.get<Memo[]>('/')
        setMemoList(data)
    },[setMemoList])
    
    const handleSubmit = useCallback(async () => {
        if (edit.replace(/<[/\w\s="-]*>/gi, '').length === 0) {
            alert('메모가 비어있습니다!');
            return;
        } 

        console.log(edit.replace(/<[/\w\s="-]*>/gi,""));
        try {
            const {data} = await axios.post('/', {
              content: edit
            })
            console.log(data)
            setMemoList(prev=>[...prev,data])
            alert("제출 완료!")
        }
        catch (e) {
            alert("저장 실패")
        }
        
    },[edit])
  return (
    <>
      <Box p="16px">
        <h1>클라우드 메모장</h1>

        <Editor value={edit} onChange={setEdit} />
        <Button mt={'8px'} onClick={handleSubmit}>
          제출
        </Button>
        {memoList.map((value) => (
            <Flex key={value.created_at} border={'#ccc solid 1px'} my="8px" p="12px"
                flexDirection="column"
            >
            <Box
              dangerouslySetInnerHTML={{
                __html: value.content,
              }}
                >

            </Box>
                <Box textAlign={"right"} fontSize={"12px"} color="#555">
                    생성 : {new Date(value.created_at).toLocaleString()}
                </Box>    

          </Flex>
        ))}
      </Box>
    </>
  );
};

export default MainPage;

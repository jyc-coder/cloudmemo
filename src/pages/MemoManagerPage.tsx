import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {VscChevronLeft, VscEdit, VscTrash} from 'react-icons/vsc';
import {useNavigate} from 'react-router-dom';
import Box from '../components/Box';
import Button from '../components/Button';
import Flex from '../components/Flex';
import Memo from '../interfaces/Memo';

const MemoManagerPage = () => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState('');
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [selectedMemoList, setselectedMemoList] = useState<number[]>([]);

  const loadMemo = useCallback(async () => {
    const {data} = await axios.get<Memo[]>('/');
    setMemoList(data);
  }, [setMemoList]);

  useEffect(() => {
    (async () => {
      const {
        data: {rs},
      } = await axios.get('/tmp');
      setEdit(rs);
    })();
    loadMemo();
  }, [loadMemo]);

  useEffect(() => {
    if (edit.length > 0)
      axios.post('/tmp', {
        content: edit,
      });
  }, [edit]);

  return (
    <>
      <Box p="16px">
        <Button square={true} mt={'8px'} onClick={() => navigate('/')}>
          <VscChevronLeft />
        </Button>
        <h1>클라우드 메모장 매니져</h1>
        <Flex style={{gap: 8}}>
                  <Button onClick={() => {
                      setselectedMemoList(selectedMemoList.length === memoList.length ? [] : memoList.map(v => v.id))
                  }}>
                      {
                          memoList.length === selectedMemoList.length ? "전체해제" : "전체선택"
                      }
                  </Button>
                  <Button onClick={async () => {
                      if (selectedMemoList.length === 0) {
                          alert("메모를 선택해주세요.")
                          return;
                      }

                      
                      if (!window.confirm('선택된 항목을 제거하시겠습니까?')) {
                          return;
                      } {
                            const list = [];
                            for (const id of selectedMemoList) list.push(axios.delete('/' + id));

                            await Promise.all(list);
                            await loadMemo();
                            alert('제거 완료!');

                      }
                    
                      
                         
          }}>선택제거</Button>
                  <Button onClick={async () => {
                      try {
                        if (!window.confirm('정말로 전체제거 하시겠습니까?')) {
                          return;
                        }
                        await axios.delete('/');
                        await loadMemo();
                        alert('제거 완료!');
                      } catch (e) {
                        alert((e as any).response.data.msg);
                      }
                     
                      
          }}>전체제거</Button>
        </Flex>

        <Flex
          style={{
            gap: '8px',
          }}
        ></Flex>

        {memoList.map((value) => (
          <Flex
            hoverable={true}
            onClick={() => {
              setselectedMemoList((prev) => {
                if (prev.includes(value.id)) return prev.filter((v) => value.id !== v);
                return [...prev, value.id];
              });
            }}
            key={value.created_at}
            border={'#ccc solid 1px'}
            borderWidth={selectedMemoList.includes(value.id) ? '6px' : '1px'}
            backgroundColor={selectedMemoList.includes(value.id) ? '#888181' : '#fff'}
            my="8px"
            p="12px"
            flexDirection="column"
            style={{
              cursor: 'pointer',
            }}
          >
            <Box
              className="memo-content"
              dangerouslySetInnerHTML={{
                __html: value.content,
              }}
            ></Box>
            <Box textAlign={'right'} fontSize={'12px'} color="#555">
              생성 : {new Date(value.created_at).toLocaleString()}
            </Box>
            {value.updated_at && (
              <Box textAlign={'right'} fontSize={'12px'} color="#555">
                수정 : {new Date(value.updated_at).toLocaleString()}
              </Box>
            )}
          </Flex>
        ))}
      </Box>
    </>
  );
};

export default MemoManagerPage;

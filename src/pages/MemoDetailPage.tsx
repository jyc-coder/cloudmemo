import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Box from '../components/Box';
import Flex from '../components/Flex';
import Memo from '../interfaces/Memo';
import {VscChevronLeft, VscEdit, VscTrash} from 'react-icons/vsc';
import Button from '../components/Button';

const MemoDetailPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [memo, setMemo] = useState<Memo | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('/' + id);
        setMemo(data);
      } catch (e) {
        alert((e as any).response.data.msg);
        navigate('/');
      }
    })();
  },[id, navigate]);

  if (memo === null) return <></>;
  return (
    <>
      <Box p={'16px'}>
        <Button square={true} onClick={() => navigate('/')}>
          <VscChevronLeft />
        </Button>

        <Flex
          border={'#ccc solid 1px'}
          my="8px"
          p="12px"
          flexDirection="column"
          style={{
            cursor: 'pointer',
          }}
        >
          <Box
            dangerouslySetInnerHTML={{
              __html: memo.content,
            }}
          ></Box>
          <Box textAlign={'right'} fontSize={'12px'} color="#555">
            생성 : {new Date(memo.created_at).toLocaleString()}
          </Box>
          {memo.updated_at !== null && (
            <Box textAlign={'right'} fontSize={'12px'} color="#555">
              수정 : {new Date(memo.updated_at).toLocaleString()}
            </Box>
          )}
        </Flex>
        <Flex
          justifyContent={'flex-end'}
          style={{
            gap: 8,
          }}
        >
          <Button square={true} onClick={() => navigate('edit')}>
            <VscEdit />
          </Button>
          <Button
            square={true}
            onClick={async () => {
              if (window.confirm('해당 메모를 제거할까요?')) {
                 try {
                   await axios.delete('/' + id);
                   alert('제거가 완료되었습니다.');
                 } catch (e) {
                   alert((e as any).response.data.msg);
                 }
              }
               
              navigate('/');
            }}
          >
            <VscTrash />
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default MemoDetailPage;

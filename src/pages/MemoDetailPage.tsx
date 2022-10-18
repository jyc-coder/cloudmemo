import axios from 'axios';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Box from '../components/Box';
import Flex from '../components/Flex';
import Memo from '../interfaces/Memo';
import {VscChevronLeft, VscCopy, VscEdit, VscLiveShare, VscTrash} from 'react-icons/vsc';
import Button from '../components/Button';
import CopyToClipboard from 'react-copy-to-clipboard';

const MemoDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation()
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
            className="memo-content"
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
          <Button square onClick={() => {
            window.navigator.share({
              title: "클라우드 메모공유",
              text: memo.content,
              url:window.location.href
            })
          }}>
            <VscLiveShare/>
          </Button>
          <CopyToClipboard
            text={window.location.host + location.pathname}
            onCopy={(str) => {
             alert("복사되었습니다")
            }}
          >
            <Button square={true} >
              <VscCopy />
            </Button>
          </CopyToClipboard>

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

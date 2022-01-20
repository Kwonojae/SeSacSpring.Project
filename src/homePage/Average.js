import { useState } from 'react';


const Average = () => {
  const [list, setList] = useState([]); // 숫자값을 담고 있는 리스트
  const [number, setNumber] = useState(''); // 입력창에 입력한 숫자

  const handleChange = (e) => {
    setNumber(e.target.value);
  };
  const handleClick = () => {
    // list(배열)에 number를 추가 -> 업데이트된 새 배열을 반환하는 concat 함수를 사용
    // 문자열 number를 parseInt 함수를 이용해서 숫자로 변경해서 배열에 추가
    const newList = list.concat(number);
    setList(newList);
    setNumber('');
  };

  const map = { a: 1, b: 2, c: 3 };

const result = Object.values(map);

console.log(result);

  return (
    <>
      <div>
        <input value={number} onChange={handleChange} />
        <button onClick={handleClick}>등록</button>
        <ul>
          {list.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
        {/* <div>평균값: {getAverage(list)}</div> */}
      </div>
    </>
  );
};

export default Average;

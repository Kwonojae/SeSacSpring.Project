import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";

function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/posts").then((res) => {
      setPosts(res.data);
      console.log(res.data);
    });
  }, []);
  // 글번호
  // posts.id
  // 제목
  // posts.title
  // 작성자
  // posts.writer
  // 시간
  // posts.createdDate
  // 조회수
  // posts.view
  // 페이징num
  // pageNum:{pageList}
  // pageNum

  return (
    <>
      <ul>
        {posts.map((post) => (
          <div>
            <div>
              <table>
                <thead>
                  <tr key={post.id}>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{post.id}</td>
                    <td>
                      {/* 상세보기 link to="/Detail/"  */}
                      <a href={`http://localhost:8080/posts/${post.id}`}>
                        {post.title}
                      </a>
                    </td>
                    <td>{post.writer}</td>
                    <td>{post.createdDate}</td>
                    <td>{post.view}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </ul>
      <Link to="/register/">글쓰기</Link>
    </>
  );
}
//TODO 글쓰기 문제  / 페이징 문제
export default PostsPage;
